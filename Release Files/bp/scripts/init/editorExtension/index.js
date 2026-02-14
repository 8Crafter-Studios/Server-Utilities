import { BlockVolume } from "@minecraft/server";
import { ActionTypes, registerEditorExtension, ButtonVariant, RelativeVolumeListBlockVolume, ThemeSettingsColorKey, CoreMenuType, EditorInputContext, KeyboardKey, InputModifier, } from "@minecraft/server-editor";
import {} from "@minecraft/server-editor-bindings";
import {} from "@minecraft/server-editor-private-bindings";
//#vignore Testing
// const player: Player = undefined!;
// const { DebugLine, debugDrawer, DebugText } = await import("@minecraft/debug-utilities");
// const dt1 = new DebugText(player.dimensionLocation, "Test +X");
// dt1.color = { red: 1, green: 0, blue: 1 };
// debugDrawer.addShape(dt1);
// const dist = 3;
// const lines = [
//     [
//         { x: 0, y: 0, z: 0 },
//         { x: dist, y: 0, z: 0 },
//         { red: 1, green: 0, blue: 0 },
//     ],
//     [
//         { x: 0, y: dist, z: 0 },
//         { x: dist, y: dist, z: 0 },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: 0, y: 0, z: 0 },
//         { x: 0, y: dist, z: 0 },
//         { red: 0, green: 1, blue: 0 },
//     ],
//     [
//         { x: dist, y: 0, z: 0 },
//         { x: dist, y: dist, z: 0 },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: 0, y: 0, z: dist },
//         { x: dist, y: 0, z: dist },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: 0, y: dist, z: dist },
//         { x: dist, y: dist, z: dist },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: 0, y: 0, z: dist },
//         { x: 0, y: dist, z: dist },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: dist, y: 0, z: dist },
//         { x: dist, y: dist, z: dist },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: 0, y: 0, z: 0 },
//         { x: 0, y: 0, z: dist },
//         { red: 0, green: 0.5, blue: 1 },
//     ],
//     [
//         { x: dist, y: 0, z: 0 },
//         { x: dist, y: 0, z: dist },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: 0, y: dist, z: 0 },
//         { x: 0, y: dist, z: dist },
//         { red: 1, green: 1, blue: 1 },
//     ],
//     [
//         { x: dist, y: dist, z: 0 },
//         { x: dist, y: dist, z: dist },
//         { red: 1, green: 1, blue: 1 },
//     ],
// ];
// lines.forEach((line) => {
//     const l = new DebugLine({ ...Vector.add(player.location, line[0]), dimension: player.dimension }, Vector.add(player.location, line[1]));
//     l.color = line[2];
//     debugDrawer.addShape(l);
// });
//#endvignore Testing
// if (modules.mcDebugUtilities) {let shapeA = new modules.mcDebugUtilities.DebugSphere(players.Andexter8?.location); shapeA.color = {red: 0, green: 1, blue: 255}; shapeA.scale = 1; modules.mcDebugUtilities?.debugDrawer.addShape(shapeA);}
const serverUtilitiesThemeID = "andexdb:editor:theme:8CrafterServerUtilitiesTheme";
registerEditorExtension("8CrafterServerUtilities", function SUEditorExtensionActivation(uiSession) {
    //#region Theme
    const switchBackToServerUtilitiesTheme = uiSession.extensionContext.settings.theme.getCurrentTheme() === serverUtilitiesThemeID;
    if (uiSession.extensionContext.settings.theme.getThemeIdList().includes(serverUtilitiesThemeID))
        uiSession.extensionContext.settings.theme.deleteTheme(serverUtilitiesThemeID);
    uiSession.extensionContext.settings.theme.addNewTheme(serverUtilitiesThemeID, "8Crafter's Server Utilities", "minecraft:editor:theme:redstone");
    if (switchBackToServerUtilitiesTheme)
        uiSession.extensionContext.settings.theme.setCurrentTheme(serverUtilitiesThemeID);
    for (const [colorKey, color] of Object.entries(uiSession.extensionContext.settings.theme.getThemeColors(serverUtilitiesThemeID))) {
        uiSession.extensionContext.settings.theme.updateThemeColor(serverUtilitiesThemeID, colorKey, {
            red: color.green / 0x40,
            green: color.red /*  - color.blue */,
            blue: Math.max(color.red / 2 /* , color.blue */),
            alpha: color.alpha,
        });
    }
    // RGB theme code, keep this as an idea for the future, this code is fully functional.
    // system.runInterval((): void => {
    //     try {
    //         for (const [colorKey, color] of Object.entries(uiSession.extensionContext.settings.theme.getThemeColors(serverUtilitiesThemeID)!)) {
    //             uiSession.extensionContext.settings.theme.updateThemeColor(serverUtilitiesThemeID, colorKey as ThemeSettingsColorKey, {
    //                 red: Math.random(),
    //                 green: Math.random(),
    //                 blue: Math.random(),
    //                 alpha: color.alpha,
    //             });
    //         }
    //     } catch {}
    // }, 5);
    // uiSession.extensionContext.settings.theme.updateThemeColor(serverUtilitiesThemeID, ThemeSettingsColorKey.TitleBarBackground, {
    //     red: 0x00 / 0xff,
    //     green: 0xff / 0xff,
    //     blue: 0x88 / 0xff,
    //     alpha: 0xff / 0xff,
    // });
    //#endregion
    const scriptEvalPropertyPane = uiSession.createPropertyPane({ title: "Execute Script", uniqueId: "ScriptEval" });
    const scriptEvalOverlayPane = scriptEvalPropertyPane.createModalOverlayPane({ title: "Execute Script Modal" });
    let scriptEvalScriptContents = "";
    // TODO
    scriptEvalOverlayPane.contentPane.addString("a", {
        title: "JavaScript",
        onChange(newValue, _oldValue) {
            scriptEvalScriptContents = newValue;
        },
    });
    scriptEvalOverlayPane.contentPane.addButton(() => {
        eval(scriptEvalScriptContents);
    }, { variant: ButtonVariant.Confirmation, title: "Execute" });
    uiSession.log.debug(`Initializing ${uiSession.extensionContext.extensionInfo.name} extension`);
    console.log(uiSession.extensionContext.exportManager.getGameVersion());
    uiSession.menuBar.getMenu(CoreMenuType.Edit).then((menu) => {
        const flipSelectionVerticalAction = uiSession.actionManager.createAction({
            actionType: ActionTypes.NoArgsAction,
            async onExecute() {
                const volume = uiSession.extensionContext.selectionManager.volume.get();
                const bounds = volume.getBoundingBox();
                const volumeList = volume.getVolumeList();
                const newVolume = new RelativeVolumeListBlockVolume(volume.origin);
                for (const blockVolume of volumeList) {
                    // console.log(JSON.stringify([blockVolume.from, blockVolume.to])); // DEBUG
                    const originalFrom = { ...blockVolume.from };
                    const originalTo = { ...blockVolume.to };
                    const a = bounds.min.y + bounds.max.y - originalTo.y;
                    const b = bounds.min.y + bounds.max.y - originalFrom.y;
                    // blockVolume.from.y = Math.min(a, b);
                    // blockVolume.to.y = Math.max(a, b);
                    // blockVolume.from = { ...blockVolume.from, y: Math.min(a, b) };
                    // blockVolume.to = { ...blockVolume.to, y: Math.max(a, b) };
                    // console.log(JSON.stringify([blockVolume.from, blockVolume.to, a, b])); // DEBUG
                    // uiSession.extensionContext.selectionManager.volume.remove(blockVolume);
                    newVolume.add(new BlockVolume({ ...blockVolume.from, y: Math.min(a, b) }, { ...blockVolume.to, y: Math.max(a, b) }));
                }
                // volume.set(volumeList)
                // volumeList.forEach((volume: BlockVolume): void => newVolume.add(volume));
                // uiSession.extensionContext.selectionManager.volume.clear();
                // uiSession.extensionContext.selectionManager.volume.remove(volume);
                // volume.
                uiSession.extensionContext.selectionManager.volume.set(newVolume);
                // uiSession.extensionContext.widgetManager.
            },
        });
        menu.addItem({
            label: "andexdb.editorEdition.selection.menu.flipSelectionVertical.title",
            uniqueId: "andexdb:selection:menu:flipSelectionVertical",
            tooltip: "andexdb.editorEdition.selection.menu.flipSelectionVertical.tooltip",
        }, flipSelectionVerticalAction);
        uiSession.inputManager.registerKeyBinding(EditorInputContext.GlobalToolMode, flipSelectionVerticalAction, {
            key: KeyboardKey.KEY_F,
            modifier: InputModifier.Control | InputModifier.Shift,
        });
    });
    // IDEA: Add menu to apply an exact offset to the entire selection.
    // IDEA: Add menu to allow controlling which segments are selected (for things like the line tool).
    // IDEA: Add flip selection x/z option.
    // IDEA: Add a rotate selection option (maybe onto the point movement widgets?).
    // IDEA: Add an outline selection tool, or add an option to keep only the outline of the current selection.
    // IDEA: Add a walls selection tool, or add an option to keep only the walls of the current selection.
    // IDEA: Add a saved selection system.
    const action_ScriptEval = uiSession.actionManager.createAction({
        actionType: ActionTypes.NoArgsAction,
        async onExecute() {
            scriptEvalPropertyPane.show();
            scriptEvalOverlayPane.show();
            // uiSession.builtInUIManager.navigateToPauseScreen();
            // widget
            // modules.uis.mainMenu(uiSession.extensionContext.player);
            // editorInternal.getPlayerServices(players.Andexter8).input.focusViewport();
            // editorInternal.getPlayerServices(players.Andexter8).dataStore.paneContainer
        },
    });
    uiSession.actionBar.registerItem("ScriptEval", action_ScriptEval, {
        icon: "debugIcon",
        label: "Execute Script",
        tooltipTitle: "Execute Script",
        tooltipDescription: "Allows you to run JavaScript code.",
    });
    uiSession.log.debug(`Initialized ${uiSession.extensionContext.extensionInfo.name} extension`);
    return [];
}, function SUEditorExtensionShutdown(uiSession) {
    uiSession.log.debug(`Shutting down ${uiSession.extensionContext.extensionInfo.name} extension`);
    // uiSession.extensionContext.settings.theme.deleteTheme(serverUtilitiesThemeID);
}, { description: "The editor edition of 8Crafter's Server Utilities & Debug Sticks add-on." });
//# sourceMappingURL=index.js.map