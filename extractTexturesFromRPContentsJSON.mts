import { copy } from "copy-paste";
import { readFileSync } from "fs";
import { createRequire } from "module";
import json5 from "json5";
const require = createRequire(import.meta.url);
const a: typeof import("./RP/contents.json") = json5.parse(readFileSync("./RP/contents.json", "utf-8"));
copy(
    JSON.stringify(
        a.content.map((v) => v.path).filter((v) => v.startsWith("textures/") && !v.endsWith(".json")),
        undefined,
        4
    )
);
