/**
 * @file typeDocGlobalsFixerB.ts
 * @module typeDocGlobalsFixerB
 * @description This file is used to fix the typeDoc Globals namespace.
 * @mergeModuleWith <project>
 */
import "index";
declare global {
    /**
     * @namespace
     */
    export const Globals: typeof globalThis;
}
