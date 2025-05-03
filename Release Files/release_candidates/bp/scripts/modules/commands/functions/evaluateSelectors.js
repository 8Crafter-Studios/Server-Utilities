import { Block, Entity, Player, Dimension } from "@minecraft/server";
import { getEntityById } from "modules/commands/functions/getEntityById";
import { targetSelectorAllListE } from "modules/command_utilities/functions/targetSelectorAllListE";
import { targetSelectorAllListD } from "modules/command_utilities/functions/targetSelectorAllListD";
import { targetSelectorAllListC } from "modules/command_utilities/functions/targetSelectorAllListC";
export function evaluateSelectors(selector, options) {
    if (!!selector
        .trimStart()
        .replaceAll("\\", "")
        .match(/^(@[aeprs]\s*\[|@[aeprs]\s+)/)) {
        return !!options
            ? !!options?.source
                ? !(options.source instanceof Block)
                    ? targetSelectorAllListC(selector, "", (options.location ?? options.source.location).x +
                        " " +
                        (options.location ?? options.source.location).y +
                        " " +
                        (options.location ?? options.source.location).z, options.source)
                    : targetSelectorAllListD(selector, (options.location ?? options.source.location).x +
                        " " +
                        (options.location ?? options.source.location).y +
                        " " +
                        (options.location ?? options.source.location).z, options.dimension ??
                        options.location?.dimension)
                : !!(options.dimension ??
                    options.location?.dimension)
                    ? targetSelectorAllListE(selector, (options.location ?? { x: 0, y: 0, z: 0 }).x +
                        " " +
                        (options.location ?? { x: 0, y: 0, z: 0 }).y +
                        " " +
                        (options.location ?? { x: 0, y: 0, z: 0 }).z)
                    : targetSelectorAllListD(selector, (options.location ?? { x: 0, y: 0, z: 0 }).x +
                        " " +
                        (options.location ?? { x: 0, y: 0, z: 0 }).y +
                        " " +
                        (options.location ?? { x: 0, y: 0, z: 0 }).z, options.dimension ??
                        options.location?.dimension)
            : targetSelectorAllListE(selector, "0 0 0");
    }
    else if ((options?.enableI ?? true) == true &&
        !!selector
            .trimStart()
            .replaceAll("\\", "")
            .match(/^(@i\s*\[|@i\s+)/)) {
        return getEntityById(selector
            .trim()
            .match(/^(?<=@i\s*\[((?:uu)?id=)?(?:")?)[\-\+]?\d(?=(?:")?\])/)[0]);
    }
    else if ((options?.enableJ ?? false) == true &&
        !!selector
            .trimStart()
            .replaceAll("\\", "")
            .match(/^(@j\s*\[|@j\s+)/)) {
        return eval(selector.trim().match(/^(?<=@j\s*\[)[\-\+]?\d(?=\])/)[0]);
    }
}
//# sourceMappingURL=evaluateSelectors.js.map