import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const publicDirectory = resolve(import.meta.dirname, "..", "dist", "public");
const source = resolve(publicDirectory, "index.html");
const destination = resolve(publicDirectory, "404.html");

await copyFile(source, destination);
console.log("Created GitHub Pages SPA fallback: dist/public/404.html");
