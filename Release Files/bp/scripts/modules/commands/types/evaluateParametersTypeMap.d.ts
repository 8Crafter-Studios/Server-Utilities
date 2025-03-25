import type { BlockPattern } from "modules/commands/classes/BlockPattern";
export type evaluateParametersTypeMap = {
    presetText: string;
    number: number;
    boolean: boolean | undefined;
    neboolean: boolean | undefined;
    string: string | undefined;
    "non-booleanString": string | undefined;
    json: any;
    Vector: string | undefined;
    Vector1: string | undefined;
    Vector2: string | undefined;
    Vector3: string | undefined;
    Vector4: string | undefined;
    Vector5: string | undefined;
    Vector6: string | undefined;
    Vector7: string | undefined;
    Vector8: string | undefined;
    Vectors: string | undefined;
    targetSelector: string | undefined;
    blockStates: {
        [id: string]: string | number | boolean | undefined;
    } | undefined;
    blockPattern: BlockPattern | undefined;
    block: {
        id: string;
        states?: string;
    } | undefined;
};
