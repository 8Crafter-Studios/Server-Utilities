import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export type extendedExecuteCommandPlayerW = executeCommandPlayerW & {
    readonly id: string;
    readonly typeId: string;
    readonly name: string;
};
