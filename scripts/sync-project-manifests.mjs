import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const cacheDir = path.join(projectRoot, ".cache", "manifests");
const indexPath = path.join(projectRoot, "src", "consts", "projects-index.json");

const PROJECT_TYPES = ["web", "mobile", "api"];
const PROJECT_CATEGORIES = ["test-case", "product/client", "product/myself"];
const PROJECT_SIZES = ["large", "small"];
const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;
const DISCOVERY_PAGE_LIMIT = 10;

const overridesSchema = z
  .object({
    size: z.enum(PROJECT_SIZES).optional(),
    category: z.enum(PROJECT_CATEGORIES).optional(),
    type: z.enum(PROJECT_TYPES).optional(),
  })
  .strict()
  .optional();

const entrySchema = z.union([
  z
    .object({
      kind: z.literal("explicit"),
      github: z.string().regex(/^[\w.-]+\/[\w.-]+$/, "expected 'owner/repo'"),
      branch: z.string().optional(),
      overrides: overridesSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("discovery"),
      discovery: z
        .object({
          owner: z.string().min(1),
          topic: z.string().optional(),
          includeForks: z.boolean().optional(),
          includeArchived: z.boolean().optional(),
          branch: z.string().optional(),
        })
        .strict(),
    })
    .strict(),
]);

const indexSchema = z.array(entrySchema);

const localizedString = z
  .object({
    es: z.string().min(1),
    en: z.string().min(1),
  })
  .strict();

const projectImageMediaSchema = z
  .object({
    kind: z.literal("image"),
    src: z.string().min(1),
    alt: z.string().min(1),
  })
  .strict();

const projectVideoMediaSchema = z
  .object({
    kind: z.literal("video"),
    src: z.string().min(1),
    sources: z
      .object({
        es: z.string().optional(),
        en: z.string().optional(),
      })
      .strict()
      .optional(),
    poster: z.string().optional(),
    posterBackground: z.string().optional(),
    posterSize: z.string().optional(),
    title: z.union([z.string().min(1), localizedString]),
  })
  .strict();

const projectMediaSchema = z.discriminatedUnion("kind", [
  projectImageMediaSchema,
  projectVideoMediaSchema,
]);

const projectManifestSchema = z
  .object({
    $schema: z.string().optional(),
    version: z.string().regex(SEMVER_REGEX),
    title: z.string().min(1),
    type: z.enum(PROJECT_TYPES),
    category: z.enum(PROJECT_CATEGORIES),
    description: localizedString,
    technologies: z.array(z.string().min(1)).min(1),
    links: z
      .object({
        github: z.string().url().optional(),
        overview: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .strict()
      .optional(),
    media: projectMediaSchema,
  })
  .strict();

const stats = {
  fetched: 0,
  cached: 0,
  cacheFallback: 0,
  failed: 0,
  discoveryDiscovered: 0,
  discoverySkipped: 0,
};

async function readIndex() {
  const content = await readFile(indexPath, "utf8");
  const parsed = JSON.parse(content);
  return indexSchema.parse(parsed);
}

async function readCache(repoKey) {
  try {
    const content = await readFile(
      path.join(cacheDir, `${repoKey}.json`),
      "utf8",
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function writeCache(repoKey, branch, manifest, etag) {
  const payload = {
    github: repoKey.replace("__", "/"),
    branch,
    manifest,
    etag,
    fetchedAt: new Date().toISOString(),
  };
  await writeFile(
    path.join(cacheDir, `${repoKey}.json`),
    JSON.stringify(payload, null, 2),
    "utf8",
  );
}

async function fetchManifest(github, branch, etag) {
  const [owner, repo] = github.split("/");
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/.portfolio/manifest.json`;
  // Force `Accept-Encoding: identity` so GitHub returns a strong, content-derived
  // ETag. Node's default fetch sends `Accept-Encoding: gzip, deflate, br` and
  // GitHub responds with a weak ETag that does NOT change when the underlying
  // blob content changes, which breaks conditional refresh.
  const headers = {
    "User-Agent": "portafolio-sync",
    "Accept-Encoding": "identity",
  };
  if (etag) headers["If-None-Match"] = etag;

  const response = await fetch(url, { headers });

  if (response.status === 304) {
    return { status: "not-modified" };
  }

  if (!response.ok) {
    return {
      status: "error",
      code: response.status,
      message: response.statusText,
    };
  }

  const newEtag = response.headers.get("etag");
  const body = await response.json();
  return { status: "ok", manifest: body, etag: newEtag };
}

function logValidationIssues(github, issues) {
  console.warn(`⚠ ${github}: manifest validation failed`);
  for (const issue of issues) {
    const pathStr = issue.path.length ? issue.path.join(".") : "<root>";
    console.warn(`   - ${pathStr}: ${issue.message}`);
  }
}

async function ingestManifest({ github, branch }) {
  const [owner, repo] = github.split("/");
  const repoKey = `${owner}__${repo}`;
  const cache = await readCache(repoKey);
  const result = await fetchManifest(github, branch, cache?.etag);

  if (result.status === "not-modified") {
    console.log(`✓ ${github} (cached, etag match)`);
    stats.cached++;
    return;
  }

  if (result.status === "error") {
    if (cache) {
      console.warn(
        `⚠ ${github}: fetch failed (${result.code} ${result.message}), using cache from ${cache.fetchedAt}`,
      );
      stats.cacheFallback++;
    } else {
      console.warn(
        `⚠ ${github}: fetch failed (${result.code} ${result.message}), no cache available, skipping`,
      );
      stats.failed++;
    }
    return;
  }

  const validation = projectManifestSchema.safeParse(result.manifest);
  if (!validation.success) {
    logValidationIssues(github, validation.error.issues);
    if (cache) {
      console.warn(`   using cache from ${cache.fetchedAt} as fallback`);
      stats.cacheFallback++;
    } else {
      stats.failed++;
    }
    return;
  }

  await writeCache(repoKey, branch, validation.data, result.etag);
  console.log(`✓ ${github} (fetched)`);
  stats.fetched++;
}

async function listOwnerRepos({ owner, topic, includeForks, includeArchived }) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portafolio-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const repos = [];
  for (let page = 1; page <= DISCOVERY_PAGE_LIMIT; page++) {
    const url = `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}&type=owner`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status} ${res.statusText}`);
    }
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  return repos.filter((repo) => {
    if (!includeForks && repo.fork) return false;
    if (!includeArchived && repo.archived) return false;
    if (topic && !(repo.topics ?? []).includes(topic)) return false;
    return true;
  });
}

async function processDiscoveryEntry(entry) {
  const cfg = entry.discovery;
  const branch = cfg.branch ?? "main";

  if (!process.env.GITHUB_TOKEN) {
    console.warn(
      `⚠ Discovery for owner=${cfg.owner} skipped: GITHUB_TOKEN not set (would hit anonymous rate limit)`,
    );
    stats.discoverySkipped++;
    return;
  }

  console.log(
    `→ Discovering repos for owner=${cfg.owner}${cfg.topic ? ` topic=${cfg.topic}` : ""}`,
  );

  let repos;
  try {
    repos = await listOwnerRepos(cfg);
  } catch (error) {
    console.warn(`⚠ Discovery failed for owner=${cfg.owner}: ${error.message}`);
    stats.discoverySkipped++;
    return;
  }

  console.log(`  found ${repos.length} repos, scanning for .portfolio/manifest.json`);

  for (const repo of repos) {
    const github = `${repo.owner.login}/${repo.name}`;
    try {
      const [owner, repoName] = github.split("/");
      const cache = await readCache(`${owner}__${repoName}`);
      const probe = await fetchManifest(github, branch, cache?.etag);
      if (probe.status === "error" && !cache) {
        stats.discoveryDiscovered++;
        continue;
      }
      await ingestManifest({ github, branch });
      stats.discoveryDiscovered++;
    } catch (error) {
      console.warn(`  ⚠ ${github}: unexpected error`);
      console.warn(error);
      stats.failed++;
    }
  }
}

async function syncProjectManifests() {
  await mkdir(cacheDir, { recursive: true });

  let index;
  try {
    index = await readIndex();
  } catch (error) {
    console.error("Failed to read projects index.");
    console.error(error instanceof z.ZodError ? error.issues : error);
    process.exit(1);
  }

  for (const entry of index) {
    if (entry.discovery) {
      await processDiscoveryEntry(entry);
      continue;
    }
    if (entry.github) {
      try {
        await ingestManifest({
          github: entry.github,
          branch: entry.branch ?? "main",
        });
      } catch (error) {
        console.warn(`⚠ ${entry.github}: unexpected error`);
        console.warn(error);
        stats.failed++;
      }
    }
  }

  console.log(
    `\nSync summary: ${stats.fetched} fetched, ${stats.cached} cached, ${stats.cacheFallback} cache-fallback, ${stats.failed} skipped, ${stats.discoveryDiscovered} discovered, ${stats.discoverySkipped} discovery-skipped`,
  );
}

syncProjectManifests().catch((error) => {
  console.error("Manifest sync failed.");
  console.error(error);
  process.exit(1);
});
