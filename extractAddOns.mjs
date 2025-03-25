import AdmZip from "adm-zip";
import { readdirSync } from "fs";
import path from "path";
import ProgressBar from 'progress';

const inputDir = "./debugSticksAndScreensPreview";
const outputDir = "./packVersionComparisons";
const inputFileExtensions = [".mcaddon", ".mcpack"];

const args = process.argv.slice(2);

if(args.includes("--help") || args.includes("-h")) {
    console.log(`Usage: node extractAddOns.mjs [options]

Options:
--force, -f       Force overwrite of all output files.
--help, -h        Show this help message.`);
    process.exit(0);
}

const force = args.includes("--force") || args.includes("-f");
const inDir = path.relative(import.meta.dirname, inputDir);
const outDir = path.relative(import.meta.dirname, outputDir);

let extractedAddOnsCount = 0n;
let skippedAddOnsCount = 0n;

if (force) {
    console.log("Forcing overwrite of all output files.");
}

const files = readdirSync(inDir, {
    withFileTypes: true,
    encoding: "utf-8",
    recursive: true,
});

const outputDirFiles = readdirSync(outDir, {
    encoding: "utf-8",
    recursive: true,
});

const addons = files.filter((v) => v.isFile() && inputFileExtensions.includes(path.extname(v.name)));

// console.log(addons);

const bar = new ProgressBar('-> Extracting :bar :percent (:current/:total); :rate/fps; ETA: :etas; Time elapsed: :elapseds', {
    total: addons.length,
    width: 30,
    complete: '\u001B[48;2;0;255;0m \u001B[0m',
    incomplete: '\u001B[48;5;0m \u001B[0m',
});

addons.forEach((addon) => {
    try {
        if (!force && outputDirFiles.includes(path.relative(inDir, path.join(addon.parentPath, addon.name)))) {
            skippedAddOnsCount++;
            bar.tick();
            return;
        }
        const zip = new AdmZip(path.join(addon.parentPath, addon.name));
        // console.log(path.join(outDir, path.relative(inDir, path.join(addon.parentPath, addon.name))));
        zip.extractAllTo(path.join(outDir, path.relative(inDir, path.join(addon.parentPath, addon.name))), force);
        extractedAddOnsCount++;
        bar.tick();
    } catch (e) {
        console.error(`An error occured when extracting the following add-on file: ${path.join(addon.parentPath, addon.name)}`, e, e.stack);
        bar.tick();
    }
});

// await new Promise(resolve => setTimeout(resolve, 10));

console.log(`\nExtracted ${extractedAddOnsCount} add-ons. Skipped ${skippedAddOnsCount} add-ons.`);
