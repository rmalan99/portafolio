import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "public", "videos");

const videoAssets = [
  {
    url: "https://raw.githubusercontent.com/rmalan99/le-mise-mobile-demo/main/hyperframes/le-mise-real-showcase/renders/le-mise-real-showcase.es.mp4",
    fileName: "le-mise-real-showcase.es.mp4",
  },
  {
    url: "https://raw.githubusercontent.com/rmalan99/le-mise-mobile-demo/main/hyperframes/le-mise-real-showcase/renders/le-mise-real-showcase.en.mp4",
    fileName: "le-mise-real-showcase.en.mp4",
  },
];

async function downloadVideoAsset({ url, fileName }) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${fileName}: ${response.status} ${response.statusText}`);
  }

  const fileBuffer = Buffer.from(await response.arrayBuffer());
  const filePath = path.join(outputDir, fileName);

  await writeFile(filePath, fileBuffer);

  console.log(`Synced video asset: ${fileName}`);
}

async function syncProjectVideos() {
  await mkdir(outputDir, { recursive: true });
  await Promise.all(videoAssets.map(downloadVideoAsset));
}

syncProjectVideos().catch((error) => {
  console.error("Video sync failed.");
  console.error(error);
  process.exit(1);
});
