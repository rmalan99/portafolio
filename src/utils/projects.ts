import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
  ProjectCard,
  ProjectCardSize,
  ProjectCategory,
  ProjectMedia,
  ProjectType,
} from "@consts/projects";
import type { ProjectOverrides } from "@schemas/project-index";
import type {
  ProjectManifest,
  ProjectVideoMediaManifest,
} from "@schemas/project-manifest";
import { projectIndex } from "@consts/projects-index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const cacheDir = path.join(projectRoot, ".cache", "manifests");

interface CachedManifest {
  github: string;
  manifest: ProjectManifest;
  fetchedAt?: string;
  branch?: string;
}

interface IndexLookup {
  branch: string;
  overrides?: ProjectOverrides;
}

function resolveRepoPath(
  src: string,
  owner: string,
  repo: string,
  branch: string,
): string {
  if (/^https?:\/\//i.test(src)) return src;
  const cleaned = src.replace(/^\/+/, "");
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${cleaned}`;
}

function pickVideoTitle(title: ProjectVideoMediaManifest["title"]): string {
  if (typeof title === "string") return title;
  return title.en ?? title.es;
}

function resolveMedia(
  media: ProjectManifest["media"],
  owner: string,
  repo: string,
  branch: string,
): ProjectMedia {
  if (media.kind === "image") {
    return {
      kind: "image",
      src: resolveRepoPath(media.src, owner, repo, branch),
      alt: media.alt,
    };
  }

  const sources = media.sources
    ? {
        es: media.sources.es
          ? resolveRepoPath(media.sources.es, owner, repo, branch)
          : undefined,
        en: media.sources.en
          ? resolveRepoPath(media.sources.en, owner, repo, branch)
          : undefined,
      }
    : undefined;

  return {
    kind: "video",
    src: resolveRepoPath(media.src, owner, repo, branch),
    sources,
    poster: media.poster
      ? resolveRepoPath(media.poster, owner, repo, branch)
      : undefined,
    posterBackground: media.posterBackground,
    posterSize: media.posterSize,
    title: pickVideoTitle(media.title),
  };
}

function manifestToCard(
  manifest: ProjectManifest,
  owner: string,
  repo: string,
  branch: string,
  overrides: ProjectOverrides = {},
): ProjectCard {
  const size: ProjectCardSize = overrides.size ?? "large";
  const type: ProjectType = overrides.type ?? manifest.type;
  const category: ProjectCategory = overrides.category ?? manifest.category;

  return {
    title: manifest.title,
    type,
    category,
    descriptionEs: manifest.description.es,
    descriptionEn: manifest.description.en,
    technologies: manifest.technologies,
    githubUrl: manifest.links?.github,
    overviewUrl: manifest.links?.overview ?? manifest.links?.demo,
    media: resolveMedia(manifest.media, owner, repo, branch),
    size,
  };
}

async function listCachedManifests(): Promise<CachedManifest[]> {
  let files: string[];
  try {
    files = await readdir(cacheDir);
  } catch {
    return [];
  }

  const out: CachedManifest[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const content = await readFile(path.join(cacheDir, file), "utf8");
      const parsed = JSON.parse(content) as CachedManifest;
      if (parsed?.github && parsed?.manifest?.version) {
        out.push(parsed);
      }
    } catch {
      continue;
    }
  }
  return out;
}

function buildIndexLookup(): Map<string, IndexLookup> {
  const map = new Map<string, IndexLookup>();
  for (const entry of projectIndex) {
    if (entry.kind === "explicit") {
      map.set(entry.github.toLowerCase(), {
        branch: entry.branch ?? "main",
        overrides: entry.overrides,
      });
    }
  }
  return map;
}

export async function loadProjectCards(): Promise<ProjectCard[]> {
  const cached = await listCachedManifests();
  if (cached.length === 0) return [];

  const lookup = buildIndexLookup();
  const cards: ProjectCard[] = [];

  for (const entry of cached) {
    const key = entry.github.toLowerCase();
    const meta = lookup.get(key);
    if (!meta) continue;

    const [owner, repo] = entry.github.split("/");
    cards.push(
      manifestToCard(
        entry.manifest,
        owner,
        repo,
        meta.branch,
        meta.overrides,
      ),
    );
  }

  return cards;
}
