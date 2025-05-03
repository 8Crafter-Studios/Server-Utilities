/**
 * @file typeDocGlobalsFixer.ts
 * @module typeDocGlobalsFixer
 * @description This file is used to fix the typeDoc Globals namespace.
 * @mergeModuleWith <project>
 */
import "index";
declare global {
    /**
     * These are all the global properties, all of these can be accessed directly or from the `globalThis` namespace.
     *
     * @example Accessing the global players getter directly:
     * ```typescript
     * const Andexter8 = players.Andexter8;
     * ```
     *
     * @example Accessing the global players getter from the globalThis namespace:
     * ```typescript
     * const Andexter8 = globalThis.players.Andexter8;
     * ```
     *
     * @namespace
     * @hideGroups References
     */
    export import Globals = globalThis;
}
import "typeDocGlobalsFixerB";
