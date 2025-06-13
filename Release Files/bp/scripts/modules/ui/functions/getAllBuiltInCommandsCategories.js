import { commands } from "modules/commands_list/constants/commands";
export function getAllBuiltInCommandsCategories() {
    let set = new Set();
    commands
        .map((v) => v.category)
        .forEach((v) => typeof v == "string" ? set.add(v) : v?.forEach((v) => set.add(v)));
    return [...set];
}
//# sourceMappingURL=getAllBuiltInCommandsCategories.js.map