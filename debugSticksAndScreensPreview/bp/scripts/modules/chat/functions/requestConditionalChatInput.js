import { Player, ChatSendBeforeEvent, system } from "@minecraft/server";
import { currentlyRequestedChatInput } from "modules/chat/constants/currentlyRequestedChatInput";
import { idGenerator } from "modules/commands/functions/idGenerator";
export async function requestConditionalChatInput(player, conditions = () => true, options = {}) {
    let id = idGenerator();
    const expireTime = Date.now() + (options.expireMs ?? Infinity);
    !!options.requestMessage ? player.sendMessage(options.requestMessage) : undefined;
    !!!currentlyRequestedChatInput[player.id] ? currentlyRequestedChatInput[player.id] = { anyInput: {}, conditionalInput: { [id]: { time: Date.now(), id: id, request: options.requestMessage, conditions: conditions ?? (() => true), expireTime: expireTime, expireConditions: options.expireConditions ?? (() => false) } } } : currentlyRequestedChatInput[player.id].conditionalInput[id] = { time: Date.now(), id: id, request: options.requestMessage, conditions: conditions ?? (() => true), expireTime: Date.now() + (options.expireMs ?? Infinity), expireConditions: options.expireConditions ?? (() => false) };
    return new Promise((resolve, reject) => {
        function a() {
            if (!player.isValid()) {
                delete currentlyRequestedChatInput[player.id];
                reject(new ReferenceError("The player that the input was requested from is no longer valid, most likely the have left the game."));
                return;
            }
            ;
            if (!!!currentlyRequestedChatInput[player.id].conditionalInput[id].input) {
                if (Date.now() > (currentlyRequestedChatInput[player.id].conditionalInput[id].expireTime ?? Infinity)) {
                    delete currentlyRequestedChatInput[player.id].conditionalInput[id];
                    reject(new TimeoutError("The request timed out."));
                    return;
                }
                else if (!!options.expireConditions ? currentlyRequestedChatInput[player.id].conditionalInput[id].expireConditions(currentlyRequestedChatInput[player.id].conditionalInput[id]) ?? false : false) {
                    delete currentlyRequestedChatInput[player.id].conditionalInput[id];
                    reject(new ExpireError("The request expired."));
                    return;
                }
                else {
                    system.run(() => {
                        a();
                    });
                }
            }
            else {
                let input = currentlyRequestedChatInput[player.id].conditionalInput[id].input;
                delete currentlyRequestedChatInput[player.id].conditionalInput[id];
                resolve(input);
            }
        }
        a();
    });
}
//# sourceMappingURL=requestConditionalChatInput.js.map