import type { RawMessage } from "@minecraft/server";
export type ModalFormElements = ({
    type: "title";
    title: RawMessage | string;
} | {
    type: "textField";
    label: RawMessage | string;
    placeholderText: RawMessage | string;
    defaultValue?: RawMessage | string;
} | {
    type: "dropdown";
    label: RawMessage | string;
    options: (RawMessage | string)[];
    defaultValueIndex?: number;
} | {
    type: "toggle";
    label: RawMessage | string;
    defaultValue?: boolean;
} | {
    type: "slider";
    label: RawMessage | string;
    minimumValue: number;
    maximumValue: number;
    valueStep: number;
    defaultValue?: number;
} | {
    type: "submitButton";
    submitButtonText: RawMessage | string;
})[];
