import { Player } from "@minecraft/server";
import type { ModalFormResponse, ActionFormResponse, MessageFormResponse } from "@minecraft/server-ui";
export declare function showCustomFormUI(UIId: String, player: Player): {
    form: import("@minecraft/server-ui").ModalFormData | import("@minecraft/server-ui").ActionFormData | import("@minecraft/server-ui").MessageFormData;
    customUI: {
        optionPropertyIds: string[];
        optionPropertyValues: string[];
        optionElements: import("../../main/classes/customFormUIElement").customFormUIElement[];
        codeIds: string[];
        codeValues: string[];
        code: string;
    };
    optionElements: import("../../main/classes/customFormUIElement").customFormUIElement[];
    formResponse: ModalFormResponse | ActionFormResponse | MessageFormResponse;
};
