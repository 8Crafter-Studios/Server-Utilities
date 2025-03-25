import { Entity, Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { RedeemableCode } from "modules/main/classes/RedeemableCode";
export async function playerMenu_redeemCode(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    let form = new ModalFormData();
    form.title("Redeem Code");
    form.textField("Enter your code below", "Code");
    form.submitButton("Redeem Code");
    return await forceShow(form, sourceEntity)
        .then(async (r) => {
        if (r.canceled)
            return 1;
        try {
            RedeemableCode.redeemCode(r.formValues?.[0], sourceEntity);
            return ((await showMessage(sourceEntity, "Code Redeemed", `You have successfully redeemed the code ${JSON.stringify(r.formValues?.[0])}.`, "Okay", "Close")).selection !== 1).toNumber();
        }
        catch (e) {
            if (e instanceof Error && e.message === "Invalid code.") {
                return ((await showMessage(sourceEntity, "Invalid Code", `The code ${JSON.stringify(r.formValues?.[0])} does not exist.`, "Back", "Close")).selection !== 1).toNumber();
            }
            if (e instanceof Error && e.message === "This player has already redeemed this code.") {
                return ((await showMessage(sourceEntity, "Already Redeemed", `You have already redeemed the code ${JSON.stringify(r.formValues?.[0])}.`, "Back", "Close")).selection !== 1).toNumber();
            }
            return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred while redeeming the code ${JSON.stringify(r.formValues?.[0])}: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=playerMenu_redeemCode.js.map