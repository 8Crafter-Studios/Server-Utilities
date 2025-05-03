export type menuButtonIdsType = {
    [menuId: string]: {
        paths: string[];
        supportedModes: {
            simple: boolean;
            advanced: boolean;
        };
        buttons: {
            [buttonId: string]: {
                displayName: string;
                icon?: string;
                deprecated: boolean;
                experimental: boolean;
                unused: boolean;
                upcoming: boolean;
                functional: boolean;
                advanced: boolean;
                extraVisibilityConditionsCheck?: () => boolean;
                extraVisibilityConditionsCheckFailedReason?: () => string;
                defaultButtonIndex: number;
            };
        };
    };
};
