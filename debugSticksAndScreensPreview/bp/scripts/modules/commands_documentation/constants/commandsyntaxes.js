import { world } from "@minecraft/server";
// import { command } from "modules/commands/classes/command";
const command = {
    get dp() {
        return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
    }
};
export const commandsyntaxes = {
    "align": `${command.dp}align`,
    "aligncenter": `${command.dp}aligncenter`,
    "binvsee": `${command.dp}binvsee <dimension: dimension|~> <block: x y z>`,
    "block": `${command.dp}block
${command.dp}block facing get color ...
    ... rgba hex
    ... rgba frac
    ... rgba dec
    ... rgba decr
    ... rgb hex
    ... rgb frac
    ... rgb dec
    ... rgb decr
    ... hsl
    ... hsluv
    ... (hsv|hsb)
    ... hsi
    ... hpluv
    ... AdobeRGB
    ... CIELuv
    ... CIExyY
${command.dp}block facing get filllevel
${command.dp}block facing set color ...
    ... rgba hex <hexRGBAColor: RRGGBBAA|RGBA>
    ... rgba frac <red: float[min=0.0,max=1.0]> <green: float[min=0.0,max=1.0]> <blue: float[min=0.0,max=1.0]> <alpha: float[min=0.0,max=1.0]>
    ... rgba dec <red: int[min=0,max=255]> <green: int[min=0,max=255]> <blue: int[min=0,max=255]> <alpha: int[min=0,max=255]>
    ... rgba decr <red: float[min=0.0,max=255.0]> <green: float[min=0.0,max=255.0]> <blue: float[min=0.0,max=255.0]> <alpha: float[min=0.0,max=255.0]>
    ... rgb hex <hexRGBAColor: RRGGBB|RGB>
    ... rgb frac <red: float[min=0.0,max=1.0]> <green: float[min=0.0,max=1.0]> <blue: float[min=0.0,max=1.0]>
    ... rgb dec <red: int[min=0,max=255]> <green: int[min=0,max=255]> <blue: int[min=0,max=255]>
    ... rgb decr <red: float[min=0.0,max=255.0]> <green: float[min=0.0,max=255.0]> <blue: float[min=0.0,max=255.0]>
    ... hsl <hue: float[min=0.0,max=360.0]> <saturation: float[min=0.0,max=100.0]> <lightness: float[min=0.0,max=100.0]>
${command.dp}block facing set filllevel <fillLevel: int[min=0,max=6]>`,
    "chatcommandui": `${command.dp}chatcommandui`,
    "chatsendui": `${command.dp}chatsendui`,
    "chunkban": `${command.dp}chunkban [slot: int|~] [loopCount: int] [target: string|~]`,
    "clear": `§cThis command is still unfinished! `,
    "clearenderchest": `clearenderchest [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "clearenderchestslot": `clearenderchestslot [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "cloneitem": `${command.dp}cloneitem [toPlayer: target|~]`,
    "closeuis": `${command.dp}closeuis`,
    "closeui": `${command.dp}closeui`,
    "cmdui": `${command.dp}cmdui`,
    "compressitems": `${command.dp}compressitems [mode: inventory|hotbar|armor|equipment|all] [target: string|~]`,
    "compressitemsshulker": `${command.dp}compressitemsshulker [mode: inventory|hotbar|armor|equipment|all] [target: string|~]`,
    "compressitemscontainer": `${command.dp}compressitemscontainer [containerType: Block] [mode: inventory|hotbar|armor|equipment|all] [target: string|~]`,
    "compressitemscontainerb": `${command.dp}compressitemscontainerb [containerType: Block] [mode: inventory|hotbar|armor|equipment|all] [target: string|~]`,
    "copyitem": `${command.dp}copyitem [toSlot: int|head|chest|legs|feet|mainhand|offhand|~] [toPlayer: (target|~)[?=~]]`,
    "copyitemfrom": `${command.dp}copyitemfrom <fromSlot: int|{head}|{chest}|{legs}|{feet}|{mainhand}|{offhand}> [toSlot: (int|{head}|{chest}|{legs}|{feet}|{mainhand}|{offhand})[?=~]] [fromPlayer: (playerName|~)[?=~]] [toPlayer: (playerName|~)[?=~]]`,
    "createexplosion": `${command.dp}createexplosion <location: x y z> [dimension: string] [radius: float] [allowUnderwater: bool] [breaksBlocks: bool] [causesFire: bool] [source: target]`,
    "datapickblock": `${command.dp}datapickblock`,
    "debugstickdyingmode": `${command.dp}debugstickdyingmode [enabled: bool[?=toggle]]`,
    "debugsticksdyingmode": `${command.dp}debugsticksdyingmode [enabled: bool[?=toggle]]`,
    "dsdm": `${command.dp}dsdm [enabled: bool[?=toggle]]`,
    "defaulthealth": `${command.dp}defaulthealth [target: target[?=@s,allowMultiple=true]]`,
    "dfthlth": `${command.dp}dfthlth [target: target[?=@s,allowMultiple=true]]`,
    "dfthealth": `${command.dp}dfthealth [target: target[?=@s,allowMultiple=true]]`,
    "dflthealth": `${command.dp}dflthealth [target: target[?=@s,allowMultiple=true]]`,
    "drain": `${command.dp}drain [radius: number]`,
    "dupeitem": `${command.dp}dupeitem [slot: int|head|chest|legs|feet|mainhand|offhand|~]`,
    "eb": `${command.dp}eb [level: number[?=0]]`,
    "ec": `${command.dp}ec`,
    "ecinvsee": `ecinvsee [target: string|~]`,
    "ecinvseec": `ecinvseec [target: string|~]`,
    "editorstick": `${command.dp}editorstick`,
    "editorstickb": `${command.dp}editorstickb`,
    "editorstickc": `${command.dp}editorstickc`,
    "einvsee": `${command.dp}einvsee <targetSelector: target>`,
    "einvseeb": `${command.dp}einvseeb <targetSelector: target>`,
    "enchantmentbarrels": `${command.dp}enchantmentbarrels [level: number[?=0]]`,
    "enderchest": `${command.dp}enderchest`,
    "entityscaleversion": `${command.dp}entityscaleversion`,
    "esver": `${command.dp}esver`,
    "eval": `${command.dp}eval <ScriptAPICode: JavaScript>`,
    "execute": `${command.dp}execute [-fsqbc] ...
${command.dp}... align <axes: string> ...
${command.dp}... anchored <eyes|feet> ...
${command.dp}... as <origin: target> ...
${command.dp}... at <origin: target> ...
${command.dp}... sendfeedbackto <origin: target> ...
${command.dp}... resetfeedbacktarget ...
${command.dp}... facingblock <position: x y z> ...
${command.dp}... facing <origin: target> ...
${command.dp}... facingentity <origin: target> ...
${command.dp}... in <dimension: Dimension> ...
${command.dp}... positioned <position: x y z> ...
${command.dp}... rotated <yaw: value> <pitch: value> ...
${command.dp}... matchlocation <origin: target> ...
${command.dp}... matchrotation <origin: target> ...
${command.dp}... matchdimension <origin: target> ...
${command.dp}... if block <position: x y z> <block: Block> <blockStates: block states> ...
${command.dp}... if entity <target: target> ...
${command.dp}... run <command: command>`,
    "ext": `${command.dp}ext [radius: float[?=10]]`,
    "extinguish": `${command.dp}extinguish [radius: float[?=10]]`,
    "extrafeaturessettings": `${command.dp}extrafeaturessettings`,
    "ex": `${command.dp}ex [radius: float[?=10]]`,
    "remfire": `${command.dp}remfire [radius: float[?=10]]`,
    "fill": `${command.dp}fill <from: x y z> <to: x y z> <tileName: Block> [blockStates: block states] [replaceTileName: Block] [replaceBlockStates: block states]\n${command.dp}fill <from: x y z> <to: x y z> <tileName: Block> <replaceTileName: Block> [replaceBlockStates: block states]`,
    "fillillegal": `${command.dp}fillillegal [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "fillinventory": `${command.dp}fillinventory <itemJSON: itemJSON> [stackCount: int|fill|replaceall|replacefill] [target: string|~]`,
    "filljunk": `${command.dp}filljunk [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "fillop": `${command.dp}fillop [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "fillrandom": `${command.dp}fillrandom [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "getbans": `${command.dp}getbans`,
    "getidbans": `${command.dp}getidbans`,
    "getnamebans": `${command.dp}getnamebans`,
    "getuuid": `${command.dp}getuuid <targets: target[allowMultiple=true]>`,
    "gma": `${command.dp}gma`,
    "getworldspawnpoint": `${command.dp}getworldspawnpoint`,
    "give": `${command.dp}give <item: itemType> [amount: int[min=1,max=255]]`,
    "giveb": `${command.dp}giveb <item: itemType> [stackSize: int[min=1,max=255]>`,
    "givec": `${command.dp}givec <itemJSON: itemJSON>
simplified itemJSON format (type "${command.dp}help itemJSONFormat" to see full format options): 
{
    "name"?: string,
    "lore"?: string[],
    "count"?: number,
    "keepondeath"?: boolean,
    "lockmode"?: ItemLockMode,
    "canplaceon"?: string[],
    "components"?: {
        "enchantable"?: {
            "add"?: Enchantment|Enchantment[],
            "addList"?: Enchantment[],
            "remove"?: Enchantment,
            "removeEnchantments"?: Enchantment,
            "clear"?: any
        },
        "durability"?: {
            "durability"?: number,
            "damage"?: number,
            "repair"?: number,
            "setDurabilityToMax"?: any
        },
        "damage"?: {
            "durability"?: number,
            "damage"?: number,
            "repair"?: number,
            "setDurabilityToMax"?: any
        }
    },
    force?: boolean
    source?: {
        type?: string,
        targetSelector?: string,
        targetSelectorExecutionLocation?: DimensionLocation,
        targetSelectorSourceEntity?: Entity,
        player?: string,
        entityAtBlock?: DimensionLocation,
        entityType?: string,
        entityTypeId?: string,
        entityId?: string|number,
        block?: DimensionLocation,
        slot?: number,
        id?: string,
        itemId?: string,
        count?: number,
        amount?: number
    },
    type?: string,
    dynamicproperties?: [string, string|number|boolean|Vector3|undefined][]|Record<string, string|number|boolean|Vector3|undefined>,
    cleardynamicproperties?: any,
    removedynamicproperties?: string[],
    removedynamicproperty?: string
}
examples: 
stack of 255 sharpness 1 wooden swords: {"minecraft:components": {"enchantable": {"add": {"level": 1, "type": "sharpness"}}}, "id": "wooden_sword", "count": 255}
sharpness 5 fortune 3 efficiency 5 iron axe that cannot be dropped and are kept on death with the name "§4Storage Hog Axe§r" and the lore "§eTakes\\nUp\\nYour\\nInventory§r" (with the \\n as line break characters) that says lol in the chat and damages the user when used: {"minecraft:components": {"enchantable": {"add": [{"level": 1, "type": "sharpness"}, {"type": "fortune", "level": 3}, {"type": "efficiency", "level": 5}]}}, "id": "iron_axe", "count": 72, "keepondeath": true, "lockMode": "inventory", "name": "§r§4Storage Hog Axe§r§f", "lore": ["§r§eTakes\\nUp§r§f","§r§eYour\\nInventory§r§f"], "dynamicProperties": {"code": "world.sendMessage('lol'); event.source.runCommandAsync(\\"/damage @s 1 thorns entity @s\\")"}}
stack of 16 unbreaking 3 mending 1 shields that are locked to a specific slot and are kept on death: {"minecraft:components": {"enchantable": {"addList": [{"level": 1, "type": "mending"}, {"type": "unbreaking", "level": 3}]}}, "id": "shield", "count": 16, "keepondeath": true, "lockMode": "slot"}`,
    "gmc": `${command.dp}gmc`,
    "gmd": `${command.dp}gmd`,
    "gmp": `${command.dp}gmp`,
    "gmr": `${command.dp}gmr`,
    "gms": `${command.dp}gms`,
    "gohome": `${command.dp}gohome <homeName: text>`,
    "ground": `${command.dp}ground [-lp]`,
    "h": `${command.dp}h <presetId: float> [containerRow: float[?=0]]`,
    "h#": `${command.dp}h<presetId: float> [containerRow: float[?=0]]`,
    "hcontents": `${command.dp}hcontents [presetId: int]`,
    "heal": `${command.dp}heal [targets: target[allowMultiple=true]]`,
    "health": `${command.dp}health <health: int> [targets: target[allowMultiple=true]]`,
    "help": `${command.dp}help
${command.dp}help scriptevent
${command.dp}help cmd <command: CommandName>
${command.dp}help command <command: CommandName>
${command.dp}help cmdextra <command: CommandName>
${command.dp}help commandextra <command: CommandName>
${command.dp}help cmddebug <command: CommandName>
${command.dp}help commanddebug <command: CommandName>
${command.dp}help cmddebugplus <command: CommandName>
${command.dp}help commanddebugplus <command: CommandName>
${command.dp}help customcmddebug <command: CommandName>
${command.dp}help customcommanddebug <command: CommandName>
${command.dp}help chatcommands
${command.dp}help chatcommandsb
${command.dp}help javascriptfunctions
${command.dp}help js <JavaScriptFunctionVariableConstantOrClassName: string>
${command.dp}help jsfunction <JavaScriptFunctionVariableConstantOrClassName: string>
${command.dp}help itemjsonformat
${command.dp}help itemjsonformatcmpr
${command.dp}help itemjsonformatsimplified`,
    "hlist": `${command.dp}hlist`,
    "home": `${command.dp}home <mode: set|remove|go|warp|teleport> <homeName: text>
${command.dp}home clear
${command.dp}home removeall
${command.dp}home list`,
    "hset": `${command.dp}hset <presetID: float> [dimensionId: string[?=~]] [location: x y z[?=~~~]]`,
    "idtfill": `${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block> <blockStates: block states> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block|random> <blockStates: block states> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block|random> <blockStates: block states> [ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r] [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block|random> <blockStates: block states> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block|random> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block|random> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block|random> [ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r] [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block|random> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> <tileName: Block> [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> clear [clearContainers: boolean]
${command.dp}idtfill <from: x y z> <to: x y z> <integrity: float> drain
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <integrity: float> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <radius: x y z> <offset: x y z> <integrity: float> <length: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <radius: x y z> <offset: x y z> <integrity: float> <length: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <radius: x y z> <offset: x y z> <integrity: float> <length: float> <tileName: Block> <blockStates: block states> hollowovoid [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <radius: x y z> <offset: x y z> <integrity: float> <length: float> <tileName: Block> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <radius: x y z> <offset: x y z> <integrity: float> <length: float> <tileName: Block> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}idtfill <center: x y z> <radius: x y z> <offset: x y z> <integrity: float> <length: float> <tileName: Block> hollowovoid [clearContainers: boolean]`,
    "ifill": `${command.dp}ifill <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} [ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r] [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> {blockStates: block states} <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> {blockStates: block states} <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> {blockStates: block states} <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> clear [clearContainers: boolean]
${command.dp}ifill <from: x y z> <to: x y z> drain
${command.dp}ifill <center: x y z> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> {blockStates: block states} circle {replaceTileName: Block} {replaceBlockStates: block states} [clearContainers: boolean]
${command.dp}ifill <center: x y z> <radius: float> <tileName: Block> {blockStates: block states} <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> {replaceTileName: Block} {replaceBlockStates: block states} [clearContainers: boolean]
${command.dp}ifill <center: x y z> <radius: float> <thickness: float> <tileName: Block> {blockStates: block states} <mode: hollowsphere|dome> {replaceTileName: Block} {replaceBlockStates: block states} [clearContainers: boolean]
${command.dp}ifill <center: x y z> <radius: float> <length: float> <tileName: Block> {blockStates: block states} <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> {replaceTileName: Block} {replaceBlockStates: block states} [clearContainers: boolean]
${command.dp}ifill <center: x y z> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> {blockStates: block states} <mode: tunnel|cylinder> {replaceTileName: Block} {replaceBlockStates: block states} [clearContainers: boolean]
${command.dp}ifill <center: x y z> <radius: x y z> <offset: x y z> <length: float> <tileName: Block> {blockStates: block states} hollowovoid {replaceTileName: Block} {replaceBlockStates: block states} [clearContainers: boolean]`,
    "ifillb": `${command.dp}ifillb <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} [replaceTileName: Block] [replaceBlockStates: block states]`,
    "ifillc": `${command.dp}ifillc <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} [replaceTileName: Block] [replaceBlockStates: block states]`,
    "ifilld": `${command.dp}ifillc <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} [replaceTileName: Block] [replaceBlockStates: block states]`,
    "igfill": `${command.dp}igfill <from: x y z> <to: x y z> <tileName: Block> {blockStates: block states} [replaceTileName: Block] [replaceBlockStates: block states]`,
    "ignite": `${command.dp}ignite [radius: float[?=10]]`,
    "invfillillegal": `${command.dp}fillillegal [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "invfill": `${command.dp}fillinventory <itemJSON: itemJSON> [stackCount: int|fill|replaceall|replacefill] [target: string|~]`,
    "invfilljunk": `${command.dp}filljunk [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "invfillop": `${command.dp}fillop [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "invfillrandom": `${command.dp}fillrandom [stackCount: int|fill|replaceall|replacefill] [stackSize: int|max|~] [target: string|~]`,
    "invsee": `${command.dp}invsee <playerTarget: target[allowMultiple=false]>`,
    "invseep": `${command.dp}invseep <playerTarget: target[allowMultiple=false]>`,
    "invseeuuidmode": `${command.dp}invseeuuidmode <entityUUID: int>`,
    "invshuffle": `${command.dp}invshuffle <playerTarget: target|~>`,
    "invswap": `${command.dp}invswap [player: target|~] [otherPlayer: target|~]`,
    "invswapb": `${command.dp}invswapb [player: playerName|~] [otherPlayer: playerName|~]`,
    "iogfill": `${command.dp}iogfill <from: x y z> <to: x y z> <tileName: Block> [blockStates: block states] [replaceTileName: Block] [replaceBlockStates: block states]\n${command.dp}iogfill <from: x y z> <to: x y z> <tileName: Block> <replaceTileName: Block> [replaceBlockStates: block states]`,
    "item": `${command.dp}item
${command.dp}item <mode: {lore}|{lorene}> <lore: JSONArray>
${command.dp}item <mode: {canplaceon}|{candestroy}> <blockTypes: JSONString[]>
${command.dp}item keepondeath <keepOnDeath: bool>
${command.dp}item lockmode <lockMode: {none}|{inventory}|{slot}>
${command.dp}item name <name: text>
${command.dp}item count <count: int(1-255)>
${command.dp}item remove
${command.dp}item gettags
${command.dp}item debug
${command.dp}item <mode: {json}|{jsonb}> <itemJSON: ItemJSON>
${command.dp}item property removelist <propertyIdList: string[]>
${command.dp}item property setlist <propertyList: JSON>
${command.dp}item property <mode: {remove}|{get}> <propertyId: string>
${command.dp}item property setnumber <propertyId: string> <propertyValue: number>
${command.dp}item property setstring <propertyId: string> <propertyValue: string>
${command.dp}item property setboolean <propertyId: string> <propertyValue: boolean>
${command.dp}item property setvector3 <propertyId: string> <propertyValue: Vector3>
${command.dp}item property <mode: {list}|{listdetails}|{clear}>
${command.dp}item enchantment add <enchantment: {"level": number, "type": string}>
${command.dp}item enchantment addlist <enchantment: {"level": number, "type": string}[]>
${command.dp}item enchantment <mode: {remove}|{get}|{testfor}> <enchantmentId: string>
${command.dp}item enchantment <mode: {list}|{clear}>
${command.dp}item slot <slot: int> <mode: {lore}|{lorene}> <lore: JSONArray>
${command.dp}item slot <slot: int> <mode: {canplaceon}|{candestroy}> <blockTypes: JSONString[]>
${command.dp}item slot <slot: int> keepondeath <keepOnDeath: bool>
${command.dp}item slot <slot: int> lockmode <lockMode: {none}|{inventory}|{slot}>
${command.dp}item slot <slot: int> name <name: text>
${command.dp}item slot <slot: int> count <count: int(1-255)>
${command.dp}item slot <slot: int> remove
${command.dp}item slot <slot: int> gettags
${command.dp}item slot <slot: int> debug
${command.dp}item slot <slot: int> <mode: {json}|{jsonb}> <itemJSON: ItemJSON>
${command.dp}item slot <slot: int> property removelist <propertyIdList: JSONString[]>
${command.dp}item slot <slot: int> property setlist <propertyList: JSON>
${command.dp}item slot <slot: int> property <mode: {remove}|{get}> <propertyId: string>
${command.dp}item slot <slot: int> property setnumber <propertyId: string> <propertyValue: number>
${command.dp}item slot <slot: int> property setstring <propertyId: string> <propertyValue: string>
${command.dp}item slot <slot: int> property setboolean <propertyId: string> <propertyValue: boolean>
${command.dp}item slot <slot: int> property setvector3 <propertyId: string> <propertyValue: Vector3>
${command.dp}item slot <slot: int> property <mode: {list}|{listdetails}|{clear}>
${command.dp}item slot <slot: int> enchantment add <enchantment: {"level": number, "type": string}>
${command.dp}item slot <slot: int> enchantment addlist <enchantment: {"level": number, "type": string}[]>
${command.dp}item slot <slot: int> enchantment <mode: {remove}|{get}|{testfor}> <enchantmentId: string>
${command.dp}item slot <slot: int> enchantment <mode: {list}|{clear}>`,
    "itfill": `${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block states> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block states> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block states> [ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r] [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block states> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> [ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r] [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> <tileName: Block> [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> clear [clearContainers: boolean]
${command.dp}itfill <from: x y z> <to: x y z> drain
${command.dp}itfill <center: x y z> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: x y z> <offset: x y z> <length: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: x y z> <offset: x y z> <length: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: x y z> <offset: x y z> <length: float> <tileName: Block> <blockStates: block states> hollowovoid [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: x y z> <offset: x y z> <length: float> <tileName: Block> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: x y z> <offset: x y z> <length: float> <tileName: Block> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}itfill <center: x y z> <radius: x y z> <offset: x y z> <length: float> <tileName: Block> hollowovoid [clearContainers: boolean]`,
    "itfillc": `${command.dp}itfillc <from: x y z> <to: x y z> <tileName: Block> [blockStates: block states] [replaceTileName: Block] [replaceBlockStates: block states]\n${command.dp}itfillc <from: x y z> <to: x y z> <tileName: Block> <replaceTileName: Block> [replaceBlockStates: block states]`,
    "j": `${command.dp}j`,
    "jumpto": `${command.dp}jumpto`,
    "kick": `${command.dp}kick <players: target> [reason: string]`,
    "liststructures": `${command.dp}liststructures`,
    "listbans": `${command.dp}listbans`,
    "listidbans": `${command.dp}listidbans`,
    "listnamebans": `${command.dp}listnamebans`,
    "mainmenu": `${command.dp}mainmenu`,
    "managecommands": `${command.dp}managecommands`,
    "manageplayers": `${command.dp}manageplayers`,
    "managescriptautoeval": `${command.dp}managescriptautoeval`,
    "maxhealth": `${command.dp}maxhealth [targets: target]`,
    "menu": `${command.dp}menu`,
    "messageui": `${command.dp}messageui`,
    "minhealth": `${command.dp}minhealth [targets: target]`,
    "mngcmds": `${command.dp}mngcmds`,
    "mngplyrs": `${command.dp}mngplyrs`,
    "mm": `${command.dp}mm`,
    "msgui": `${command.dp}msgui`,
    "notificationsettings": `${command.dp}notificationsettings`,
    "notificationssettings": `${command.dp}notificationssettings`,
    "offlineinfo": `${command.dp}offlineinfo <playerName: string>`,
    "offlineuuidinfo": `${command.dp}offlineuuidinfo <playerUUID: int>`,
    "offlineinvsee": `${command.dp}offlineinvsee <playerName: string>`,
    "offlineuuidinvsee": `${command.dp}offlineuuidinvsee <playerUUID: int>`,
    "phase": `${command.dp}phase`,
    "printlayers": `${command.dp}printlayers`,
    "playershopsystemsettings": `${command.dp}playershopsystemsettings`,
    "rank": `${command.dp}rank <players: target> <mode: add|remove> <tag: string>\n${command.dp}rank <players: target> clear`,
    "remexp": `${command.dp}remexp [radius: number]`,
    "remexpne": `${command.dp}remexpne [radius: number]`,
    "remexpentity": `${command.dp}remexpentity [radius: number]`,
    "replacenear": `${command.dp}repalcenear <radius: number> <replaceTileName: Block> <replaceBlockStates: block states> <tileName: Block> <blockStates: block states>`,
    "run": `${command.dp}run <delayTicks: int[min=0]> <command: command>`,
    "scanenderchest": `${command.dp}scanenderchest [targets: target|~]`,
    "scanenderchestc": `${command.dp}scanenderchestc [target: string|~]`,
    "scnendchst": `${command.dp}scnendchst [targets: target|~]`,
    "scnendchstc": `${command.dp}scnendchstc [target: string|~]`,
    "sendui": `${command.dp}sendui`,
    "servershopsystemsettings": `${command.dp}servershopsystemsettings`,
    "setitem": `${command.dp}setitem <item: itemType> <amount: int> <slot: int>`,
    "setitemb": `${command.dp}setitemb <itemJSON: itemJSON> <slot: int>
simplified itemJSON format (type "${String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\")}help itemJSONFormat" to see full format options): 
{
    "name"?: string,
    "lore"?: string[],
    "count"?: number,
    "keepondeath"?: boolean,
    "lockmode"?: ItemLockMode,
    "canplaceon"?: string[],
    "components"?: {
        "enchantable"?: {
            "add"?: Enchantment|Enchantment[],
            "addList"?: Enchantment[],
            "remove"?: Enchantment,
            "removeEnchantments"?: Enchantment,
            "clear"?: any
        },
        "durability"?: {
            "durability"?: number,
            "damage"?: number,
            "repair"?: number,
            "setDurabilityToMax"?: any
        },
        "damage"?: {
            "durability"?: number,
            "damage"?: number,
            "repair"?: number,
            "setDurabilityToMax"?: any
        }
    },
    force?: boolean
    source?: {
        type?: string,
        targetSelector?: string,
        targetSelectorExecutionLocation?: DimensionLocation,
        targetSelectorSourceEntity?: Entity,
        player?: string,
        entityAtBlock?: DimensionLocation,
        entityType?: string,
        entityTypeId?: string,
        entityId?: string|number,
        block?: DimensionLocation,
        slot?: number,
        id?: string,
        itemId?: string,
        count?: number,
        amount?: number
    },
    type?: string,
    dynamicproperties?: [string, string|number|boolean|Vector3|undefined][]|Record<string, string|number|boolean|Vector3|undefined>,
    cleardynamicproperties?: any,
    removedynamicproperties?: string[],
    removedynamicproperty?: string
}
examples: 
stack of 255 sharpness 1 wooden swords: {"minecraft:components": {"enchantable": {"add": {"level": 1, "type": "sharpness"}}}, "id": "wooden_sword", "count": 255}
sharpness 5 fortune 3 efficiency 5 iron axe that cannot be dropped and are kept on death with the name "§4Storage Hog Axe§r" and the lore "§eTakes\\nUp\\nYour\\nInventory§r" (with the \\n as line break characters) that says lol in the chat and damages the user when used: {"minecraft:components": {"enchantable": {"add": [{"level": 1, "type": "sharpness"}, {"type": "fortune", "level": 3}, {"type": "efficiency", "level": 5}]}}, "id": "iron_axe", "count": 72, "keepondeath": true, "lockMode": "inventory", "name": "§r§4Storage Hog Axe§r§f", "lore": ["§r§eTakes\\nUp§r§f","§r§eYour\\nInventory§r§f"], "dynamicProperties": {"code": "world.sendMessage('lol'); event.source.runCommandAsync(\\"/damage @s 1 thorns entity @s\\")"}}
stack of 16 unbreaking 3 mending 1 shields that are locked to a specific slot and are kept on death: {"minecraft:components": {"enchantable": {"addList": [{"level": 1, "type": "mending"}, {"type": "unbreaking", "level": 3}]}}, "id": "shield", "count": 16, "keepondeath": true, "lockMode": "slot"}`,
    "setnametag": `${command.dp}setnametag [targets: target[?=@s,allowMultiple=true]] [nameTag: string[?=""]]`,
    "setplayernametag": `${command.dp}setplayernametag [targets: target[?=@s,allowMultiple=true]] [nameTag: string[?=""]]`,
    "setentitynametag": `${command.dp}setentitynametag [targets: target[?=@s,allowMultiple=true]] [nameTag: string[?=""]]`,
    "settings": `${command.dp}settings`,
    "shopsystemsettings": `${command.dp}shopsystemsettings`,
    "spawn": `${command.dp}spawn`,
    "shuffleinventory": `${command.dp}shuffleinventory <playerTarget: target|~>`,
    "stopalldbintervals": `${command.dp}stopalldbintervals`,
    "stopallsaintervals": `${command.dp}stopallsaintervals`,
    "structure": `${command.dp}structure createempty <structureName: string> <sizeX: float> <sizeY: float> <sizeZ: float> [saveMode: memory|disk]
${command.dp}structure save <structureName: string> <from: x y z> <to: x y z> [saveMode: ({world}|{memory})[?=memory]] [includeEntities: Boolean[?=true]] [includeBlocks: Boolean[?=true]]
${command.dp}structure load <structureName: string> [to: x y z[?=~~~]] [rotation: (0|90|190|270)[?=0]] [mirror: ({none}|{x}|{z}|{xz})[?=none]] [includeEntities: Boolean[?=true]] [includeBlocks: Boolean[?=true]] [waterlogged: Boolean[?=false]] [integrity: float[?=1,min=0,max=1]] [integritySeed: string] [animationMode: ({none}|{blocks}|{layers})[?=none]] [animationSeconds: float[?=0]]
${command.dp}structure delete <structureName: string>
${command.dp}structure getinfo <structureName: string>
${command.dp}structure copy <copyFromStructureName: string> <copyToStructureName: string>
${command.dp}structure copytodisk <structureName: string> <copyToStructureName: string>
${command.dp}structure copytomemory <structureName: string> <copyToStructureName: string>
${command.dp}structure savetodisk <structureName: string>
${command.dp}structure movetomemory <structureName: string>
${command.dp}structure removeair <structureName: string>
${command.dp}structure removeall
${command.dp}structure list`,
    "summon": `${command.dp}summon <spawnCount: int> <entity: EntityType<[spawnEvent]>> [spawnPos: x y z] [yRot: value] [xRot: value] [persistent: bool] [nameTag: string]
ex. ${command.dp}summon 5 sheep<spawn_baby> ~~~~~ true "Baby Sheep That Won't Despawn"`,
    "swapinventories": `${command.dp}swapinventories [player: target|~] [otherPlayer: target|~]`,
    "swapinventoriesb": `${command.dp}swapinventoriesb [player: playerName|~] [otherPlayer: playerName|~]`,
    "swapitems": `${command.dp}swapitems [slot: int|head|chest|legs|feet|mainhand|offhand|~] [otherSlot: int|head|chest|legs|feet|mainhand|offhand|~] [player: target|~] [otherPlayer: target|~]`,
    "swaprows": `${command.dp}swaprows <row1: float|{equipment}> [row2: (float|{equipment})[?=0]] [player1: target[?=@s]] [player2: target[?=@s]]`,
    "takeitem": `${command.dp}takeitem <fromSlot: int|head|chest|legs|feet|mainhand|offhand|~> <fromPlayer: target|~>`,
    "terminal": `${command.dp}terminal`,
    "transferitem": `${command.dp}transferitem <transferItemToPlayer: target>`,
    "thru": `${command.dp}thru`,
    "pthru": `${command.dp}pthru`,
    "vthru": `${command.dp}vthru`,
    "timezone": `${command.dp}timezone [UTCOffsetInHours: float]`,
    "top": `${command.dp}top`,
    "tpa": `${command.dp}tpa <player: target|playerName|string>`,
    "tpaccept": `${command.dp}tpaccept [player: target|playerName|string]`,
    "tpdeny": `${command.dp}tpdeny [player: target|playerName|string]`,
    "tz": `${command.dp}tz [UTCOffsetInHours: float]`,
    "up": `${command.dp}up [placeGlass: bool[?=true]]`,
    "ver": `${command.dp}ver`,
    "version": `${command.dp}version`,
    "viewservershops": `${command.dp}viewservershops`,
    "viewplayershops": `${command.dp}viewplayershops`,
    "warp": `${command.dp}warp <name: escapableString>`,
    "warplist": `${command.dp}warplist`,
    "warplistdetails": `${command.dp}warplistdetails`,
    "warplistrawdata": `${command.dp}warplistrawdata`,
    "warpremove": `${command.dp}warpremove <name: escapableString>`,
    "warpreset": `${command.dp}warpreset`,
    "warpset": `${command.dp}warpset <dimension: dimension> <x: float> <y: float> <z: float> <name: escapableString>`,
    "w": `${command.dp}w <name: escapableString>`,
    "wlist": `${command.dp}wlist`,
    "wlistdetails": `${command.dp}wlistdetails`,
    "wlistrawdata": `${command.dp}wlistrawdata`,
    "worldbordersettings": `${command.dp}worldbordersettings`,
    "wremove": `${command.dp}wremove <name: escapableString>`,
    "wreset": `${command.dp}wreset`,
    "wset": `${command.dp}wset <dimension: dimension> <x: float> <y: float> <z: float> <name: escapableString>`,
    "transformresultatdvindex": `${command.dp}transformresultatdvindex [data: int]`,
    "gettransformst": `${command.dp}gettransformst [itemName: string] [data: int]`,
    "findtransformdvindex": `${command.dp}findtransformdvindex [itemName: string] [data: int]`,
    "roie": `${command.dp}remotheritemenchants <enchantmentTypesToKeep: StringArray>`,
    "remotheritemenchants": `${command.dp}remotheritemenchants <enchantmentTypesToKeep: StringArray>`,
    "removeotheritemenchantments": `${command.dp}remotheritemenchants <enchantmentTypesToKeep: StringArray>`,
    "brush": `${command.dp}brush [-l] none
${command.dp}brush [-l] <brushType: sphere|cube|square>` /*+` [-h]`*/ + ` <blockPattern: BlockPattern> [radius: float] [mask: Mask]
${command.dp}brush [-l] <brushType: splatter|splattercube|splattersquare|splattersurface|splattercubesurface|splattersquaresurface> [-h] <blockPattern: BlockPattern> [radius: float] [decay: float] [mask: Mask]` /*+`
        ${command.dp}brush [-l] <brushType: raise|lower> <shape: sphere|cube§c|squarex|squarey|squarez§r> [radius: float]`*/
        + `
${command.dp}brush [-l] <brushType: extinguish|ex|remexp> [radius: float]`,
    "butcher": `${command.dp}butcher [-abfgnprtwipceh] [radius: float]`,
    "butcherdespawn": `${command.dp}butcherdespawn [-abfgnprtwipceh] [radius: float]`,
    "chunkinfo": `${command.dp}chunkinfo`,
    "selectioninfo": `${command.dp}selectioninfo`,
    "selinfo": `${command.dp}selinfo`,
    "seli": `${command.dp}seli`,
    "selectionrender": `${command.dp}selectionrender`,
    "selrender": `${command.dp}selrender`,
    "selr": `${command.dp}selr`,
    "snapshot": `${command.dp}snapshot backup <areaId: string>
${command.dp}snapshot rollback <areaId: string> [backupIndex: number]
${command.dp}snapshot deletebackup <areaId: string> [backupIndex: number]
${command.dp}snapshot clearbackups <areaId: string>
${command.dp}snapshot deletearea <areaId: string>
${command.dp}snapshot clearareas
${command.dp}snapshot listbackups <areaId: string>
${command.dp}snapshot listareas
${command.dp}snapshot list`,
    "\\\\savestructure": `${command.dp}\\savestructure <structureName: string> [saveMode: ({world}|{memory})[?=memory]] [includeEntities: Boolean[?=true]] [includeBlocks: Boolean[?=true]]`,
    "\\\\deletesavedpos": `${command.dp}\\deletesavedpos <selectionID: string>`,
    "\\\\listpos": `${command.dp}\\listpos`,
    "\\\\loadpos": `${command.dp}\\loadpos <selectionID: string>`,
    "\\\\savepos": `${command.dp}\\savepos <selectionID: string>`,
    "\\\\cut": `${command.dp}\\cut [-meb]`,
    "\\\\copy": `${command.dp}\\copy [-meb]`,
    "\\\\paste": `${command.dp}\\paste [-webxzh] [integrity: float] [integritySeed: string] [rotation: 0|90|180|270] [animationMode: none|blocks|layers] [animationSeconds: float]`,
    "\\\\undo": `${command.dp}\\undo [-kt]`,
    "\\\\protectarea": `${command.dp}\\protectarea <areaType: string> <name: string> [mode: 0|1(default=0)] [icon_path: string]`,
    "\\\\backuparea": `${command.dp}\\backuparea <id: string>`,
    "\\\\pos1": `${command.dp}\\pos1 [location: x y z]`,
    "\\\\pos2": `${command.dp}\\pos2 [location: x y z]`,
    "\\\\hpos1": `${command.dp}\\hpos1`,
    "\\\\hpos2": `${command.dp}\\hpos2`,
    "\\\\chunk": `${command.dp}\\chunk`,
    "\\\\shift": `${command.dp}\\shift <direction: {north}|{south}|{east}|{west}|{up}|{down}> <distance: float>`,
    "\\\\offset": `${command.dp}\\offset [x: float] [y: float] [z: float]`,
    "\\\\cyl": `${command.dp}\\cyl [-c] <axis: {x}|{y}|{z}> <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\tube": `${command.dp}\\tube [-c] <axis: {x}|{y}|{z}> <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\sphere": `${command.dp}\\sphere [-c] <radius: float> <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\hsphere": `${command.dp}\\hsphere [-c] <radius: float> <thickness: float> <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\stsphere": `${command.dp}\\stsphere [-c] <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\cone": `${command.dp}\\cone [-c] <radius: float> <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\hcone": `${command.dp}\\hcone [-c] <radius: float> <thickness: float> <blockPattern: BlockPattern> [mask: SingleBlockMask]`,
    "\\\\remove": `${command.dp}\\remove [-c]`,
    "\\\\walls": `${command.dp}\\walls [-c] <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\set": `${command.dp}\\set [-c] <blockPattern: BlockPattern>`,
    "\\\\seti": `${command.dp}\\seti [-c] <integrity: number> <blockPattern: BlockPattern>`,
    "\\\\flood": `${command.dp}\\flood [mask: Mask]`,
    "\\\\drain": `${command.dp}\\drain [mask: Mask]`,
    "\\\\generate": `${command.dp}\\generate [-sr] <blockPattern: BlockPattern> <expression: 3DGeometricMathEquation>`,
    "\\\\generatef": `${command.dp}\\generatef [-sr] <blockPattern: BlockPattern> <expression: 3DGeometricMathEquation>`,
    "\\\\generatejs": `${command.dp}\\generatejs <blockPattern: BlockPattern> <function: (worldX, worldY, worldZ, relativeX, relativeY, relativeZ, pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z, negativeCornerX, negativeCornerY, negativeCornerZ, positiveCornerX, positiveCornerY, positiveCornerZ)=>boolean>`,
    "\\\\generatecallback": `${command.dp}\\generatecallback <blockPattern: BlockPattern> <callback: (dimensionLocation, worldX, worldY, worldZ, relativeX, relativeY, relativeZ, pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z, negativeCornerX, negativeCornerY, negativeCornerZ, positiveCornerX, positiveCornerY, positiveCornerZ)=>any>`,
    "\\\\generates": `${command.dp}\\generates <step: float> <blockPattern: BlockPattern> <expression: 3DGeometricMathEquation>`,
    "\\\\generate2d": `${command.dp}\\generate2d [-sr] <axis: x|y|z> <blockPattern: BlockPattern> <expression: 2DGeometricMathEquation>`,
    "\\\\generatef2d": `${command.dp}\\generatef2d [-sr] <axis: x|y|z> <blockPattern: BlockPattern> <expression: 2DGeometricMathEquation>`,
    "\\\\generatejs2d": `${command.dp}\\generatejs2d <axis: x|y|z> <blockPattern: BlockPattern> <function: (worldX, worldY, worldZ, relativeX, relativeY, relativeZ, rotationRelativeX, rotationRelativeY, pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z, negativeCornerX, negativeCornerY, negativeCornerZ, positiveCornerX, positiveCornerY, positiveCornerZ)=>boolean>`,
    "\\\\generatecallback2d": `${command.dp}\\generatecallback2d <axis: x|y|z> <blockPattern: BlockPattern> <callback: (dimensionLocation, worldX, worldY, worldZ, relativeX, relativeY, relativeZ, rotationRelativeX, rotationRelativeY, pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z, negativeCornerX, negativeCornerY, negativeCornerZ, positiveCornerX, positiveCornerY, positiveCornerZ)=>any>`,
    "\\\\generates2d": `${command.dp}\\generates2d <step: float> <axis: x|y|z> <blockPattern: BlockPattern> <expression: 2DGeometricMathEquation>`,
    "\\\\stack": `${command.dp}\\stack [stackCount: int]`,
    "\\\\selectmode": `${command.dp}\\selectmode [default|noliquid|nopassable|noliquidnopassable]`,
    "\\\\ceil": `${command.dp}\\ceil <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\floor": `${command.dp}\\floor <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\hcube": `${command.dp}\\hcube <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\hreplace": `${command.dp}\\hreplace <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\replace": `${command.dp}\\replace <blockPattern: BlockPattern> [mask: Mask]`,
    "\\\\maze": `${command.dp}\\maze [wallBlockType: Block[?=minecraft:stone]] [airBlockType: Block[?=minecraft:air]] [entranceDirection: ({North}|{South}|{East}|{West})[?=North]] [exitDirection: ({North}|{South}|{East}|{West})[?=South]] [complexity: int[?=0]]`,
    "\\\\regenerateblocks": `${command.dp}regenerateblocks [radiusAroundAreaToUseToDetermineGeneratedBlockType: float[?=5]]`,
    "\\\\idtfill": `${command.dp}\\idtfill <integrity: float> <tileName: Block> {blockStates: block states} <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> {replaceTileName: Block} {replaceBlockStates: block states} [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block|random> {blockStates: block states} [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> clear [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> drain
${command.dp}\\idtfill <integrity: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <thickness: float> <tileName: Block> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\idtfill <integrity: float> <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}\\idtfill <offset: x y z> <integrity: float> <thickness: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <offset: x y z> <integrity: float> <thickness: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\idtfill <offset: x y z> <integrity: float> <thickness: float> <tileName: Block> <blockStates: block states> hollowovoid [clearContainers: boolean]
${command.dp}\\idtfill <offset: x y z> <integrity: float> <thickness: float> <tileName: Block> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\idtfill <offset: x y z> <integrity: float> <thickness: float> <tileName: Block> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\idtfill <offset: x y z> <integrity: float> <thickness: float> <tileName: Block> hollowovoid [clearContainers: boolean]`,
    "\\\\itfill": `${command.dp}\\itfill <tileName: Block> <blockStates: block states> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <blockStates: block states> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <blockStates: block states> [ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r] [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <blockStates: block states> [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> [ifillMode: replace|fill|cube|keep|walls|hollow|outline|pillars§c|floor|ceilling|diamond|hourglass§r] [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}\\itfill <skygridSize: float> <tileName: Block> <blockStates: block states> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}\\itfill <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> <reaplceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <skygridSize: float> <tileName: Block> <mode: {skygrid}|{inverseskygrid}> [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> [clearContainers: boolean]
${command.dp}\\itfill clear [clearContainers: boolean]
${command.dp}\\itfill drain
${command.dp}\\itfill <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\itfill <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> circle [clearContainers: boolean]
${command.dp}\\itfill <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\itfill <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> circle [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <blockStates: block states> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <tileName: Block> <mode: {circlex}|{circley}|{circlez}|{circlexy}|{circleyz}|{circlexyz}|{sphere}|{semisphere}> [clearContainers: boolean]
${command.dp}\\itfill <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <thickness: float> <tileName: Block> <blockStates: block states> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}\\itfill <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <thickness: float> <tileName: Block> <mode: hollowsphere|dome> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <thickness: float> <tileName: Block> <mode: hollowsphere|dome> [clearContainers: boolean]
${command.dp}\\itfill <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <length: float> <tileName: Block> <blockStates: block states> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}\\itfill <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> <replaceTileName: Block> [clearContainers: boolean]
${command.dp}\\itfill <length: float> <tileName: Block> <mode: cylinderx|cylindery|cylinderz|cylinderxy|cylinderyz|cylinderxz|cylinderxyz> [clearContainers: boolean]
${command.dp}\\itfill <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\itfill <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <blockStates: block states> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}\\itfill <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\itfill <length: float> <axis: {x}|{y}|{z}|{xy}|{yz}|{xz}|{xyz}> <tileName: Block> <mode: tunnel|cylinder> [clearContainers: boolean]
${command.dp}\\itfill <offset: x y z> <thickness: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <offset: x y z> <thickness: float> <tileName: Block> <blockStates: block states> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\itfill <offset: x y z> <thickness: float> <tileName: Block> <blockStates: block states> hollowovoid [clearContainers: boolean]
${command.dp}\\itfill <offset: x y z> <thickness: float> <tileName: Block> hollowovoid [replaceTileName: Block] [replaceBlockStates: block states] [clearContainers: boolean]
${command.dp}\\itfill <offset: x y z> <thickness: float> <tileName: Block> hollowovoid [replaceTileName: Block] [clearContainers: boolean]
${command.dp}\\itfill <offset: x y z> <thickness: float> <tileName: Block> hollowovoid [clearContainers: boolean]`,
    "disconnect": `${command.dp}disconnect <players: target[allowMultiple=true]>`,
    "morph": `${command.dp}morph <morphId: int>`,
    "scale": `${command.dp}scale <scale: float>`,
    "tint": `${command.dp}tint [red: (float|~)[?=~]] [green: (float|~)[?=~]] [blue: (float|~)[?=~]] [alpha: (float|~)[?=~]] [materialType: (0|1)[?=~]] [playerTarget: target[?=@s,allowMultiple=false]]`,
    "tps": `${command.dp}tps`,
    "visualscale": `${command.dp}visualscale <visualscale: float>`,
    "visualscaleenabled": `${command.dp}visualscaleenabled <visualscaleenabled: bool>`
};
//# sourceMappingURL=commandsyntaxes.js.map