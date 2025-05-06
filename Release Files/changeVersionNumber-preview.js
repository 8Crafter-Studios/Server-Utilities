import { readFileSync, writeFileSync } from "fs";
import JSON5 from "json5";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const args = process.argv.slice(2);

if (args.length === 0) {
    throw new SyntaxError("No arguments provided. Use the --help or -h option to see the usage.");
}

if (args.includes("--help") || args.includes("-h")) {
    console.log(`Usage: node changeVersionNumber-fr.js [options]

Options:
--mcversion=<mcversion>, -m=<mcversion>     Specify the new Minecraft version to use.
--mcversionprompt, -mp                  Prompt for the new Minecraft version to use.
--version=<version>, -v=<version>       Specify the new version to use.
--versionprompt, -vp                    Prompt for the new version to use.
--help, -h                              Show this help message.

Paramters:
<mcversion>                             The new Minecraft version to use. Must match the following regex: /^([0-9]+x?|x)\\.([0-9]+x?|x)\\.([0-9]+x?|x)(-[^+]*?)?(\\+\\.*?)?\\+?$/.
<version>                               The new version to use. Must be a valid semver string, the "v" at the beginning is optional.`);
    process.exit(0);
}

let manifestBPRaw = readFileSync("./previews/bp/manifest.json", "utf-8");

/**
 * @type {import("./previews/bp/manifest.json")}
 */
const manifest = JSON5.parse(manifestBPRaw);

const originalVersion = manifest.header.version;

const originalMCVersion = manifest.header.name.match(
    /(?<=\(for minecraft bedrock edition )([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)(?=\))/
)?.[0];

let newMCVersion = "";

if (originalMCVersion === undefined) {
    console.error("\u001B[38;2;255;0;0mCould not find original Minecraft version. Exiting...\u001B[0m");
    process.exit(1);
}

if (args.some((arg) => arg.startsWith("--mcversion="))) {
    newMCVersion =
        args
            .find((arg) => arg.startsWith("--mcversion="))
            ?.replace(/^--mcversion="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newMCVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new supported Minecraft version provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg.startsWith("-m="))) {
    newMCVersion =
        args
            .find((arg) => arg.startsWith("-m="))
            ?.replace(/^-m="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newMCVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new supported Minecraft version provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg === "-mp") || args.some((arg) => arg === "--mcversionprompt")) {
    newMCVersion =
        prompt("\u001B[38;2;0;255;255mEnter new supported Minecraft version: \u001B[38;2;0;255;128m")
            ?.replace(/^-m="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newMCVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new supported Minecraft version provided.\u001B[0m");
        process.exit(1);
    }
}

if (newMCVersion !== "" && !/^([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)$/.test(newMCVersion)) {
    console.error("Invalid new supported Minecraft version: \u001B[38;2;0;255;128mv" + newMCVersion);
    process.exit(1);
}

let newVersion = "";

if (args.some((arg) => arg.startsWith("--version="))) {
    newVersion =
        args
            .find((arg) => arg.startsWith("--version="))
            ?.replace(/^--version="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new version number provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg.startsWith("-v="))) {
    newVersion =
        args
            .find((arg) => arg.startsWith("-v="))
            ?.replace(/^-v="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new version number provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg === "-vp") || args.some((arg) => arg === "--versionprompt")) {
    newVersion = prompt("\u001B[38;2;0;255;255mEnter new version number: \u001B[38;2;0;255;128m").replace(/^v/, "");

    if (newVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new version number provided.\u001B[0m");
        process.exit(1);
    }
}

if (newVersion === originalVersion && newMCVersion === originalMCVersion) {
    console.error(
        "\u001B[38;2;255;0;0mBoth the new version number and the new supported Minecraft version number are the same as the original version numbers. Exiting...\u001B[0m"
    );
    process.exit(1);
}

if (newVersion === originalVersion && newMCVersion === "") {
    console.error(
        "\u001B[38;2;255;0;0mNew version number is the same as the original version number and new supported Minecraft version number is not provided. Exiting...\u001B[0m"
    );
    process.exit(1);
}

if (newVersion === "" && newMCVersion === originalMCVersion) {
    console.error(
        "\u001B[38;2;255;0;0mNew supported Minecraft version number is the same as the original supported Minecraft version number and new version number is not provided. Exiting...\u001B[0m"
    );
    process.exit(1);
}

if (newVersion === originalVersion) {
    console.warn(
        "\u001B[38;2;255;255;0mWARNING: New version number is the same as the original version number. This version number will not be changed.\u001B[0m"
    );
}

if (newMCVersion === originalMCVersion) {
    console.warn(
        "\u001B[38;2;255;255;0mWARNING: New supported Minecraft version number is the same as the original supported Minecraft version number. This supported Minecraft version number will not be changed.\u001B[0m"
    );
}

if (newVersion === "" && newMCVersion === "") {
    console.error("\u001B[38;2;255;0;0mNo new version number or supported Minecraft version number provided. Exiting...\u001B[0m");
    process.exit(1);
}

if (newVersion !== "" && !/^[0-9]+\.[0-9]+\.[0-9]+(-[^+]*)?(\+.*)?$/.test(newVersion)) {
    console.error("\u001B[38;2;255;0;0mSyntax Error: Invalid new version number: \u001B[38;2;0;255;128mv" + newVersion + "\u001B[0m");
    process.exit(1);
}

let manifestRPRaw = readFileSync("./previews/rp/manifest.json", "utf-8");
let rawInitializeMainGlobalVariablesFileJS = readFileSync("./previews/bp/scripts/initializeMainGlobalVariables.js", "utf-8");
let rawInitializeMainGlobalVariablesFileDTS = readFileSync("./previews/bp/scripts/initializeMainGlobalVariables.d.ts", "utf-8");
/**
 * This file has the "8Crafter's Server Utilities" settings section, which has the add-on's version number and supported
 * Minecraft version number.
 *
 * @type {string}
 */
let settingsScreenJSON = readFileSync("./previews/rp/ui/settings_screen.json", "utf-8");
/**
 * This file has the how-to-play screen, which has the add-on's supported Minecraft version number in the setup section,
 * including two examples based on the add-on's supported Minecraft version number, one with the x replaced with 0 and
 * one with the x replaced with 1.
 *
 * @type {string}
 */
let howToPlayScreenJSON = readFileSync("./previews/rp/ui/how_to_play_screen.json", "utf-8");
/**
 * This file has the translation language strings, which has the add-on's version number under two properties: 8crafterdebugsticksrp.version and 8crafterdebugsticksrp2.version.
 *
 * @type {string}
 */
let enUSTextsLang = readFileSync("./previews/rp/texts/en_US.lang", "utf-8");

if (newVersion !== "") {
    if (!rawInitializeMainGlobalVariablesFileJS.includes('mainGlobalVariables.current_format_version = "' + originalVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./previews/bp/scripts/initializeMainGlobalVariables.js does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                rawInitializeMainGlobalVariablesFileJS.match(
                    /(?<=mainGlobalVariables.current_format_version = ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!rawInitializeMainGlobalVariablesFileDTS.includes('const current_format_version = "' + originalVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./previews/bp/scripts/initializeMainGlobalVariables.d.ts does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                rawInitializeMainGlobalVariablesFileDTS.match(/(?<=const current_format_version = ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=";)/)?.[0] ??
                "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!settingsScreenJSON.includes("(Version: " + originalVersion + " for ")) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./previews/rp/ui/settings_screen.json does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                settingsScreenJSON.match(/(?<=\(Version: )[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+[^a-zA-Z.\-+0-9_=]*?)?(?= for )/)?.[0] ??
                "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }

    if (
        !enUSTextsLang.includes("8crafterdebugsticksrp.version=" + originalVersion + "\n") &&
        !enUSTextsLang.includes("8crafterdebugsticksrp.version=" + originalVersion + "\r")
    ) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./previews/rp/texts/en_US.lang does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                enUSTextsLang.match(/(?<=8crafterdebugsticksrp\.version=)[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=\s)/)?.[0] ??
                "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }

    manifestBPRaw = manifestBPRaw.replaceAll(originalVersion, newVersion);
    manifestRPRaw = manifestRPRaw.replaceAll(originalVersion, newVersion);
    rawInitializeMainGlobalVariablesFileJS = rawInitializeMainGlobalVariablesFileJS.replace(
        'mainGlobalVariables.current_format_version = "' + originalVersion + '";',
        'mainGlobalVariables.current_format_version = "' + newVersion + '";'
    );
    rawInitializeMainGlobalVariablesFileDTS = rawInitializeMainGlobalVariablesFileDTS.replace(
        'const current_format_version = "' + originalVersion + '";',
        'const current_format_version = "' + newVersion + '";'
    );
    settingsScreenJSON = settingsScreenJSON.replace("(Version: " + originalVersion + " for ", "(Version: " + newVersion + " for ");
    enUSTextsLang = enUSTextsLang
        .replace(
            new RegExp(`8crafterdebugsticksrp\\.version=${originalVersion.replaceAll(".", "\\.")}\\s?\\n`),
            "8crafterdebugsticksrp.version=" + newVersion + "\n"
        )
        .replace(
            new RegExp(`8crafterdebugsticksrp2\\.version=${originalVersion.replaceAll(".", "\\.")}\\s?\\n`),
            "8crafterdebugsticksrp2.version=" + newVersion + "\n"
        );
}

if (newMCVersion !== "") {
    if (!rawInitializeMainGlobalVariablesFileJS.includes('mainGlobalVariables.current_supported_minecraft_version = "' + originalMCVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./previews/bp/scripts/initializeMainGlobalVariables.js does not contain the original supported Minecraft version number: \u001B[38;2;0;255;128mv${originalMCVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128m${
                rawInitializeMainGlobalVariablesFileJS.match(
                    /(?<=mainGlobaLVariables.current_supported_minecraft_version = ")([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!rawInitializeMainGlobalVariablesFileDTS.includes('const current_supported_minecraft_version = "' + originalMCVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./previews/bp/scripts/initializeMainGlobalVariables.d.ts does not contain the original supported Minecraft version number: \u001B[38;2;0;255;128mv${originalMCVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128m${
                rawInitializeMainGlobalVariablesFileDTS.match(
                    /(?<=const current_supported_minecraft_version = ")([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }

    manifestBPRaw = manifestBPRaw.replaceAll(
        "(for minecraft bedrock edition " + originalMCVersion + ")",
        "(for minecraft bedrock edition " + newMCVersion + ")"
    );
    manifestRPRaw = manifestRPRaw.replaceAll(
        "(for minecraft bedrock edition " + originalMCVersion + ")",
        "(for minecraft bedrock edition " + newMCVersion + ")"
    );
    rawInitializeMainGlobalVariablesFileJS = rawInitializeMainGlobalVariablesFileJS.replace(
        'mainGlobalVariables.current_supported_minecraft_version = "' + originalMCVersion + '";',
        'mainGlobalVariables.current_supported_minecraft_version = "' + newMCVersion + '";'
    );
    rawInitializeMainGlobalVariablesFileDTS = rawInitializeMainGlobalVariablesFileDTS.replace(
        'const current_supported_minecraft_version = "' + originalMCVersion + '";',
        'const current_supported_minecraft_version = "' + newMCVersion + '";'
    );
    settingsScreenJSON = settingsScreenJSON.replace(" for " + originalMCVersion + ")", " for " + newMCVersion + ")");
    howToPlayScreenJSON = howToPlayScreenJSON.replace(
        `§cTHIS VERSION OF THIS ADD-ON WILL ONLY WORK FOR MINECRAFT §a${originalMCVersion} §c(ex. §a${originalMCVersion.replace(
            "x",
            "0"
        )}§c or §a${originalMCVersion.replace("x", "1")}§c).`,
        `§cTHIS VERSION OF THIS ADD-ON WILL ONLY WORK FOR MINECRAFT §a${newMCVersion} §c(ex. §a${newMCVersion.replace("x", "0")}§c or §a${newMCVersion.replace(
            "x",
            "1"
        )}§c).`
    );
}

writeFileSync("./previews/bp/manifest.json", manifestBPRaw);
writeFileSync("./previews/rp/manifest.json", manifestRPRaw);
writeFileSync("./previews/bp/scripts/initializeMainGlobalVariables.js", rawInitializeMainGlobalVariablesFileJS);
writeFileSync("./previews/bp/scripts/initializeMainGlobalVariables.d.ts", rawInitializeMainGlobalVariablesFileDTS);
writeFileSync("./previews/rp/ui/settings_screen.json", settingsScreenJSON);
writeFileSync("./previews/rp/ui/how_to_play_screen.json", howToPlayScreenJSON);
writeFileSync("./previews/rp/texts/en_US.lang", enUSTextsLang);

console.log(
    `\u001B[38;2;0;255;0m${
        newVersion !== "" && newVersion !== originalVersion
            ? `Successfully changed version number from \u001B[38;2;255;0;0mv${originalVersion}\u001B[38;2;0;255;0m to \u001B[38;2;0;255;255mv${newVersion}\u001B[38;2;0;255;0m. `
            : ""
    }${
        newMCVersion !== "" && newMCVersion !== originalMCVersion
            ? `Successfully changed supported Minecraft version number from \u001B[38;2;255;0;0mv${originalMCVersion}\u001B[38;2;0;255;0m to \u001B[38;2;0;255;255mv${newMCVersion}\u001B[38;2;0;255;0m.`
            : ""
    }\u001B[0m`
);
