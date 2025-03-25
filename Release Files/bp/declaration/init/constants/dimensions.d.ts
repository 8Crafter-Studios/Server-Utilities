import { type Dimension } from "@minecraft/server";
/**
 * @remarks Maps the dimension IDs to lowercase names of the dimensions types that all include "The" before the dimension name.
 * @property overworld: the overworld
 * @property minecraft:overworld: the overworld
 * @property nether: the nether
 * @property minecraft:nether: the nether
 * @property the_end: the end
 * @property minecraft:the_end: the end
 */
export declare const dimensionTypeDisplayFormatting: {
    "minecraft:overworld": "the overworld";
    overworld: "the overworld";
    "minecraft:nether": "the nether";
    nether: "the nether";
    "minecraft:the_end": "the end";
    the_end: "the end";
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
export declare const dimensionTypeDisplayFormattingB: {
    "minecraft:overworld": "overworld";
    overworld: "overworld";
    "minecraft:nether": "nether";
    nether: "nether";
    "minecraft:the_end": "the end";
    the_end: "the end";
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
export declare const dimensionTypeDisplayFormattingC: {
    "minecraft:overworld": "The Overworld";
    overworld: "The Overworld";
    "minecraft:nether": "The Nether";
    nether: "The Nether";
    "minecraft:the_end": "The End";
    the_end: "The End";
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
export declare const dimensionTypeDisplayFormattingD: {
    "minecraft:overworld": "Overworld";
    overworld: "Overworld";
    "minecraft:nether": "Nether";
    nether: "Nether";
    "minecraft:the_end": "The End";
    the_end: "The End";
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
export declare const dimensionTypeDisplayFormattingE: {
    "minecraft:overworld": "§aOverworld";
    overworld: "§aOverworld";
    "minecraft:nether": "§cNether";
    nether: "§cNether";
    "minecraft:the_end": "§dThe End";
    the_end: "§dThe End";
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
export declare const dimensionTypeDisplayFormattingF: {
    "minecraft:overworld": "overworld";
    overworld: "overworld";
    "minecraft:nether": "nether";
    nether: "nether";
    "minecraft:the_end": "the_end";
    the_end: "the_end";
};
/**
 * @remarks An array containing all of the dimension objects.
 * @property 0: Overworld
 * @property 1: Nether
 * @property 2: The End
 */
export declare const dimensions: [Dimension, Dimension, Dimension];
/**
 * @remarks Maps the namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 */
export declare const dimensionsb: {
    "minecraft:overworld": Dimension;
    "minecraft:nether": Dimension;
    "minecraft:the_end": Dimension;
};
/**
 * @remarks Maps the non-namespaced dimension IDs to the dimensions objects with the same IDs.
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export declare const dimensionsc: {
    overworld: Dimension;
    nether: Dimension;
    the_end: Dimension;
};
/**
 * @remarks An array containing all of the namespaced dimension IDs.
 * ```typescript
 * 0: "minecraft:overworld"
 * 1: "minecraft:nether"
 * 2: "minecraft:the_end"
 * ```
 */
export declare const dimensionsd: ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"];
/**
 * @remarks An array containing all of the non-namespaced dimension IDs.
 * ```typescript
 * 0: "overworld"
 * 1: "nether"
 * 2: "the_end"
 * ```
 */
export declare const dimensionse: ["overworld", "nether", "the_end"];
/**
 * @remarks Maps the dimension IDs to the dimensions objects with the same IDs.
 * @property minecraft:overworld: Overworld
 * @property minecraft:nether: Nether
 * @property minecraft:the_end: The End
 * @property overworld: Overworld
 * @property nether: Nether
 * @property the_end: The End
 */
export declare const dimensionsf: {
    "minecraft:overworld": Dimension;
    "minecraft:nether": Dimension;
    "minecraft:the_end": Dimension;
    overworld: Dimension;
    nether: Dimension;
    the_end: Dimension;
};
/**
 * @remarks The overworld dimension object.
 */
export declare const overworld: Dimension;
/**
 * @remarks The nether dimension object.
 */
export declare const nether: Dimension;
/**
 * @remarks The end dimension object.
 */
export declare const the_end: Dimension;
