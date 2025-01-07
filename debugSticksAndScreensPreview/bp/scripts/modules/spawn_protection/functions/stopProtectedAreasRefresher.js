import { system } from "@minecraft/server";
export async function stopProtectedAreasRefresher() {
    try {
        system.clearRun(repeatingIntervals.protectedAreasRefresher);
        repeatingIntervals.protectedAreasRefresher = null;
        return 1;
    }
    catch {
        return 0;
    }
}
;
//# sourceMappingURL=stopProtectedAreasRefresher.js.map