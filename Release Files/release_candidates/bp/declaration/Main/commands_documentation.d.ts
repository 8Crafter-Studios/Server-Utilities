import { Player, Entity } from "@minecraft/server";
import { executeCommandPlayerW } from "./commands";
export declare enum commanddescriptions {
    "align" = "Centers you on the x and z axis on the block you are currently at. ",
    "aligncenter" = "Centers you on the x, y, and z axis on the block you are currently at. ",
    "binvsee" = "Displays the contents of the specified block's inventory. ",
    "chatcommandui" = "Opens up a menu where you can type a chat command to run with no character limits. ",
    "chatsendui" = "Opens up a menu where you can type a chat message to send with no character limits. ",
    "chunkinfo" = "Displays info about the current chunk. ",
    "clear" = "Clears a player's inventory. ",
    "clearenderchest" = "Clears a player's ender chest. ",
    "clearenderchestslot" = "Clears a slot of a player's ender chest. ",
    "cloneitem" = "Clones the item in your hand to the specified player's inventory. ",
    "closeuis" = "Closes any open script form uis for one or more players.",
    "closeui" = "Closes any open script form uis for one or more players.",
    "cmdui" = "Opens up a menu where you can type a chat command to run with no character limits. ",
    "compressitems" = "Compresses your inventory into 2 chests and inserts those chests into your inventory. ",
    "compressitemsshulker" = "Compresses your inventory into 2 shulker boxes and inserts those shulker boxes into your inventory. ",
    "compressitemscontainer" = "Compresses your inventory into a specified container type and inserts those containers into your inventory. ",
    "copyitem" = "Copies the item in your hand to the specified slot of the specified player's inventory. ",
    "createexplosion" = "Creates an explosion. ",
    "datapickblock" = "Pick Blocks the block that your are looking at while copying the nbt data of the block as well, just like using the pick block button while holding CTRL on your keyboard. ",
    "debugstickdyingmode" = "Turns debug stick dying mode on or off, which allows you to dye debug sticks in a cauldron.",
    "defaulthealth" = "Sets the health of entities to their default health values. ",
    "drain" = "Drains liquids in the specified radius. ",
    "dupeitem" = "Duplicates teh item in your hand. ",
    "einvsee" = "Displays the contents of the specified entity's inventory. ",
    "einvseeb" = "The original version of the \\einvsee command that does not scan equipment slots.",
    "ecinvsee" = "Scans a player's ender chest and displays the contents of it.",
    "ecinvseec" = "Scans a player's ender chest and displays the contents of it.",
    "enchantmentbarrels" = "Places a structure containing Smithing Table Enchanted Books with every enchantment of the specified level.",
    "enderchest" = "Spawns an ender chest where you are standing.",
    "eval" = "Runs the specified JavaScript / Script API code. This can be very useful for doing things such as running more advanced commands with JavaScript variables and conditions, or running commands with JavaScript escape codes(for example to put multiple lines of text in the name of an entity or use special unicode characters in commands without needing to copy and paste them into your game). (Note: The names of the server modules are mcServer for the minecraft/Server module, mcServerUI for the minecraft/ServerUI module, and GameTest for the minecraft/GameTest module). Here are some examples:\n\nSend a tellraw command message:\n\\eval world.sendMessage(\"Example message\\nNew Line\\nSender's Name: \" + player.name + \"\\nToken Emoji: \\uE105\")\n\nGive all players health boost with the level equal to their XP level:\n\\eval world.getAllPlayers().forEach((p)=>{p.addEffect(\"health_boost\", 200, {amplifier: player.level, showParticles: false}); })",
    "execute" = "Executes a command on behalf of one or more entities. ",
    "extinguish" = "Extinguishes fire and soul fire in the specified radius. ",
    "extrafeaturessettings" = "Opens up the extra features settings menu.",
    "extrasettings" = "Opens up the extra features settings menu.",
    "fill" = "Fills all or parts of a reigon with a specific block, can use any block type including NBT Editor only ones. ",
    "fillillegal" = "Fills a player's inventory with illegal items. ",
    "fillinventory" = "Fills a player's inventory with items based on the provided itemJSON. ",
    "filljunk" = "Fills a player's inventory with junk items. ",
    "fillop" = "Fills a player's inventory with op items. ",
    "fillrandom" = "Fills a player's inventory with random items. ",
    "give" = "Inserts the specified number of the specified item type into the player's inventory. Note: The item parameter can be set to any valid item id, even ones that can't be used with the normal vanilla /give, such as ones that require an NBT editor to obtain, for example you could use minecraft:netherreactor to get a Nether Reactor Core. The count parameter can be any value from 0-255.",
    "giveb" = "Creates a new stack of the specified item type of the specified size in the player's inventory. Note: The item parameter can be set to any valid item id, even ones that can't be used with the normal vanilla /give, such as ones that require an NBT editor to obtain, for example you could use minecraft:netherreactor to get a Nether Reactor Core. The count parameter can be any value from 0-255.",
    "givec" = "Gives you an item stack based on the provided itemJSON in your next empty inventory slot. ",
    "getuuid" = "Gets the UUID of the specified entity. ",
    "gma" = "Sets your gamemode to adventure. ",
    "gmc" = "Sets your gamemode to creative. ",
    "gmd" = "Sets your gamemode to default. ",
    "gmp" = "Sets your gamemode to spectator. ",
    "gmr" = "Sets your gamemode to a random gamemode. ",
    "gms" = "Sets your gamemode to survival. ",
    "gohome" = "Warps to a home. ",
    "ground" = "Teleports you down to the closest block below your feet.",
    "h" = "Swaps your hotbar with the specified hotbar preset, optionally specifying a row of the container block to swap your hotbar with. ",
    "h#" = "Swaps your hotbar with the specified hotbar preset, optionally specifying a row of the container block to swap your hotbar with. ",
    "heal" = "Heals entities. ",
    "health" = "Modifies the health of entities.",
    "help" = "Provides help.",
    "hlist" = "Lists all of your currently saved hotbar presets.",
    "home" = "Sets/Removes/Warps to a home.",
    "hset" = "Sets a hotbar preset.",
    "idtfill" = "Fills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. ",
    "ifill" = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ",
    "ifillb" = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ",
    "ifillc" = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ",
    "ifilld" = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ",
    "igfill" = "Fills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. ",
    "ignite" = "Ignites blocks in the specified radius. ",
    "invfillillegal" = "Fills a player's inventory with illegal items. ",
    "invfill" = "Fills a player's inventory with items based on the provided itemJSON. ",
    "invfilljunk" = "Fills a player's inventory with junk items. ",
    "invfillop" = "Fills a player's inventory with op items. ",
    "invfillrandom" = "Fills a player's inventory with random items. ",
    "invsee" = "Displays the contents of the specified player's inventory. ",
    "invseep" = "Displays the contents of the specified player's inventory, including the dynamic properties set on the items. ",
    "invseeuuidmode" = "Displays the contents of the inventory of the entity with the specified UUID. ",
    "invshuffle" = "Shuffles the inventory of the specified player",
    "invswap" = "Swaps the inventories of 2 players. ",
    "invswapb" = "Swaps the inventories of 2 players. ",
    "iogfill" = "Fills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. ",
    "item" = "Super advanced item modification command. ",
    "itfill" = "Fills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. ",
    "itfillc" = "Fills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. ",
    "kick" = "Kicks one or more players from the server. ",
    "listbans" = "Lists all bans. ",
    "listidbans" = "Lists all id bans. ",
    "listnamebans" = "Lists all name bans. ",
    "liststructures" = "Lists all saved structures. ",
    "mainmenu" = "Opens up the main menu. ",
    "managecommands" = "Opens up the commands editor menu. ",
    "manageplayers" = "Opens up the manage players menu. ",
    "managescriptautoeval" = "Opens up the Script Auto Eval settings menu. ",
    "maxhealth" = "Heals entities. ",
    "menu" = "Opens up the main menu. ",
    "messageui" = "Opens up a menu where you can type a chat message or command to send or run with no character limits. ",
    "minhealth" = "Sets the health of entities to their minimum health values. ",
    "mm" = "Opens up the main menu. ",
    "mngcmds" = "Opens up the commands editor menu. ",
    "mngplyrs" = "Opens up the manage players menu. ",
    "notificationsettings" = "Opens up the notifications settings menu. ",
    "notificationssettings" = "Opens up the notifications settings menu. ",
    "offlineinfo" = "Displays the saved player data of the specified player. ",
    "offlineuuidinfo" = "Displays the saved player data of the player with the specified UUID. ",
    "offlineinvsee" = "Displays the saved contents of the specified player's inventory. ",
    "offlineuuidinvsee" = "Displays the saved contents of the inventory of the player with the specified UUID. ",
    "playershopsyssettings" = "Opens up the player shop system settings menu.",
    "playershopsystemsettings" = "Opens up the player shop system settings menu.",
    "plyrshopsyssettings" = "Opens up the player shop system settings menu.",
    "printlayers" = "Displays a list of all the non-air blocks at your specified x and z coordinates. ",
    "rank" = "Manages ranks stored in players. ",
    "remexp" = "Removes explosive blocks and entities in the specified radius, the radius defaults to 10 if not specified. Removes TNT and respawn anchors if in the overworld, removes TNT and beds if in the nether, and removes TNT, beds, and respawn anchors if in the end.",
    "remexpne" = "Removes explosive blocks in the specified radius, the radius defaults to 10 if not specified. Removes TNT and respawn anchors if in the overworld, removes TNT and beds if in the nether, and removes TNT, beds, and respawn anchors if in the end. Unlike the \remexp command, this one does not remove explosive entities, it only removes explosive blocks.",
    "replacenear" = "Replaces blocks of the specified type with another specified block type in the specified radius. ",
    "run" = "Runs the specified command after the specified number of ticks. ",
    "scanenderchest" = "Scans a player's ender chest and displays the contents of it. ",
    "scanenderchestc" = "Scans a player's ender chest and displays the contents of it. ",
    "scnendchst" = "Scans a player's ender chest and displays the contents of it. ",
    "scnendchstc" = "Scans a player's ender chest and displays the contents of it. ",
    "selectioninfo" = "Displays info about the current selection. ",
    "selinfo" = "Displays info about the current selection. ",
    "seli" = "Displays info about the current selection. ",
    "sendui" = "Opens up a menu where you can type a chat message to send with no character limits. ",
    "servershopsyssettings" = "Opens up the server shop system settings menu.",
    "servershopsystemsettings" = "Opens up the server shop system settings menu.",
    "setitem" = "Creates a new stack of the specified item type of the specified size in the specified slot of the specified player's inventory. Note: The item parameter can be set to any valid item id, even ones that can't be used with the normal vanilla /give, such as ones that require an NBT editor to obtain, for example you could use minecraft:netherreactor to get a Nether Reactor Core. The count parameter can be any value from 0-255.",
    "setitemb" = "Replaces the item stack in the specified inventory slot with an item stack based on the provided itemJSON. ",
    "setnametag" = "Sets the name tag of a player or entity. ",
    "setplayernametag" = "Sets the name tag of a player or entity. ",
    "setentitynametag" = "Sets the name tag of a player or entity. ",
    "settings" = "Opens up the settings menu.",
    "shopsyssettings" = "Opens up the shop system settings menu.",
    "shopsystemsettings" = "Opens up the shop system settings menu.",
    "shuffleinventory" = "Shuffles the inventory of the specified player.",
    "spawn" = "Teleports you to spawn. ",
    "srvrshopsyssettings" = "Opens up the server shop system settings menu.",
    "structure" = "Manages structures. ",
    "summon" = "Summons entities. ",
    "swapinventories" = "Swaps the inventories of 2 players. ",
    "swapinventoriesb" = "Swaps the inventories of 2 players. ",
    "swapitems" = "Swaps an item in a slot of one player's inventory with another slot of another player's inventory. ",
    "takeitem" = "Steals an item from another player's inventory and puts it into yoru inventory. ",
    "terminal" = "Opens up the command runner/terminal menu. ",
    "timezone" = "Sets your timezone to the specific UTC offset in hours. ",
    "thru" = "Teleports to the other side of the wall/floor/ceilling that you are looking at.",
    "pthru" = "Teleports to the other side of the wall/floor/ceilling that you are looking at. Even if it is only a one block tall gap at the other end.",
    "vthru" = "Teleports to the other side of the wall/floor/ceilling that you are looking at, even if it would put you into the void.",
    "top" = "Teleports on top of the highest solid block at your x and z coordinates. ",
    "tpa" = "Requests to teleport to the specified player. ",
    "tpaccept" = "Accepts a player's teleport request. ",
    "tpdeny" = "Denies a player's teleport request. ",
    "transferitem" = "Transfers the item in your hand to the specified player's inventory. ",
    "tz" = "Sets your timezone to the specific UTC offset in hours. ",
    "up" = "Teleports up the specified number of blocks and places glass below you if placeGlass is not set to false. ",
    "version" = "Displays the format version of the add-on. ",
    "viewplayershops" = "Opens up the list of public player shops.",
    "viewservershops" = "Opens up the list of public server shops.",
    "warp" = "Warps to the specified global warp. ",
    "warplist" = "Lists all global warps. ",
    "warplistdetails" = "Lists all global warps with more details. ",
    "warplistrawdata" = "Lists the raw data of the global warps. ",
    "warpremove" = "Removes the specified global warp. ",
    "warpreset" = "Removes all global warps. ",
    "warpset" = "Sets a global warp. ",
    "wbsettings" = "Opens up the world border system settings menu.",
    "w" = "Warps to the specified private warp. ",
    "wlist" = "Lists all private warps. ",
    "wlistdetails" = "Lists all private warps with more details. ",
    "wlistrawdata" = "Lists the raw data of the private warps. ",
    "worldbordersettings" = "Opens up the world border system settings menu.",
    "wremove" = "Removes the specified private warp. ",
    "wreset" = "Removes all private warps. ",
    "wset" = "Sets a private warp. ",
    "chunkban" = "Fills a shulker box with the item in your first hotbar slot and put that shulker box into your first hotbar slot, and repeats this the specified number of times, this can be used to create a chunk ban. ",
    "transformresultatdvindex" = "Displays what item a smithing table enchanted book combined with a enchantment transfer smithing template of the specified data value would turn in to. ",
    "gettransformst" = "Gives you an enchantment transfer smithing template with the data value needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. ",
    "findtransformdvindex" = "Displays the data value of enchantment transfer smithing template needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. ",
    "roie" = "Removes all enchantment types from an item except for the item types specified. ",
    "remotheritemenchants" = "Removes all enchantment types from an item except for the item types specified. ",
    "removeotheritemenchantments" = "Removes all enchantment types from an item except for the item types specified. ",
    "butcher" = "Kill all or nearby mobs. ",
    "butcherdespawn" = "Despawn all or nearby mobs. ",
    "brush" = "Sets the held item as the specified brush type or unbinds the brush from the held item. ",
    "snapshot" = "Manages backups and backup areas. ",
    "\\\\cut" = "Cuts the selected area to the clipboard. ",
    "\\\\copy" = "Copies the selected area to the clipboard. ",
    "\\\\paste" = "Pastes the clipboard to the selected area. ",
    "\\\\undo" = "Undoes the last action (from history). ",
    "\\\\pos1" = "Sets the pos1 location of the selected area for use in other worldedit commands. ",
    "\\\\pos2" = "Sets the pos2 location of the selected area for use in other worldedit commands. ",
    "\\\\protectarea" = "Sets the selected area as a protected area. ",
    "\\\\backuparea" = "Creates a new backup area convering the entire selected area. ",
    "\\\\hpos1" = "Sets the pos1 location of the selected area to the block that you are looking at for use in other worldedit commands. ",
    "\\\\hpos2" = "Sets the pos2 location of the selected area to the block that you are looking at for use in other worldedit commands. ",
    "\\\\chunk" = "Sets the pos1 and pos2 locations of the selected area to contain the entire chunk that you are currently in for use in other worldedit commands. ",
    "\\\\shift" = "Shifts the pos1 and pos2 locations of the selected area. ",
    "\\\\offset" = "Offsets the pos1 and pos2 locations of the selected area. ",
    "\\\\generate" = "Generates a 3d shape according to a formula in the selected area, in [-sr] the s modifier will prevent the math equation parser from replacing single equal signs with double equal signs and the r modifier will prevent that as well as any other modifications so that it is run as pure javascript, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, x: center relative x, y: center relative y, z: center relative z, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ",
    "\\\\generatef" = "Generates a 3d shape according to a formula in the selected area, this one does not allow access to custom variables which will prevent being able to run scripts using this, this one is much more limited than \\\\generate so it is only reccommended if you are restricting the \\\\generate command from a player to prevent script execution, in [-sr] the s modifier will prevent the math equation parser from replacing single equal signs with double equal signs and the r modifier will prevent that as well as any other modifications so that it is run as pure javascript, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, x: center relative x, y: center relative y, z: center relative z, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ",
    "\\\\generatejs" = "Generates a 3d shape according to the outputs of a JavaScript function in the selected area. ",
    "\\\\generatecallback" = "Executes the specified callback JavaScript function for each block in the selected area. ",
    "\\\\generates" = "Generates a 3d shape with the specified step according to a formula in the selected area, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, x: center relative x, y: center relative y, z: center relative z, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ",
    "\\\\generate2d" = "Generates a 2d shape according to a formula in the selected area, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, cx: center relative x, cy: center relative y, cz: center relative z, x: center and axis relative x, y: center and axis relative y, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ",
    "\\\\generates2d" = "Generates a 2d shape with the specified step according to a formula in the selected area, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, cx: center relative x, cy: center relative y, cz: center relative z, x: center and axis relative x, y: center and axis relative y, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ",
    "\\\\stack" = "Stacks the specified number of copies of the step area on top of the selected area. ",
    "\\\\selectmode" = "Sets the selection mode for the item you are holding, this is used to pick where to set pos1/pos2 to if the held item is a selection tool, or if the \\brush command was used to make the held item into a custom brush then it will be used to determine what block the brush will target. ",
    "\\\\itfill" = "Fills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. ",
    "\\\\idtfill" = "Fills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. ",
    "\\\\replace" = "Replaces the blocks between the selected area with the selected block type. ",
    "\\\\walls" = "Replaces the walls of the selected area with the selected block type. ",
    "\\\\set" = "Sets the blocks between the selected area to the selected block type. ",
    "\\\\seti" = "Sets the blocks between the selected area to the selected block type with the specified integrity. ",
    "\\\\drain" = "Drains the blocks between the selected area. ",
    "\\\\flood" = "Floods the blocks between the selected area. ",
    "\\\\remove" = "Remove the blocks in the selected area. ",
    "\\\\sphere" = "Generates a sphere in the selected area. ",
    "\\\\hsphere" = "Generates a hollow sphere in the selected area. ",
    "\\\\cone" = "Generates a cone in the selected area. ",
    "disconnect" = "Disconnects the specified players with an unexpected packet type error without saying that they left the game in the chat. So, it basically lets you silent disconnect players. ",
    "morph" = "Morphs into the morph with the specified morph ID. ",
    "scale" = "Sets the scale of the player, the default is 1.0. The visual scale scales the rendering and hitbox of the player by a certain amount, this can be combined with the visual scale. Note: To use this command the player must first have a scale component, to add this to the player you must run one of the andexsa:scale_#x commands on the player. Ex. /event entity @s andexsa:scale_1x",
    "tint" = "Tints the players skins a specified color, and optionally sets the alpha channel of their skins. The r, g, and b parameters are the color to tint it. The a parameter is the alpha channel. For the r, g, b, and a parameters, 1 is 0% brightness, 2 is 100% brightness, and anything higher than new makes the skins glow a certain amount. To enable the alpha channel you must set the useSpectatorMaterial parameter to 1, 0 is the default player material, 1 is the player material for players who are in spectator mode, 0 does not allow for an alpha channel, but 1 does allow for an alpha channel. ",
    "tps" = "Gets the current TPS values and displays them in the chat to you only.",
    "visualscale" = "Sets the visual scale of the player, the default is 0.9375. The visual scale scales the rendering of the player by a certain amount without changing the hitbox, this can be combined with the regular scale.",
    "visualscaleenabled" = "Enables or disables the visual scale override set in the \visualscale command."
}
export declare const commandsyntaxes: {
    align: string;
    aligncenter: string;
    binvsee: string;
    "": string;
    chatcommandui: string;
    chatsendui: string;
    clear: string;
    clearenderchest: string;
    clearenderchestslot: string;
    cloneitem: string;
    closeuis: string;
    closeui: string;
    cmdui: string;
    compressitems: string;
    compressitemsshulker: string;
    compressitemscontainer: string;
    compressitemscontainerb: string;
    copyitem: string;
    copyitemfrom: string;
    createexplosion: string;
    datapickblock: string;
    debugstickdyingmode: string;
    debugsticksdyingmode: string;
    dsdm: string;
    defaulthealth: string;
    dfthlth: string;
    dfthealth: string;
    dflthealth: string;
    drain: string;
    dupeitem: string;
    eb: string;
    ec: string;
    ecinvsee: string;
    ecinvseec: string;
    einvsee: string;
    enchantmentbarrels: string;
    enderchest: string;
    entityscaleversion: string;
    esver: string;
    eval: string;
    execute: string;
    ext: string;
    extinguish: string;
    extrafeaturessettings: string;
    ex: string;
    remfire: string;
    fill: string;
    fillillegal: string;
    fillinventory: string;
    filljunk: string;
    fillop: string;
    fillrandom: string;
    give: string;
    giveb: string;
    givec: string;
    getbans: string;
    getidbans: string;
    getnamebans: string;
    getuuid: string;
    gma: string;
    gmc: string;
    gmd: string;
    gmp: string;
    gmr: string;
    gms: string;
    gohome: string;
    ground: string;
    h: string;
    "h#": string;
    heal: string;
    health: string;
    help: string;
    home: string;
    hset: string;
    idtfill: string;
    ifill: string;
    ifillb: string;
    ifillc: string;
    ifilld: string;
    igfill: string;
    ignite: string;
    invfillillegal: string;
    invfill: string;
    invfilljunk: string;
    invfillop: string;
    invfillrandom: string;
    invsee: string;
    invseep: string;
    invseeuuidmode: string;
    invshuffle: string;
    invswap: string;
    invswapb: string;
    iogfill: string;
    item: string;
    itfill: string;
    itfillc: string;
    j: string;
    jumpto: string;
    kick: string;
    liststructures: string;
    listbans: string;
    listidbans: string;
    listnamebans: string;
    mainmenu: string;
    managecommands: string;
    manageplayers: string;
    managescriptautoeval: string;
    maxhealth: string;
    menu: string;
    messageui: string;
    minhealth: string;
    mngcmds: string;
    mngplyrs: string;
    mm: string;
    msgui: string;
    offlineinfo: string;
    offlineuuidinfo: string;
    offlineinvsee: string;
    offlineuuidinvsee: string;
    printlayers: string;
    playershopsystemsettings: string;
    rank: string;
    remexp: string;
    replacenear: string;
    run: string;
    scanenderchest: string;
    scanenderchestc: string;
    scnendchst: string;
    scnendchstc: string;
    sendui: string;
    servershopsystemsettings: string;
    setitem: string;
    setitemb: string;
    setnametag: string;
    setplayernametag: string;
    setentitynametag: string;
    settings: string;
    shopsystemsettings: string;
    spawn: string;
    shuffleinventory: string;
    structure: string;
    summon: string;
    swapinventories: string;
    swapinventoriesb: string;
    swapitems: string;
    takeitem: string;
    terminal: string;
    transferitem: string;
    thru: string;
    pthru: string;
    vthru: string;
    timezone: string;
    top: string;
    tpa: string;
    tpaccept: string;
    tpdeny: string;
    tz: string;
    up: string;
    ver: string;
    version: string;
    viewservershops: string;
    viewplayershops: string;
    warp: string;
    warplist: string;
    warplistdetails: string;
    warplistrawdata: string;
    warpremove: string;
    warpreset: string;
    warpset: string;
    w: string;
    wlist: string;
    wlistdetails: string;
    wlistrawdata: string;
    worldbordersettings: string;
    wremove: string;
    wreset: string;
    wset: string;
    transformresultatdvindex: string;
    gettransformsteb: string;
    findtransformdvindex: string;
    roie: string;
    remotheritemenchants: string;
    removeotheritemenchantments: string;
    brush: string;
    butcher: string;
    butcherdespawn: string;
    chunkinfo: string;
    selectioninfo: string;
    selinfo: string;
    seli: string;
    snapshot: string;
    "\\\\cut": string;
    "\\\\copy": string;
    "\\\\paste": string;
    "\\\\undo": string;
    "\\\\protectarea": string;
    "\\\\backuparea": string;
    "\\\\pos1": string;
    "\\\\pos2": string;
    "\\\\hpos1": string;
    "\\\\hpos2": string;
    "\\\\chunk": string;
    "\\\\shift": string;
    "\\\\offset": string;
    "\\\\sphere": string;
    "\\\\hsphere": string;
    "\\\\cone": string;
    "\\\\hcone": string;
    "\\\\remove": string;
    "\\\\walls": string;
    "\\\\set": string;
    "\\\\seti": string;
    "\\\\flood": string;
    "\\\\drain": string;
    "\\\\generate": string;
    "\\\\generatef": string;
    "\\\\generatejs": string;
    "\\\\generatecallback": string;
    "\\\\generates": string;
    "\\\\generate2d": string;
    "\\\\generatef2d": string;
    "\\\\generatejs2d": string;
    "\\\\generatecallback2d": string;
    "\\\\generates2d": string;
    "\\\\stack": string;
    "\\\\selectmode": string;
    "\\\\replace": string;
    "\\\\idtfill": string;
    "\\\\itfill": string;
    disconnect: string;
    morph: string;
    scale: string;
    tint: string;
    tps: string;
    visualscale: string;
    visualscaleenabled: string;
};
export declare const commandflags: {
    butcher: string;
    butcherdespawn: string;
    "\\\\cut": string;
    "\\\\copy": string;
    "\\\\paste": string;
    "\\\\undo": string;
    execute: string;
    ground: string;
    top: string;
};
export declare const helpCommandChatCommandsList = "\u00A72Chat Commands List\u00A7r\n.align - \u00A7oCenters you on the x and z axis on the block you are currently at. \u00A7r\n.aligncenter - \u00A7oCenters you on the x, y, and z axis on the block you are currently at. \u00A7r\n.binvsee - \u00A7oDisplays the contents of the specified block's inventory. \u00A7r\n.butcher - \u00A7oKill all or nearby mobs. \u00A7r\n.butcherdespawn - \u00A7oDespawn all or nearby mobs. \u00A7r\n.chatcommandui - \u00A7oOpens up a menu where you can type a chat command to run with no character limits. \u00A7r\n.chatsendui - \u00A7oOpens up a menu where you can type a chat message to send with no character limits. \u00A7r\n.chunkinfo - \u00A7oDisplays info about the current chunk. \u00A7r\n.clear - \u00A7oClears a player's inventory. \u00A7r\n.clearenderchest - \u00A7oClears a player's ender chest. \u00A7r\n.clearenderchestslot - \u00A7oClears a slot of a player's ender chest. \u00A7r\n.cloneitem - \u00A7oClones the item in your hand to the specified player's inventory. \u00A7r\n.closeuis - \u00A7oCloses any open script form uis for one or more players.\u00A7r\n.cmdui - \u00A7oOpens up a menu where you can type a chat command to run with no character limits. \u00A7r\n.compressitems - \u00A7oCompresses your inventory into 2 chests and inserts those chests into your inventory. \u00A7r\n.compressitemsshulker - \u00A7oCompresses your inventory into 2 shulker boxes and inserts those shulker boxes into your inventory. \u00A7r\n.compressitemscontainer - \u00A7oCompresses your inventory into a specified container type and inserts those containers into your inventory. \u00A7r\n.copyitem - \u00A7oCopies the item in your hand to the specified slot of the specified player's inventory. \u00A7r\n.createexplosion - \u00A7oCreates an explosion. \u00A7r\n.datapickblock - \u00A7oPick Blocks the block that your are looking at while copying the nbt data of the block as well, just like using the pick block button while holding CTRL on your keyboard. \u00A7r\n.debugstickdyingmode - \u00A7oTurns debug stick dying mode on or off, which allows you to dye debug sticks in a cauldron.\u00A7r\n.defaulthealth - \u00A7oSets the health of entities to their default health values. \u00A7r\n.drain - \u00A7oDrains liquids in the specified radius. \u00A7r\n.dupeitem - \u00A7oDuplicates teh item in your hand. \u00A7r\n.einvsee - \u00A7oDisplays the contents of the specified entity's inventory. \u00A7r\n.ecinvsee - \u00A7oScans a player's ender chest and displays the contents of it. \u00A7r\n.enchantmentbarrels - \u00A7oPlaces a structure containing Smithing Table Enchanted Books with every enchantment of the specified level.\u00A7r\n.enderchest - \u00A7oSpawns an ender chest where you are standing.\u00A7r\n.eval - \u00A7oRuns the specified JavaScript Script/ScriptAPI Code. \u00A7r\n.execute - \u00A7oExecutes a command on behalf of one or more entities. \u00A7r\n.extinguish - \u00A7oExtinguishes fire in the specified radius. \u00A7r\n.extrafeaturessettings - \u00A7oOpens up the extra features settings menu. \u00A7r\n.fill - \u00A7oFills all or parts of a reigon with a specific block, can use any block type including NBT Editor only ones. \u00A7r\n.fillillegal - \u00A7oFills a player's inventory with illegal items. \u00A7r\n.fillinventory - \u00A7oFills a player's inventory with items based on the provided itemJSON. \u00A7r\n.filljunk - \u00A7oFills a player's inventory with junk items. \u00A7r\n.fillop - \u00A7oFills a player's inventory with op items. \u00A7r\n.fillrandom - \u00A7oFills a player's inventory with random items. \u00A7r\n.give - \u00A7oGives you a specified amount of an item of a specified type. \u00A7r\n.giveb - \u00A7oGives you an item stack with a specified type and stack size in your next empty inventory slot. \u00A7r\n.givec - \u00A7oGives you an item stack based on the provided itemJSON in your next empty inventory slot. \u00A7r\n.getuuid - \u00A7oGets the UUID of the specified entity. \u00A7r\n.gma - \u00A7oSets your gamemode to adventure. \u00A7r\n.gmc - \u00A7oSets your gamemode to creative. \u00A7r\n.gmd - \u00A7oSets your gamemode to default. \u00A7r\n.gmp - \u00A7oSets your gamemode to spectator. \u00A7r\n.gmr - \u00A7oSets your gamemode to a random gamemode. \u00A7r\n.gms - \u00A7oSets your gamemode to survival. \u00A7r\n.gohome - \u00A7oWarps to a home.\u00A7r\n.ground - \u00A7oTeleports you down to the closest block below your feet.\u00A7r\n.h# - \u00A7oSwaps your hotbar with the specified hotbar preset.\u00A7r\n.heal - \u00A7oHeals entities.\u00A7r\n.health - \u00A7oModifies the health of entities.\u00A7r\n.help - \u00A7oProvides help.\u00A7r\n.hlist - \u00A7oLists all of your currently saved hotbar presets.\u00A7r\n.home - \u00A7oSets/Removes/Warps to a home.\u00A7r\n.hset - \u00A7oSets a hotbar preset.\u00A7r\n.idtfill - \u00A7oFills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. \u00A7r\n.ifill - \u00A7oFills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. \u00A7r\n.ignite - \u00A7oIgnites blocks in the specified radius. \u00A7r\n.invfillillegal - \u00A7oFills a player's inventory with illegal items. \u00A7r\n.invfill - \u00A7oFills a player's inventory with items based on the provided itemJSON. \u00A7r\n.invfilljunk - \u00A7oFills a player's inventory with junk items. \u00A7r\n.invfillop - \u00A7oFills a player's inventory with op items. \u00A7r\n.invfillrandom - \u00A7oFills a player's inventory with random items. \u00A7r\n.invsee - \u00A7oDisplays the contents of the specified player's inventory. \u00A7r\n.invseeuuidmode - \u00A7oDisplays the contents of the inventory of the entity with the specified UUID. \u00A7r\n.invshuffle - \u00A7oShuffles the inventory of the specified player\u00A7r\n.invswap - \u00A7oSwaps the inventories of 2 players. \u00A7r\n.invswapb - \u00A7oSwaps the inventories of 2 players. \u00A7r\n.item - \u00A7oSuper advanced item modification command. \u00A7r\n.itfill - \u00A7oFills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. \u00A7r\n.kick - \u00A7oKicks one or more players from the server. \u00A7r\n.listbans - \u00A7oLists all bans. \u00A7r\n.listidbans - \u00A7oLists all id bans. \u00A7r\n.listnamebans - \u00A7oLists all name bans. \u00A7r\n.liststructures - \u00A7oLists all saved structures. \u00A7r\n.mainmenu - \u00A7oOpens up the main menu. \u00A7r\n.managecommands - \u00A7oOpens up the commands editor menu. \u00A7r\n.manageplayers - \u00A7oOpens up the manage players menu. \u00A7r\n.managescriptautoeval - \u00A7oOpens up the Script Auto Eval settings menu. \u00A7r\n.maxhealth - \u00A7oHeals entities. \u00A7r\n.menu - \u00A7oOpens up the main menu. \u00A7r\n.messageui - \u00A7oOpens up a menu where you can type a chat message or command to send or run with no character limits. \u00A7r\n.minhealth - \u00A7oSets the health of entities to their minimum health values. \u00A7r\n.mm - \u00A7oOpens up the main menu. \u00A7r\n.mngcmds - \u00A7oOpens up the commands editor menu. \u00A7r\n.mngplyrs - \u00A7oOpens up the manage players menu. \u00A7r\n.offlineinfo - \u00A7oDisplays the saved player data of the specified player. \u00A7r\n.offlineuuidinfo - \u00A7oDisplays the saved player data of the player with the specified UUID. \u00A7r\n.offlineinvsee - \u00A7oDisplays the saved contents of the specified player's inventory. \u00A7r\n.offlineuuidinvsee - \u00A7oDisplays the saved contents of the inventory of the player with the specified UUID. \u00A7r\n.playershopsystemsettings - \u00A7oOpens up the player shop system settings menu. \u00A7r\n.printlayers - \u00A7oDisplays a list of all the blocks at your specified x and z coordinates. \u00A7r\n.pthru - \u00A7rTeleports to the other side of the wall/floor/ceilling that you are looking at. Even if it is only a one block tall gap at the other end.\u00A7r\n.rank - \u00A7oManages ranks stored in players. \u00A7r\n.remexp - \u00A7oRemoves explosive blocks in the specified radius. \u00A7r\n.remotheritemenchants - \u00A7oRemoves all enchantment types from an item except for the item types specified. \u00A7r\n.removeotheritemenchantments - \u00A7oRemoves all enchantment types from an item except for the item types specified. \u00A7r\n.roie - \u00A7oRemoves all enchantment types from an item except for the item types specified. \u00A7r\n.run - \u00A7oRuns the specified command. \u00A7r\n.scanenderchest - \u00A7oScans a player's ender chest and displays the contents of it. \u00A7r\n.scnendchst - \u00A7oScans a player's ender chest and displays the contents of it. \u00A7r\n.sendui - \u00A7oOpens up a menu where you can type a chat message to send with no character limits. \u00A7r\n.servershopsystemsettings - \u00A7oOpens up the server shop system settings menu. \u00A7r\n.setitem - \u00A7oReplaces the item stack in the specified inventory slot with an item stack with a specified type and stack size. \u00A7r\n.setitemb - \u00A7oReplaces the item stack in the specified inventory slot with an item stack based on the provided itemJSON. \u00A7r\n.setnametag - \u00A7oSets the name tag of a player or entity.\u00A7r\n.setplayernametag - \u00A7oSets the name tag of a player or entity.\u00A7r\n.setentitynametag - \u00A7oSets the name tag of a player or entity.\u00A7r\n.settings - \u00A7oOpens up the settings menu. \u00A7r\n.shopsyssettings - \u00A7oOpens up the shop system settings menu. \u00A7r\n.shopsystemsettings - \u00A7oOpens up the shop system settings menu. \u00A7r\n.shuffleinventory - \u00A7oShuffles the inventory of the specified player. \u00A7r\n.structure - \u00A7oManages structures. \u00A7r\n.summon - \u00A7oSummons entities. \u00A7r\n.swapinventories - \u00A7oSwaps the inventories of 2 players. \u00A7r\n.swapitems - \u00A7oSwaps an item in a slot of one player's inventory with another slot of another player's inventory. \u00A7r\n.takeitem - \u00A7oSteals an item from another player's inventory and puts it into yoru inventory. \u00A7r\n.terminal - \u00A7oOpens up the command runner/terminal menu. \u00A7r\n.timezone - \u00A7oSets your timezone to the specific UTC offset in hours. \u00A7r\n.thru - \u00A7oTeleports to the other side of the wall/floor/ceilling that you are looking at. \u00A7r\n.top - \u00A7oTeleports on top of the highest solid block at your x and z coordinates. \u00A7r\n.tpa - \u00A7oRequests to teleport to the specified player. \u00A7r\n.tpaccept - \u00A7oAccepts a player's teleport request. \u00A7r\n.tpdeny - \u00A7oDenies a player's teleport request. \u00A7r\n.transferitem - \u00A7oTransfers the item in your hand to the specified player's inventory. \u00A7r\n.tz - \u00A7oSets your timezone to the specific UTC offset in hours. \u00A7r\n.up - \u00A7oTeleports up the specified number of blocks and places glass below you if placeGlass is not set to false. \n.ver - \u00A7oDisplays the format version of the add-on. \u00A7r\n.version - \u00A7oDisplays the format version of the add-on. \u00A7r\n.vthru - \u00A7oTeleports to the other side of the wall/floor/ceilling that you are looking at, and allows for teleporting into the void. \u00A7r\n.viewplayershops - \u00A7oOpens up the list of public player shops. \u00A7r\n.viewservershops - \u00A7oOpens up the list of public server shops. \u00A7r\n.warp - \u00A7oWarps to the specified global warp. \u00A7r\n.warplist - \u00A7oLists all global warps. \u00A7r\n.warplistdetails - \u00A7oLists all global warps with more details. \u00A7r\n.warplistrawdata - \u00A7oLists the raw data of the global warps. \u00A7r\n.warpremove - \u00A7oRemoves the specified global warp. \u00A7r\n.warpreset - \u00A7oRemoves all global warps. \u00A7r\n.warpset - \u00A7oSets a global warp. \u00A7r\n.w - \u00A7oWarps to the specified private warp. \u00A7r\n.wlist - \u00A7oLists all private warps. \u00A7r\n.wlistdetails - \u00A7oLists all private warps with more details. \u00A7r\n.wlistrawdata - \u00A7oLists the raw data of the private warps. \u00A7r\n.wbsettings - \u00A7oOpens up the world border system settings menu. \u00A7r\n.worldbordersettings - \u00A7oOpens up the world border system settings menu. \u00A7r\n.wremove - \u00A7oRemoves the specified private warp. \u00A7r\n.wreset - \u00A7oRemoves all private warps. \u00A7r\n.wset - \u00A7oSets a private warp. \u00A7r\n.transformresultatdvindex - \u00A7oDisplays what item a smithing table enchanted book combined with a enchantment transfer smithing template of the specified data value would turn in to. \u00A7r\n.gettransformst - \u00A7oGives you an enchantment transfer smithing template with the data value needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. \u00A7r\n.findtransformdvindex - \u00A7oDisplays the data value of enchantment transfer smithing template needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. \u00A7r\n\u00A7cDangerous Commands: \u00A74\n.chunkban - \u00A7oFills a shulker box with the item in your first hotbar slot and put that shulker box into your first hotbar slot, and repeats this the specified number of times, this can be used to create a chunk ban. \u00A7r\n\u00A7aWorldEdit Commands: \u00A7r\n.brush - \u00A7oSets the held item as the specified brush type or unbinds the brush from the held item. \u00A7r\n.butcher - \u00A7oKill all or nearby mobs. \u00A7r\n.butcherdespawn - \u00A7oDespawn all or nearby mobs. \u00A7r\n.selectioninfo - \u00A7oDisplays info about the current selection. \u00A7r\n.selinfo - \u00A7oDisplays info about the current selection. \u00A7r\n.seli - \u00A7oDisplays info about the current selection. \u00A7r\n.snapshot - \u00A7rManages backups and backup areas. \u00A7r\n.\\cut - \u00A7oCuts the selected area to the clipboard. \u00A7r\n.\\copy - \u00A7oCopies the selected area to the clipboard. \u00A7r\n.\\paste - \u00A7oPastes the clipboard to the selected area. \u00A7r\n.\\undo - \u00A7oUndoes the last action (from history). \u00A7r\n.\\backuparea - \u00A7oCreates a new backup area convering the entire selected area. \u00A7r\n.\\protectarea - \u00A7oSets the selected area as a protected area. \u00A7r\n.\\pos1 - \u00A7oSets the pos1 location of the selected area for use in other worldedit commands. \u00A7r\n.\\pos2 - \u00A7oSets the pos2 location of the selected area for use in other worldedit commands. \u00A7r\n.\\hpos1 - \u00A7oSets the pos1 location of the selected area to the block that you are looking at for use in other worldedit commands. \u00A7r\n.\\hpos2 - \u00A7oSets the pos2 location of the selected area to the block that you are looking at for use in other worldedit commands. \u00A7r\n.\\chunk - \u00A7oSets the pos1 and pos2 locations of the selected area to contain the entire chunk that you are currently in for use in other worldedit commands. \u00A7r\n.\\shift - \u00A7oShifts the pos1 and pos2 locations of the selected area. \u00A7r\n.\\offset - \u00A7oOffsets the pos1 and pos2 locations of the selected area. \u00A7r\n.\\generate - \u00A7oGenerates a 3d shape according to a formula in the selected area. \u00A7r\n.\\generatef - \u00A7oGenerates a 3d shape according to a formula in the selected area. \u00A7r\n.\\generates - \u00A7oGenerates a 3d shape with the specified step according to a formula in the selected area. \u00A7r\n.\\stack - \u00A7oStacks the specified number of copies of the selected area on top of the selected area. \u00A7r\n.\\selectmode - \u00A7oSets the selection mode for the item your are holding, this is used to pick where to set pos1/pos2 to if the held item is a selection tool, or if the \\brush command was used to make the held item into a custom brush then it will be used to determine what block the brush will target. \u00A7r\n.\\itfill - \u00A7oFills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. \u00A7r\n.\\idtfill - \u00A7oFills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. \u00A7r\n.\\replace - \u00A7oReplaces the blocks between the selected area with the selected block type. \u00A7r\n.\\walls - \u00A7oReplaces the walls of the selected area with the selected block type. \u00A7r\n.\\set - \u00A7oSets the blocks between the selected area to the selected block type. \u00A7r\n.\\seti - \u00A7oSets the blocks between the selected area to the selected block type with the specified integrity. \u00A7r\n.\\drain - \u00A7oDrains the blocks between the selected area. \u00A7r\n.\\flood - \u00A7oFloods the blocks between the selected area. \u00A7r\n.\\remove - \u00A7oRemove the blocks in the selected area. \u00A7r\n.\\sphere - \u00A7oGenerates a sphere in the selected area. \u00A7r\n.\\hsphere - \u00A7oGenerates a hollow sphere in the selected area. \u00A7r\n.\\cone - \u00A7oGenerates a cone in the selected area. \u00A7r\n\u00A7bCommands that require \"8Crafter's Entity Scale, NBT, and Behavior Modifier, Bossbar, and Morph Addon\" in order to function: \u00A76\n.disconnect - \u00A7oDisconnects one or more players from the server. \u00A7r\u00A76\n.morph - \u00A7oMorphs into the morph with the specified ID. \u00A7r\u00A76\n.scale - \u00A7oSets your scale value to the specified amount. \u00A7r\u00A76\n.tint - \u00A7oTints the specified player's skin the specified color, or makes it glow, and optionally adjusts the opacity of their skin. \u00A7r\u00A76\n.tps - \u00A7oDisplays the TPS. \u00A7r\u00A76\n.visualscale - \u00A7oSets your visual scale (the one that does not actually change your hitbox size) to the specified amount. \u00A7r\u00A76\n.visualscaleenabled - \u00A7oEnables or diables your visual scaling. \n\u00A77Deprecated Commands: \u00A78\n.ecinvseec - \u00A7oScans a player's ender chest and displays the contents of it. \u00A7r\u00A78\n.ifillb - \u00A7oFills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. \u00A7r\u00A78\n.ifillc - \u00A7oFills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. \u00A7r\u00A78\n.igfill - \u00A7oFills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. \u00A7r\u00A78\n.iogfill - \u00A7oFills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. \u00A7r\u00A78\n.itfillc - \u00A7oFills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. \u00A7r\u00A78\n.scanenderchestc - \u00A7oScans a player's ender chest and displays the contents of it. \u00A7r\u00A78\n.scnendchstc - \u00A7oScans a player's ender chest and displays the contents of it. \u00A7r\u00A78\n.swapinventoriesb - \u00A7oSwaps the inventories of 2 players. \u00A7r";
export declare const helpUpcomingCommandChatCommandsList = "\u00A71Upcoming Chat Commands List\u00A7r\n.\\generatejs - \u00A7oGenerates a 3d shape according to the outputs of a JavaScript function in the selected area. \u00A7r\n.\\generatecallback - \u00A7oExecutes the specified callback JavaScript function for each block in the selected area. \u00A7r\n.\\generate2d - \u00A7oGenerates a 2d shape according to a formula in the selected area. \u00A7r\n.\\generates2d - \u00A7oGenerates a 2d shape with the specified step according to a formula in the selected area. \u00A7r\n.\\hcone - \u00A7oGenerates a hollow cone in the selected area. \u00A7r";
export declare function getCommandHelpPageForModBayCommandsDocumentation(commandName: string): string;
export declare function getCommandHelpPage(commandName: string, player?: Player | executeCommandPlayerW | Entity): string;
export declare function getCommandHelpPageExtra(commandName: string, player?: Player | executeCommandPlayerW | Entity): string;
export declare function getCommandHelpPageDebug(commandName: string, player?: Player | executeCommandPlayerW | Entity, spacing?: number): string;
export declare function getCommandHelpPageDebugPlus(commandName: string, player?: Player | executeCommandPlayerW | Entity, spacing?: number): string;
export declare function getCommandHelpPageCustomDebug(commandName: string, player?: Player | executeCommandPlayerW | Entity, spacing?: number): string;
