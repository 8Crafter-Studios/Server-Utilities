export type evaluateParametersParameter = {
    type: "presetText" | "number" | "boolean" | "neboolean" | "string" | "non-booleanString" | "json" | "Vector" | "Vector1" | "Vector2" | "Vector3" | "Vector4" | "Vector5" | "Vector6" | "Vector7" | "Vector8" | "targetSelector" | "blockStates" | "blockPattern" | "block" | "blockMask" | "dimension" | `-${string}` | `f-${string}`;
    maxLength?: number;
} | {
    type: "Vectors";
    vectorCount?: number;
    maxLength?: number;
} | "presetText" | "number" | "boolean" | "neboolean" | "string" | "non-booleanString" | "json" | "Vector" | "Vector1" | "Vector2" | "Vector3" | "Vector4" | "Vector5" | "Vector6" | "Vector7" | "Vector8" | "targetSelector" | "blockStates" | "blockPattern" | "block" | "blockMask" | "dimension" | `-${string}` | `f-${string}`;
