import { existsSync, symlinkSync } from "node:fs";
import path from "node:path";

const folders: string[] = [
    "animation_controllers",
    "animations",
    "entity",
    "font",
    "materials",
    "models",
    "particles",
    "render_controllers",
    "sounds",
    "texts",
    "textures",
    "ui",
];
const files: string[] = ["contents.json"];
const sourceFolder: string = path.join(process.argv[1]!, "../../RP/");
const distFolder: string = path.join(process.argv[1]!, "../");

for (const folder of folders) {
    const sourcePath: string = path.join(sourceFolder, folder);
    if (!existsSync(sourcePath)) {
        console.warn(`Folder "${folder}" does not exist in the source folder (${sourceFolder}). Skipping...`);
        continue;
    }
    const distPath: string = path.join(distFolder, folder);
    if (!existsSync(distPath)) symlinkSync(sourcePath, distPath, "junction");
}

for (const file of files) {
    const sourcePath: string = path.join(sourceFolder, file);
    if (!existsSync(sourcePath)) {
        console.warn(`File "${file}" does not exist in the source folder (${sourceFolder}). Skipping...`);
        continue;
    }
    const distPath: string = path.join(distFolder, file);
    if (!existsSync(distPath)) symlinkSync(sourcePath, distPath, "file");
}
