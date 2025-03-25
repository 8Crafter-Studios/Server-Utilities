import { system } from "@minecraft/server";
export async function checkIfCompatibleEntityScaleIsActive(init = false, maxWaitTicks = 20) {
    const promise1Result = await new Promise((resolve, reject) => {
        overworld.runCommand(`/scriptevent andexsa:debugSticks${init ? "Init" : "Test"}Signal ${format_version}`);
        const rId1 = system.afterEvents.scriptEventReceive.subscribe(event => {
            if (event.id == `andexdb:debugSticks${init ? "Init" : "Test"}SignalReceivedByEntityScale`) {
                system.afterEvents.scriptEventReceive.unsubscribe(rId1);
                resolve(event.message);
            }
            ;
        });
        if (maxWaitTicks != Infinity) {
            system.waitTicks(maxWaitTicks).then(v => reject(new TimeoutError(`The request to see if a compatible version of entity scale is active timed out. It took longer than ${maxWaitTicks} ticks.`)));
        }
    }).then(v => v, v => { return false; });
    return promise1Result;
}
//# sourceMappingURL=checkIfCompatibleEntityScaleIsActive.js.map