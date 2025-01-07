import { system } from "@minecraft/server";
export function stopPlayerDataAutoSave() {
    try {
        try {
            system.clearRun(repeatingIntervals.playerDataAutoSave);
        }
        catch { }
        repeatingIntervals.playerDataAutoSave = null;
        globalThis.stopPlayerDataAutoSaveAsync = true;
        return 1;
    }
    catch {
        return 0;
    }
}
//# sourceMappingURL=stopPlayerDataAutoSave.js.map