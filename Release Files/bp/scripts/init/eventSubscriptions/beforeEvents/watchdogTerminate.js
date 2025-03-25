import { system, world } from "@minecraft/server";
subscribedEvents.beforeWatchdogTerminate =
    system.beforeEvents.watchdogTerminate.subscribe((e) => {
        try {
            if (crashEnabled == true) {
                return;
            }
            else {
                if (world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") == true) {
                    return;
                }
                else {
                    e.cancel = true;
                    console.warn(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`);
                    try {
                        world
                            .getAllPlayers()
                            .filter((p) => p.hasTag("getWatchdogTerminationCancelWarnings"))
                            .forEach((p) => p.sendMessage(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`));
                    }
                    catch { }
                }
            }
        }
        catch {
            e.cancel = true;
            console.warn(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`);
            try {
                world
                    .getAllPlayers()
                    .filter((p) => p.hasTag("getWatchdogTerminationCancelWarnings"))
                    .forEach((p) => p.sendMessage(`[Watchdog] Canceled critical exception of type '${e.terminateReason}'`));
            }
            catch { }
        }
    });
//# sourceMappingURL=watchdogTerminate.js.map