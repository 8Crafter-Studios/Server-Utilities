import "init/functions/breakpoint";
export declare const current_format_version = "1.28.0-preview.20+BUILD.1";
export declare const current_supported_minecraft_version = "1.21.5x";
declare global {
    namespace globalThis {
        var tempSavedVariables: any[];
        var crashEnabled: boolean;
        var format_version: typeof current_format_version;
        var supported_minecraft_version: typeof current_supported_minecraft_version;
        var editorStickMenuOpeningAsyncCancelActionNumbers: {
            [id: string]: number;
        };
        var beforeInitializeTick: number;
        var initializeTick: number;
        var beforeScriptStartTick: number;
        var scriptStartTick: number;
        var tempVariables: {
            [key: PropertyKey]: any;
        };
        var subscribedEvents: {
            [eventName: string]: Function;
        };
        var repeatingIntervals: {
            worldBorderSystem?: number;
            protectedAreasRefresher?: number;
            bannedPlayersChecker?: number;
            playerDataAutoSave?: number;
            [intervalName: string]: number;
        };
        var entity_scale_format_version: string | null;
        var multipleEntityScaleVersionsDetected: boolean;
    }
}
