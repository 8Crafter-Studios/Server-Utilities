import { world } from "@minecraft/server";
/**
 * @remarks Maps the dimension IDs to lowercase names of the dimensions types that all include "The" before the dimension name.
 * @property overworld: the overworld
 * @property minecraft:overworld: the overworld
 * @property nether: the nether
 * @property minecraft:nether: the nether
 * @property the_end: the end
 * @property minecraft:the_end: the end
 */
export const dimensionTypeDisplayFormatting = {
    "minecraft:overworld": "the overworld",
    overworld: "the overworld",
    "minecraft:nether": "the nether",
    nether: "the nether",
    "minecraft:the_end": "the end",
    the_end: "the end",
};
/**
 * @remarks Maps the dimension IDs to lowercase names of the dimensions types.
 * @property overworld: overworld
 * @property minecraft:overworld: overworld
 * @property nether: nether
 * @property minecraft:nether: nether
 * @property the_end: the end
 * @property minecraft:the_end: the end
 */
export const dimensionTypeDisplayFormattingB = {
    "minecraft:overworld": "overworld",
    overworld: "overworld",
    "minecraft:nether": "nether",
    nether: "nether",
    "minecraft:the_end": "the end",
    the_end: "the end",
};
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types that all include "The" before the dimension name.
 * @property overworld: The Overworld
 * @property minecraft:overworld: The Overworld
 * @property nether: The Nether
 * @property minecraft:nether: The Nether
 * @property the_end: The End
 * @property minecraft:the_end: The End
 */
export const dimensionTypeDisplayFormattingC = {
    "minecraft:overworld": "The Overworld",
    overworld: "The Overworld",
    "minecraft:nether": "The Nether",
    nether: "The Nether",
    "minecraft:the_end": "The End",
    the_end: "The End",
};
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types.
 * @property overworld: Overworld
 * @property minecraft:overworld: Overworld
 * @property nether: Nether
 * @property minecraft:nether: Nether
 * @property the_end: The End
 * @property minecraft:the_end: The End
 */
export const dimensionTypeDisplayFormattingD = {
    "minecraft:overworld": "Overworld",
    overworld: "Overworld",
    "minecraft:nether": "Nether",
    nether: "Nether",
    "minecraft:the_end": "The End",
    the_end: "The End",
};
/**
 * @remarks Maps the dimension IDs to titlecase names of the dimensions types that have formatting codes.
 * @property overworld: §aOverworld
 * @property minecraft:overworld: §aOverworld
 * @property nether: §cNether
 * @property minecraft:nether: §cNether
 * @property the_end: §dThe End
 * @property minecraft:the_end: §dThe End
 */
export const dimensionTypeDisplayFormattingE = {
    "minecraft:overworld": "§aOverworld",
    overworld: "§aOverworld",
    "minecraft:nether": "§cNether",
    nether: "§cNether",
    "minecraft:the_end": "§dThe End",
    the_end: "§dThe End",
};
/**
 * @remarks Maps the dimension IDs to their non-namespaces versions.
 * @property overworld: overworld
 * @property minecraft:overworld: overworld
 * @property nether: nether
 * @property minecraft:nether: nether
 * @property the_end: the_end
 * @property minecraft:the_end: the_end
 */
export const dimensionTypeDisplayFormattingF = {
    "minecraft:overworld": "overworld",
    overworld: "overworld",
    "minecraft:nether": "nether",
    nether: "nether",
    "minecraft:the_end": "the_end",
    the_end: "the_end",
};
/**
 * @remarks An array containing all of the dimension objects.
 * @property 0: Overworld
 * @property 1: Nether
 * @property 2: The End
 */
export const dimensions = [
    world.getDimension("overworld"),
    world.getDimension("nether"),
    world.getDimension("the_end"),
];
/**
 * @remarks Maps the namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 */
export const dimensionsb = {
    "minecraft:overworld": world.getDimension("overworld"),
    "minecraft:nether": world.getDimension("nether"),
    "minecraft:the_end": world.getDimension("the_end"),
};
/**
 * @remarks Maps the non-namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export const dimensionsc = {
    overworld: world.getDimension("overworld"),
    nether: world.getDimension("nether"),
    the_end: world.getDimension("the_end"),
};
/**
 * @remarks An array containing all of the namespaced dimension IDs.
 * ```typescript
 * 0: "minecraft:overworld"
 * 1: "minecraft:nether"
 * 2: "minecraft:the_end"
 * ```
 */
export const dimensionsd = [
    "minecraft:overworld",
    "minecraft:nether",
    "minecraft:the_end",
];
/**
 * @remarks An array containing all of the non-namespaced dimension IDs.
 * ```typescript
 * 0: "overworld"
 * 1: "nether"
 * 2: "the_end"
 * ```
 */
export const dimensionse = ["overworld", "nether", "the_end"];
/**
 * @remarks Maps the dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export const dimensionsf = {
    "minecraft:overworld": world.getDimension("overworld"),
    "minecraft:nether": world.getDimension("nether"),
    "minecraft:the_end": world.getDimension("the_end"),
    overworld: world.getDimension("overworld"),
    nether: world.getDimension("nether"),
    the_end: world.getDimension("the_end"),
};
/**
 * @remarks The overworld dimension object.
 */
export const overworld = world.getDimension("overworld");
/**
 * @remarks The nether dimension object.
 */
export const nether = world.getDimension("nether");
/**
 * @remarks The end dimension object.
 */
export const the_end = world.getDimension("the_end");
Object.defineProperties(globalThis, {
    dimensionTypeDisplayFormatting: {
        value: dimensionTypeDisplayFormatting,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionTypeDisplayFormattingB: {
        value: dimensionTypeDisplayFormattingB,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionTypeDisplayFormattingC: {
        value: dimensionTypeDisplayFormattingC,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionTypeDisplayFormattingD: {
        value: dimensionTypeDisplayFormattingD,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionTypeDisplayFormattingE: {
        value: dimensionTypeDisplayFormattingE,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionTypeDisplayFormattingF: {
        value: dimensionTypeDisplayFormattingF,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensions: {
        value: dimensions,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionsb: {
        value: dimensionsb,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionsc: {
        value: dimensionsc,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionsd: {
        value: dimensionsd,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionse: {
        value: dimensionse,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    dimensionsf: {
        value: dimensionsf,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    overworld: {
        value: overworld,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    nether: {
        value: nether,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    the_end: {
        value: the_end,
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
//# sourceMappingURL=dimensions.js.map