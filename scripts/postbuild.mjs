import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

async function safeCopy(src, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(src, dest);
}

await safeCopy(path.join(root, "functions", "_middleware.js"), path.join(distDir, "functions", "_middleware.js"));
await safeCopy(path.join(root, "public", "remote_policy.json"), path.join(distDir, "remote_policy.json"));
await safeCopy(path.join(root, "public", "_redirects"), path.join(distDir, "_redirects"));
