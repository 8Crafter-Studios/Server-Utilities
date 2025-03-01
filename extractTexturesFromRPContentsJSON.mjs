import { copy } from "copy-paste";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const a = require("./RP/contents.json");
copy(
    JSON.stringify(
        a.content.map((v) => v.path).filter((v) => v.startsWith("textures/") && !v.endsWith(".json")),
        undefined,
        4
    )
);
