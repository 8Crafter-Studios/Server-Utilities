import { Player, world, Entity } from "@minecraft/server";
import { command, executeCommandPlayerW } from "./commands";
export var commanddescriptions;
(function (commanddescriptions) {
    //"ban" = "Bans a player. ",
    commanddescriptions["align"] = "Centers you on the x and z axis on the block you are currently at. ";
    commanddescriptions["aligncenter"] = "Centers you on the x, y, and z axis on the block you are currently at. ";
    commanddescriptions["binvsee"] = "Displays the contents of the specified block's inventory. ";
    commanddescriptions["chatcommandui"] = "Opens up a menu where you can type a chat command to run with no character limits. ";
    commanddescriptions["chatsendui"] = "Opens up a menu where you can type a chat message to send with no character limits. ";
    commanddescriptions["chunkinfo"] = "Displays info about the current chunk. ";
    commanddescriptions["clear"] = "Clears a player's inventory. ";
    commanddescriptions["clearenderchest"] = "Clears a player's ender chest. ";
    commanddescriptions["clearenderchestslot"] = "Clears a slot of a player's ender chest. ";
    commanddescriptions["cloneitem"] = "Clones the item in your hand to the specified player's inventory. ";
    commanddescriptions["closeuis"] = "Closes any open script form uis for one or more players.";
    commanddescriptions["closeui"] = "Closes any open script form uis for one or more players.";
    commanddescriptions["cmdui"] = "Opens up a menu where you can type a chat command to run with no character limits. ";
    commanddescriptions["compressitems"] = "Compresses your inventory into 2 chests and inserts those chests into your inventory. ";
    commanddescriptions["compressitemsshulker"] = "Compresses your inventory into 2 shulker boxes and inserts those shulker boxes into your inventory. ";
    commanddescriptions["compressitemscontainer"] = "Compresses your inventory into a specified container type and inserts those containers into your inventory. ";
    commanddescriptions["copyitem"] = "Copies the item in your hand to the specified slot of the specified player's inventory. ";
    commanddescriptions["createexplosion"] = "Creates an explosion. ";
    commanddescriptions["datapickblock"] = "Pick Blocks the block that your are looking at while copying the nbt data of the block as well, just like using the pick block button while holding CTRL on your keyboard. ";
    commanddescriptions["debugstickdyingmode"] = "Turns debug stick dying mode on or off, which allows you to dye debug sticks in a cauldron.";
    commanddescriptions["defaulthealth"] = "Sets the health of entities to their default health values. ";
    commanddescriptions["drain"] = "Drains liquids in the specified radius. ";
    commanddescriptions["dupeitem"] = "Duplicates teh item in your hand. ";
    commanddescriptions["einvsee"] = "Displays the contents of the specified entity's inventory. ";
    commanddescriptions["einvseeb"] = "The original version of the \\einvsee command that does not scan equipment slots.";
    commanddescriptions["ecinvsee"] = "Scans a player's ender chest and displays the contents of it.";
    commanddescriptions["ecinvseec"] = "Scans a player's ender chest and displays the contents of it.";
    commanddescriptions["enchantmentbarrels"] = "Places a structure containing Smithing Table Enchanted Books with every enchantment of the specified level.";
    commanddescriptions["enderchest"] = "Spawns an ender chest where you are standing.";
    // special a that causes text to use noto sans instead of mojangles: а
    commanddescriptions["eval"] = "Runs the specified JavaScript / Script API code. This can be very useful for doing things such as running more advanced commands with JavaScript variables and conditions, or running commands with JavaScript escape codes(for example to put multiple lines of text in the name of an entity or use special unicode characters in commands without needing to copy and paste them into your game). (Note: The names of the server modules are mcServer for the minecraft/Server module, mcServerUI for the minecraft/ServerUI module, and GameTest for the minecraft/GameTest module). Here are some examples:\n\nSend a tellraw command message:\n\\eval world.sendMessage(\"Example message\\nNew Line\\nSender's Name: \" + player.name + \"\\nToken Emoji: \\uE105\")\n\nGive all players health boost with the level equal to their XP level:\n\\eval world.getAllPlayers().forEach((p)=>{p.addEffect(\"health_boost\", 200, {amplifier: player.level, showParticles: false}); })";
    commanddescriptions["execute"] = "Executes a command on behalf of one or more entities. ";
    commanddescriptions["extinguish"] = "Extinguishes fire and soul fire in the specified radius. ";
    commanddescriptions["extrafeaturessettings"] = "Opens up the extra features settings menu.";
    commanddescriptions["extrasettings"] = "Opens up the extra features settings menu.";
    commanddescriptions["fill"] = "Fills all or parts of a reigon with a specific block, can use any block type including NBT Editor only ones. ";
    commanddescriptions["fillillegal"] = "Fills a player's inventory with illegal items. ";
    commanddescriptions["fillinventory"] = "Fills a player's inventory with items based on the provided itemJSON. ";
    commanddescriptions["filljunk"] = "Fills a player's inventory with junk items. ";
    commanddescriptions["fillop"] = "Fills a player's inventory with op items. ";
    commanddescriptions["fillrandom"] = "Fills a player's inventory with random items. ";
    commanddescriptions["give"] = "Inserts the specified number of the specified item type into the player's inventory. Note: The item parameter can be set to any valid item id, even ones that can't be used with the normal vanilla /give, such as ones that require an NBT editor to obtain, for example you could use minecraft:netherreactor to get a Nether Reactor Core. The count parameter can be any value from 0-255.";
    commanddescriptions["giveb"] = "Creates a new stack of the specified item type of the specified size in the player's inventory. Note: The item parameter can be set to any valid item id, even ones that can't be used with the normal vanilla /give, such as ones that require an NBT editor to obtain, for example you could use minecraft:netherreactor to get a Nether Reactor Core. The count parameter can be any value from 0-255.";
    commanddescriptions["givec"] = "Gives you an item stack based on the provided itemJSON in your next empty inventory slot. ";
    commanddescriptions["getuuid"] = "Gets the UUID of the specified entity. ";
    commanddescriptions["gma"] = "Sets your gamemode to adventure. ";
    commanddescriptions["gmc"] = "Sets your gamemode to creative. ";
    commanddescriptions["gmd"] = "Sets your gamemode to default. ";
    commanddescriptions["gmp"] = "Sets your gamemode to spectator. ";
    commanddescriptions["gmr"] = "Sets your gamemode to a random gamemode. ";
    commanddescriptions["gms"] = "Sets your gamemode to survival. ";
    commanddescriptions["gohome"] = "Warps to a home. ";
    commanddescriptions["ground"] = "Teleports you down to the closest block below your feet.";
    commanddescriptions["h"] = "Swaps your hotbar with the specified hotbar preset, optionally specifying a row of the container block to swap your hotbar with. ";
    commanddescriptions["h#"] = "Swaps your hotbar with the specified hotbar preset, optionally specifying a row of the container block to swap your hotbar with. ";
    commanddescriptions["heal"] = "Heals entities. ";
    commanddescriptions["health"] = "Modifies the health of entities.";
    commanddescriptions["help"] = "Provides help.";
    commanddescriptions["hlist"] = "Lists all of your currently saved hotbar presets.";
    commanddescriptions["home"] = "Sets/Removes/Warps to a home.";
    commanddescriptions["hset"] = "Sets a hotbar preset.";
    commanddescriptions["idtfill"] = "Fills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. ";
    commanddescriptions["ifill"] = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ";
    commanddescriptions["ifillb"] = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ";
    commanddescriptions["ifillc"] = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ";
    commanddescriptions["ifilld"] = "Fills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. ";
    commanddescriptions["igfill"] = "Fills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. ";
    commanddescriptions["ignite"] = "Ignites blocks in the specified radius. ";
    commanddescriptions["invfillillegal"] = "Fills a player's inventory with illegal items. ";
    commanddescriptions["invfill"] = "Fills a player's inventory with items based on the provided itemJSON. ";
    commanddescriptions["invfilljunk"] = "Fills a player's inventory with junk items. ";
    commanddescriptions["invfillop"] = "Fills a player's inventory with op items. ";
    commanddescriptions["invfillrandom"] = "Fills a player's inventory with random items. ";
    commanddescriptions["invsee"] = "Displays the contents of the specified player's inventory. ";
    commanddescriptions["invseep"] = "Displays the contents of the specified player's inventory, including the dynamic properties set on the items. ";
    commanddescriptions["invseeuuidmode"] = "Displays the contents of the inventory of the entity with the specified UUID. ";
    commanddescriptions["invshuffle"] = "Shuffles the inventory of the specified player";
    commanddescriptions["invswap"] = "Swaps the inventories of 2 players. ";
    commanddescriptions["invswapb"] = "Swaps the inventories of 2 players. ";
    commanddescriptions["iogfill"] = "Fills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. ";
    commanddescriptions["item"] = "Super advanced item modification command. ";
    commanddescriptions["itfill"] = "Fills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. ";
    commanddescriptions["itfillc"] = "Fills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. ";
    commanddescriptions["kick"] = "Kicks one or more players from the server. ";
    commanddescriptions["listbans"] = "Lists all bans. ";
    commanddescriptions["listidbans"] = "Lists all id bans. ";
    commanddescriptions["listnamebans"] = "Lists all name bans. ";
    commanddescriptions["liststructures"] = "Lists all saved structures. ";
    commanddescriptions["mainmenu"] = "Opens up the main menu. ";
    //"managebans" = "Opens up the manage bans menu. ",
    commanddescriptions["managecommands"] = "Opens up the commands editor menu. ";
    commanddescriptions["manageplayers"] = "Opens up the manage players menu. ";
    commanddescriptions["managescriptautoeval"] = "Opens up the Script Auto Eval settings menu. ";
    commanddescriptions["maxhealth"] = "Heals entities. ";
    commanddescriptions["menu"] = "Opens up the main menu. ";
    commanddescriptions["messageui"] = "Opens up a menu where you can type a chat message or command to send or run with no character limits. ";
    commanddescriptions["minhealth"] = "Sets the health of entities to their minimum health values. ";
    commanddescriptions["mm"] = "Opens up the main menu. ";
    commanddescriptions["mngcmds"] = "Opens up the commands editor menu. ";
    commanddescriptions["mngplyrs"] = "Opens up the manage players menu. ";
    //"money" = "Used for the money system [§r§1Indev§r]. ",
    commanddescriptions["notificationsettings"] = "Opens up the notifications settings menu. ";
    commanddescriptions["notificationssettings"] = "Opens up the notifications settings menu. ";
    commanddescriptions["offlineinfo"] = "Displays the saved player data of the specified player. ";
    commanddescriptions["offlineuuidinfo"] = "Displays the saved player data of the player with the specified UUID. ";
    commanddescriptions["offlineinvsee"] = "Displays the saved contents of the specified player's inventory. ";
    commanddescriptions["offlineuuidinvsee"] = "Displays the saved contents of the inventory of the player with the specified UUID. ";
    //"permaban" = "Permanently bans a player. ",
    commanddescriptions["playershopsyssettings"] = "Opens up the player shop system settings menu.";
    commanddescriptions["playershopsystemsettings"] = "Opens up the player shop system settings menu.";
    commanddescriptions["plyrshopsyssettings"] = "Opens up the player shop system settings menu.";
    commanddescriptions["printlayers"] = "Displays a list of all the non-air blocks at your specified x and z coordinates. ";
    commanddescriptions["rank"] = "Manages ranks stored in players. ";
    commanddescriptions["remexp"] = "Removes explosive blocks and entities in the specified radius, the radius defaults to 10 if not specified. Removes TNT and respawn anchors if in the overworld, removes TNT and beds if in the nether, and removes TNT, beds, and respawn anchors if in the end.";
    commanddescriptions["remexpne"] = "Removes explosive blocks in the specified radius, the radius defaults to 10 if not specified. Removes TNT and respawn anchors if in the overworld, removes TNT and beds if in the nether, and removes TNT, beds, and respawn anchors if in the end. Unlike the \remexp command, this one does not remove explosive entities, it only removes explosive blocks.";
    commanddescriptions["replacenear"] = "Replaces blocks of the specified type with another specified block type in the specified radius. ";
    commanddescriptions["run"] = "Runs the specified command after the specified number of ticks. ";
    commanddescriptions["scanenderchest"] = "Scans a player's ender chest and displays the contents of it. ";
    commanddescriptions["scanenderchestc"] = "Scans a player's ender chest and displays the contents of it. ";
    commanddescriptions["scnendchst"] = "Scans a player's ender chest and displays the contents of it. ";
    commanddescriptions["scnendchstc"] = "Scans a player's ender chest and displays the contents of it. ";
    commanddescriptions["selectioninfo"] = "Displays info about the current selection. ";
    commanddescriptions["selinfo"] = "Displays info about the current selection. ";
    commanddescriptions["seli"] = "Displays info about the current selection. ";
    commanddescriptions["sendui"] = "Opens up a menu where you can type a chat message to send with no character limits. ";
    commanddescriptions["servershopsyssettings"] = "Opens up the server shop system settings menu.";
    commanddescriptions["servershopsystemsettings"] = "Opens up the server shop system settings menu.";
    commanddescriptions["setitem"] = "Creates a new stack of the specified item type of the specified size in the specified slot of the specified player's inventory. Note: The item parameter can be set to any valid item id, even ones that can't be used with the normal vanilla /give, such as ones that require an NBT editor to obtain, for example you could use minecraft:netherreactor to get a Nether Reactor Core. The count parameter can be any value from 0-255.";
    commanddescriptions["setitemb"] = "Replaces the item stack in the specified inventory slot with an item stack based on the provided itemJSON. ";
    commanddescriptions["setnametag"] = "Sets the name tag of a player or entity. ";
    commanddescriptions["setplayernametag"] = "Sets the name tag of a player or entity. ";
    commanddescriptions["setentitynametag"] = "Sets the name tag of a player or entity. ";
    commanddescriptions["settings"] = "Opens up the settings menu.";
    commanddescriptions["shopsyssettings"] = "Opens up the shop system settings menu.";
    commanddescriptions["shopsystemsettings"] = "Opens up the shop system settings menu.";
    commanddescriptions["shuffleinventory"] = "Shuffles the inventory of the specified player.";
    commanddescriptions["spawn"] = "Teleports you to spawn. ";
    commanddescriptions["srvrshopsyssettings"] = "Opens up the server shop system settings menu.";
    commanddescriptions["structure"] = "Manages structures. ";
    commanddescriptions["summon"] = "Summons entities. ";
    commanddescriptions["swapinventories"] = "Swaps the inventories of 2 players. ";
    commanddescriptions["swapinventoriesb"] = "Swaps the inventories of 2 players. ";
    commanddescriptions["swapitems"] = "Swaps an item in a slot of one player's inventory with another slot of another player's inventory. ";
    commanddescriptions["takeitem"] = "Steals an item from another player's inventory and puts it into yoru inventory. ";
    //"tempban" = "Temporarily bans a player. ",
    commanddescriptions["terminal"] = "Opens up the command runner/terminal menu. ";
    commanddescriptions["timezone"] = "Sets your timezone to the specific UTC offset in hours. ";
    commanddescriptions["thru"] = "Teleports to the other side of the wall/floor/ceilling that you are looking at.";
    commanddescriptions["pthru"] = "Teleports to the other side of the wall/floor/ceilling that you are looking at. Even if it is only a one block tall gap at the other end.";
    commanddescriptions["vthru"] = "Teleports to the other side of the wall/floor/ceilling that you are looking at, even if it would put you into the void.";
    commanddescriptions["top"] = "Teleports on top of the highest solid block at your x and z coordinates. ";
    commanddescriptions["tpa"] = "Requests to teleport to the specified player. ";
    commanddescriptions["tpaccept"] = "Accepts a player's teleport request. ";
    commanddescriptions["tpdeny"] = "Denies a player's teleport request. ";
    commanddescriptions["transferitem"] = "Transfers the item in your hand to the specified player's inventory. ";
    commanddescriptions["tz"] = "Sets your timezone to the specific UTC offset in hours. ";
    //"unban" = "Unbans a player. ",
    commanddescriptions["up"] = "Teleports up the specified number of blocks and places glass below you if placeGlass is not set to false. ";
    commanddescriptions["version"] = "Displays the format version of the add-on. ";
    commanddescriptions["viewplayershops"] = "Opens up the list of public player shops.";
    commanddescriptions["viewservershops"] = "Opens up the list of public server shops.";
    commanddescriptions["warp"] = "Warps to the specified global warp. ";
    commanddescriptions["warplist"] = "Lists all global warps. ";
    commanddescriptions["warplistdetails"] = "Lists all global warps with more details. ";
    commanddescriptions["warplistrawdata"] = "Lists the raw data of the global warps. ";
    commanddescriptions["warpremove"] = "Removes the specified global warp. ";
    commanddescriptions["warpreset"] = "Removes all global warps. ";
    commanddescriptions["warpset"] = "Sets a global warp. ";
    commanddescriptions["wbsettings"] = "Opens up the world border system settings menu.";
    commanddescriptions["w"] = "Warps to the specified private warp. ";
    commanddescriptions["wlist"] = "Lists all private warps. ";
    commanddescriptions["wlistdetails"] = "Lists all private warps with more details. ";
    commanddescriptions["wlistrawdata"] = "Lists the raw data of the private warps. ";
    commanddescriptions["worldbordersettings"] = "Opens up the world border system settings menu.";
    commanddescriptions["wremove"] = "Removes the specified private warp. ";
    commanddescriptions["wreset"] = "Removes all private warps. ";
    commanddescriptions["wset"] = "Sets a private warp. ";
    commanddescriptions["chunkban"] = "Fills a shulker box with the item in your first hotbar slot and put that shulker box into your first hotbar slot, and repeats this the specified number of times, this can be used to create a chunk ban. ";
    commanddescriptions["transformresultatdvindex"] = "Displays what item a smithing table enchanted book combined with a enchantment transfer smithing template of the specified data value would turn in to. ";
    commanddescriptions["gettransformst"] = "Gives you an enchantment transfer smithing template with the data value needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. ";
    commanddescriptions["findtransformdvindex"] = "Displays the data value of enchantment transfer smithing template needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. ";
    commanddescriptions["roie"] = "Removes all enchantment types from an item except for the item types specified. ";
    commanddescriptions["remotheritemenchants"] = "Removes all enchantment types from an item except for the item types specified. ";
    commanddescriptions["removeotheritemenchantments"] = "Removes all enchantment types from an item except for the item types specified. ";
    commanddescriptions["butcher"] = "Kill all or nearby mobs. ";
    commanddescriptions["butcherdespawn"] = "Despawn all or nearby mobs. ";
    commanddescriptions["brush"] = "Sets the held item as the specified brush type or unbinds the brush from the held item. ";
    commanddescriptions["snapshot"] = "Manages backups and backup areas. ";
    commanddescriptions["\\\\cut"] = "Cuts the selected area to the clipboard. ";
    commanddescriptions["\\\\copy"] = "Copies the selected area to the clipboard. ";
    commanddescriptions["\\\\paste"] = "Pastes the clipboard to the selected area. ";
    commanddescriptions["\\\\undo"] = "Undoes the last action (from history). ";
    commanddescriptions["\\\\pos1"] = "Sets the pos1 location of the selected area for use in other worldedit commands. ";
    commanddescriptions["\\\\pos2"] = "Sets the pos2 location of the selected area for use in other worldedit commands. ";
    commanddescriptions["\\\\protectarea"] = "Sets the selected area as a protected area. ";
    commanddescriptions["\\\\backuparea"] = "Creates a new backup area convering the entire selected area. ";
    commanddescriptions["\\\\hpos1"] = "Sets the pos1 location of the selected area to the block that you are looking at for use in other worldedit commands. ";
    commanddescriptions["\\\\hpos2"] = "Sets the pos2 location of the selected area to the block that you are looking at for use in other worldedit commands. ";
    commanddescriptions["\\\\chunk"] = "Sets the pos1 and pos2 locations of the selected area to contain the entire chunk that you are currently in for use in other worldedit commands. ";
    commanddescriptions["\\\\shift"] = "Shifts the pos1 and pos2 locations of the selected area. ";
    commanddescriptions["\\\\offset"] = "Offsets the pos1 and pos2 locations of the selected area. ";
    commanddescriptions["\\\\generate"] = "Generates a 3d shape according to a formula in the selected area, in [-sr] the s modifier will prevent the math equation parser from replacing single equal signs with double equal signs and the r modifier will prevent that as well as any other modifications so that it is run as pure javascript, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, x: center relative x, y: center relative y, z: center relative z, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ";
    commanddescriptions["\\\\generatef"] = "Generates a 3d shape according to a formula in the selected area, this one does not allow access to custom variables which will prevent being able to run scripts using this, this one is much more limited than \\\\generate so it is only reccommended if you are restricting the \\\\generate command from a player to prevent script execution, in [-sr] the s modifier will prevent the math equation parser from replacing single equal signs with double equal signs and the r modifier will prevent that as well as any other modifications so that it is run as pure javascript, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, x: center relative x, y: center relative y, z: center relative z, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ";
    commanddescriptions["\\\\generatejs"] = "Generates a 3d shape according to the outputs of a JavaScript function in the selected area. ";
    commanddescriptions["\\\\generatecallback"] = "Executes the specified callback JavaScript function for each block in the selected area. ";
    commanddescriptions["\\\\generates"] = "Generates a 3d shape with the specified step according to a formula in the selected area, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, x: center relative x, y: center relative y, z: center relative z, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ";
    commanddescriptions["\\\\generate2d"] = "Generates a 2d shape according to a formula in the selected area, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, cx: center relative x, cy: center relative y, cz: center relative z, x: center and axis relative x, y: center and axis relative y, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ";
    commanddescriptions["\\\\generates2d"] = "Generates a 2d shape with the specified step according to a formula in the selected area, the formula can utilize the following variables: wx: world x, wy: world y, wz: world z, cx: center relative x, cy: center relative y, cz: center relative z, x: center and axis relative x, y: center and axis relative y, ax: pos1 x, ay: pos1 y, az: pos1 z, bx: pos2 x, by: pos2 y, bz: pos2 z, nx: negative corner x, ny: negative corner y, nz: negative corner z, px: positive corner x, py: positive corner y, pz: positive corner z. ";
    commanddescriptions["\\\\stack"] = "Stacks the specified number of copies of the step area on top of the selected area. ";
    commanddescriptions["\\\\selectmode"] = "Sets the selection mode for the item you are holding, this is used to pick where to set pos1/pos2 to if the held item is a selection tool, or if the \\brush command was used to make the held item into a custom brush then it will be used to determine what block the brush will target. ";
    commanddescriptions["\\\\itfill"] = "Fills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. ";
    commanddescriptions["\\\\idtfill"] = "Fills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. ";
    commanddescriptions["\\\\replace"] = "Replaces the blocks between the selected area with the selected block type. ";
    commanddescriptions["\\\\walls"] = "Replaces the walls of the selected area with the selected block type. ";
    commanddescriptions["\\\\set"] = "Sets the blocks between the selected area to the selected block type. ";
    commanddescriptions["\\\\seti"] = "Sets the blocks between the selected area to the selected block type with the specified integrity. ";
    commanddescriptions["\\\\drain"] = "Drains the blocks between the selected area. ";
    commanddescriptions["\\\\flood"] = "Floods the blocks between the selected area. ";
    commanddescriptions["\\\\remove"] = "Remove the blocks in the selected area. ";
    commanddescriptions["\\\\sphere"] = "Generates a sphere in the selected area. ";
    commanddescriptions["\\\\hsphere"] = "Generates a hollow sphere in the selected area. ";
    commanddescriptions["\\\\cone"] = "Generates a cone in the selected area. ";
    commanddescriptions["disconnect"] = "Disconnects the specified players with an unexpected packet type error without saying that they left the game in the chat. So, it basically lets you silent disconnect players. ";
    commanddescriptions["morph"] = "Morphs into the morph with the specified morph ID. ";
    commanddescriptions["scale"] = "Sets the scale of the player, the default is 1.0. The visual scale scales the rendering and hitbox of the player by a certain amount, this can be combined with the visual scale. Note: To use this command the player must first have a scale component, to add this to the player you must run one of the andexsa:scale_#x commands on the player. Ex. /event entity @s andexsa:scale_1x";
    commanddescriptions["tint"] = "Tints the players skins a specified color, and optionally sets the alpha channel of their skins. The r, g, and b parameters are the color to tint it. The a parameter is the alpha channel. For the r, g, b, and a parameters, 1 is 0% brightness, 2 is 100% brightness, and anything higher than new makes the skins glow a certain amount. To enable the alpha channel you must set the useSpectatorMaterial parameter to 1, 0 is the default player material, 1 is the player material for players who are in spectator mode, 0 does not allow for an alpha channel, but 1 does allow for an alpha channel. ";
    commanddescriptions["tps"] = "Gets the current TPS values and displays them in the chat to you only.";
    commanddescriptions["visualscale"] = "Sets the visual scale of the player, the default is 0.9375. The visual scale scales the rendering of the player by a certain amount without changing the hitbox, this can be combined with the regular scale.";
    commanddescriptions["visualscaleenabled"] = "Enables or disables the visual scale override set in the \visualscale command.";
})(commanddescriptions || (commanddescriptions = {}));
export const commandsyntaxes = {
    "align": `${command.dp}align`,
    "aligncenter": `${command.dp}aligncenter`,
    "binvsee": `${command.dp}binvsee <dimension: dimension|~> <block: x y z>`,
    "": `${command.dp}block
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
    "einvsee": `${command.dp}einvsee <targetSelector: target>`,
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
    "getbans": `${command.dp}getbans`,
    "getidbans": `${command.dp}getidbans`,
    "getnamebans": `${command.dp}getnamebans`,
    "getuuid": `${command.dp}getuuid <targets: target[allowMultiple=true]>`,
    "gma": `${command.dp}gma`,
    "gmc": `${command.dp}gmc`,
    "gmd": `${command.dp}gmd`,
    "gmp": `${command.dp}gmp`,
    "gmr": `${command.dp}gmr`,
    "gms": `${command.dp}gms`,
    "gohome": `${command.dp}gohome <homeName: text>`,
    "ground": `${command.dp}ground [-lp]`,
    "h": `${command.dp}h <presetId: float> [containerRow: float[?=0]]`,
    "h#": `${command.dp}h<presetId: float> [containerRow: float[?=0]]`,
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
    "offlineinfo": `${command.dp}offlineinfo <playerName: string>`,
    "offlineuuidinfo": `${command.dp}offlineuuidinfo <playerUUID: int>`,
    "offlineinvsee": `${command.dp}offlineinvsee <playerName: string>`,
    "offlineuuidinvsee": `${command.dp}offlineuuidinvsee <playerUUID: int>`,
    "printlayers": `${command.dp}printlayers`,
    "playershopsystemsettings": `${command.dp}playershopsystemsettings`,
    "rank": `${command.dp}rank <players: target> <mode: add|remove> <tag: string>\n${command.dp}rank <players: target> clear`,
    "remexp": `${command.dp}remexp [radius: number]`,
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
    "structure": `${command.dp}structure createempty <structureName: string> <sizeX: float> <sizeY: float> <sizeZ: float> [saveMode: memory|disk]
${command.dp}structure save <structureName: string> <from: x y z> <to: x y z> [saveMode: world|memory] [includeEntities: Boolean] [includeBlocks: Boolean]
${command.dp}structure load <structureName: string> <to: x y z> [rotation: 0|90|190|270] [mirror: none|x|z|xz] [includeEntities: Boolean] [includeBlocks: Boolean] [waterlogged: Boolean] [integrity: float] [integritySeed: string] [animationMode: none|blocks|layers] [animationSeconds: float]
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
ex. ${command.dp}summon 5 sheep<spawn_baby> ~~~~~ true "Sheep That Won't Despawn"`,
    "swapinventories": `${command.dp}swapinventories [player: target|~] [otherPlayer: target|~]`,
    "swapinventoriesb": `${command.dp}swapinventoriesb [player: playerName|~] [otherPlayer: playerName|~]`,
    "swapitems": `${command.dp}swapitems [slot: int|head|chest|legs|feet|mainhand|offhand|~] [otherSlot: int|head|chest|legs|feet|mainhand|offhand|~] [player: target|~] [otherPlayer: target|~]`,
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
    "gettransformsteb": `${command.dp}gettransformsteb [itemName: string] [data: int]`,
    "findtransformdvindex": `${command.dp}findtransformdvindex [itemName: string] [data: int]`,
    "roie": `${command.dp}remotheritemenchants <enchantmentTypesToKeep: StringArray>`,
    "remotheritemenchants": `${command.dp}remotheritemenchants <enchantmentTypesToKeep: StringArray>`,
    "removeotheritemenchantments": `${command.dp}remotheritemenchants <enchantmentTypesToKeep: StringArray>`,
    "brush": `${command.dp}brush [-l] none
${command.dp}brush [-l] <brushType: sphere|cube|square>` /*+` [-h]`*/ + ` <blockPattern: BlockPattern> [radius: float]
${command.dp}brush [-l] <brushType: splatter|splattercube|splattersquare|splattersurface|splattercubesurface|splattersquaresurface> [-h] <blockPattern: BlockPattern> [radius: float] [decay: float]` /*+`
    ${command.dp}brush [-l] <brushType: raise|lower> <shape: sphere|cube§c|squarex|squarey|squarez§r> [radius: float]`*/
        + `
${command.dp}brush [-l] <brushType: extinguish|ex|remexp> [radius: float]`,
    "butcher": `${command.dp}butcher [-abfgnprtwipceh] [radius: float]`,
    "butcherdespawn": `${command.dp}butcherdespawn [-abfgnprtwipceh] [radius: float]`,
    "chunkinfo": `${command.dp}chunkinfo`,
    "selectioninfo": `${command.dp}selectioninfo`,
    "selinfo": `${command.dp}selinfo`,
    "seli": `${command.dp}seli`,
    "snapshot": `${command.dp}snapshot backup <areaId: string>
${command.dp}snapshot rollback <areaId: string> [backupIndex: number]
${command.dp}snapshot deletebackup <areaId: string> [backupIndex: number]
${command.dp}snapshot clearbackups <areaId: string>
${command.dp}snapshot deletearea <areaId: string>
${command.dp}snapshot clearareas
${command.dp}snapshot listbackups <areaId: string>
${command.dp}snapshot listareas
${command.dp}snapshot list`,
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
    "\\\\sphere": `${command.dp}\\sphere <radius: float> <blockPattern: BlockPattern> [mask: SingleBlockMask]`,
    "\\\\hsphere": `${command.dp}\\hsphere <radius: float> <thickness: float> <blockPattern: BlockPattern> [mask: SingleBlockMask]`,
    "\\\\cone": `${command.dp}\\cone <radius: float> <blockPattern: BlockPattern> [mask: SingleBlockMask]`,
    "\\\\hcone": `${command.dp}\\hcone <radius: float> <thickness: float> <blockPattern: BlockPattern> [mask: SingleBlockMask]`,
    "\\\\remove": `${command.dp}\\remove`,
    "\\\\walls": `${command.dp}\\walls <blockPattern: BlockPattern> [mask: SingleBlockMask]`,
    "\\\\set": `${command.dp}\\set <blockPattern: BlockPattern>`,
    "\\\\seti": `${command.dp}\\seti <integrity: number> <blockPattern: BlockPattern>`,
    "\\\\flood": `${command.dp}\\flood`,
    "\\\\drain": `${command.dp}\\drain`,
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
    "\\\\replace": `${command.dp}\\replace <blockPattern: BlockPattern> [mask: mask]`,
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
export const commandflags = {
    "butcher": `No Flags: Kill items and experience orbs.
a: kill animals
b: kill ambient mobs
c: kill cloned players
e: kill everything
g: kill golems
h: kill hostile mobs
i: kill items and experience orbs
j: kill projectiles
l: kill bosses
o: kill paintings
p: kill players
r: kill armor stands
t: allow killing of name tagged entities
v: kill vehicles`,
    "butcherdespawn": `No Flags: Kill items and experience orbs.
a: despawn animals
b: despawn ambient mobs
c: despawn cloned players
e: despawn everything
g: despawn golems
h: despawn hostile mobs
i: despawn items and experience orbs
j: despawn projectiles
l: despawn bosses
o: despawn paintings
p: despawn players
r: despawn armor stands
t: allow despawning of name tagged entities
v: despawn vehicles`,
    "\\\\cut": `m: cut to memory instead of storage
e: don't include entities
b: don't include blocks`,
    "\\\\copy": `m: copy to memory instead of storage
e: don't include entities
b: don't include blocks`,
    "\\\\paste": `w: waterlog structure
e: don't include entities
b: don't include blocks
x: mirror structure x axis
z: mirror structure z axis
h: makes the copied structure be pasted at your current location instead of the selected location`,
    "\\\\undo": `k: don't remove the undo save point after finishing the undo
t: spawn in a ticking area before running the undo command`,
    "execute": `f: sends the feedback of the commands to the source of the execute command instead of the targeted entity
s: silences all command feedback
q: runs the commands in silent mode so that each entity does not send a notification in the chat to players with the getAllChatCommands tag
b: specifies that the command that will be run by the execute command is a built-in command, specifying this may reduce the lag caused by the command, if you are using this to run a built-in command in a repeating command block then this should be used
c: specifies that the command that will be run by the execute command is a custom command, specifying this may reduce the lag caused by the command, if you are using this to run a custom command in a repeating command block then this should be used`,
    "ground": `l: include liquid blocks in the list of blocks that count as ground blocks
p: include passable blocks in the list of blocks that count as ground blocks`,
    "top": `l: include liquid blocks in the list of blocks that count as ground blocks
p: include passable blocks in the list of blocks that count as ground blocks`
};
export const helpCommandChatCommandsList = `§2Chat Commands List§r
.align - §oCenters you on the x and z axis on the block you are currently at. §r
.aligncenter - §oCenters you on the x, y, and z axis on the block you are currently at. §r
.binvsee - §oDisplays the contents of the specified block's inventory. §r
.butcher - §oKill all or nearby mobs. §r
.butcherdespawn - §oDespawn all or nearby mobs. §r
.chatcommandui - §oOpens up a menu where you can type a chat command to run with no character limits. §r
.chatsendui - §oOpens up a menu where you can type a chat message to send with no character limits. §r
.chunkinfo - §oDisplays info about the current chunk. §r
.clear - §oClears a player's inventory. §r
.clearenderchest - §oClears a player's ender chest. §r
.clearenderchestslot - §oClears a slot of a player's ender chest. §r
.cloneitem - §oClones the item in your hand to the specified player's inventory. §r
.closeuis - §oCloses any open script form uis for one or more players.§r
.cmdui - §oOpens up a menu where you can type a chat command to run with no character limits. §r
.compressitems - §oCompresses your inventory into 2 chests and inserts those chests into your inventory. §r
.compressitemsshulker - §oCompresses your inventory into 2 shulker boxes and inserts those shulker boxes into your inventory. §r
.compressitemscontainer - §oCompresses your inventory into a specified container type and inserts those containers into your inventory. §r
.copyitem - §oCopies the item in your hand to the specified slot of the specified player's inventory. §r
.createexplosion - §oCreates an explosion. §r
.datapickblock - §oPick Blocks the block that your are looking at while copying the nbt data of the block as well, just like using the pick block button while holding CTRL on your keyboard. §r
.debugstickdyingmode - §oTurns debug stick dying mode on or off, which allows you to dye debug sticks in a cauldron.§r
.defaulthealth - §oSets the health of entities to their default health values. §r
.drain - §oDrains liquids in the specified radius. §r
.dupeitem - §oDuplicates teh item in your hand. §r
.einvsee - §oDisplays the contents of the specified entity's inventory. §r
.ecinvsee - §oScans a player's ender chest and displays the contents of it. §r
.enchantmentbarrels - §oPlaces a structure containing Smithing Table Enchanted Books with every enchantment of the specified level.§r
.enderchest - §oSpawns an ender chest where you are standing.§r
.eval - §oRuns the specified JavaScript Script/ScriptAPI Code. §r
.execute - §oExecutes a command on behalf of one or more entities. §r
.extinguish - §oExtinguishes fire in the specified radius. §r
.extrafeaturessettings - §oOpens up the extra features settings menu. §r
.fill - §oFills all or parts of a reigon with a specific block, can use any block type including NBT Editor only ones. §r
.fillillegal - §oFills a player's inventory with illegal items. §r
.fillinventory - §oFills a player's inventory with items based on the provided itemJSON. §r
.filljunk - §oFills a player's inventory with junk items. §r
.fillop - §oFills a player's inventory with op items. §r
.fillrandom - §oFills a player's inventory with random items. §r
.give - §oGives you a specified amount of an item of a specified type. §r
.giveb - §oGives you an item stack with a specified type and stack size in your next empty inventory slot. §r
.givec - §oGives you an item stack based on the provided itemJSON in your next empty inventory slot. §r
.getuuid - §oGets the UUID of the specified entity. §r
.gma - §oSets your gamemode to adventure. §r
.gmc - §oSets your gamemode to creative. §r
.gmd - §oSets your gamemode to default. §r
.gmp - §oSets your gamemode to spectator. §r
.gmr - §oSets your gamemode to a random gamemode. §r
.gms - §oSets your gamemode to survival. §r
.gohome - §oWarps to a home.§r
.ground - §oTeleports you down to the closest block below your feet.§r
.h# - §oSwaps your hotbar with the specified hotbar preset.§r
.heal - §oHeals entities.§r
.health - §oModifies the health of entities.§r
.help - §oProvides help.§r
.hlist - §oLists all of your currently saved hotbar presets.§r
.home - §oSets/Removes/Warps to a home.§r
.hset - §oSets a hotbar preset.§r
.idtfill - §oFills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. §r
.ifill - §oFills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. §r
.ignite - §oIgnites blocks in the specified radius. §r
.invfillillegal - §oFills a player's inventory with illegal items. §r
.invfill - §oFills a player's inventory with items based on the provided itemJSON. §r
.invfilljunk - §oFills a player's inventory with junk items. §r
.invfillop - §oFills a player's inventory with op items. §r
.invfillrandom - §oFills a player's inventory with random items. §r
.invsee - §oDisplays the contents of the specified player's inventory. §r
.invseeuuidmode - §oDisplays the contents of the inventory of the entity with the specified UUID. §r
.invshuffle - §oShuffles the inventory of the specified player§r
.invswap - §oSwaps the inventories of 2 players. §r
.invswapb - §oSwaps the inventories of 2 players. §r
.item - §oSuper advanced item modification command. §r
.itfill - §oFills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. §r
.kick - §oKicks one or more players from the server. §r
.listbans - §oLists all bans. §r
.listidbans - §oLists all id bans. §r
.listnamebans - §oLists all name bans. §r
.liststructures - §oLists all saved structures. §r
.mainmenu - §oOpens up the main menu. §r
.managecommands - §oOpens up the commands editor menu. §r
.manageplayers - §oOpens up the manage players menu. §r
.managescriptautoeval - §oOpens up the Script Auto Eval settings menu. §r
.maxhealth - §oHeals entities. §r
.menu - §oOpens up the main menu. §r
.messageui - §oOpens up a menu where you can type a chat message or command to send or run with no character limits. §r
.minhealth - §oSets the health of entities to their minimum health values. §r
.mm - §oOpens up the main menu. §r
.mngcmds - §oOpens up the commands editor menu. §r
.mngplyrs - §oOpens up the manage players menu. §r
.offlineinfo - §oDisplays the saved player data of the specified player. §r
.offlineuuidinfo - §oDisplays the saved player data of the player with the specified UUID. §r
.offlineinvsee - §oDisplays the saved contents of the specified player's inventory. §r
.offlineuuidinvsee - §oDisplays the saved contents of the inventory of the player with the specified UUID. §r
.playershopsystemsettings - §oOpens up the player shop system settings menu. §r
.printlayers - §oDisplays a list of all the blocks at your specified x and z coordinates. §r
.pthru - §rTeleports to the other side of the wall/floor/ceilling that you are looking at. Even if it is only a one block tall gap at the other end.§r
.rank - §oManages ranks stored in players. §r
.remexp - §oRemoves explosive blocks in the specified radius. §r
.remotheritemenchants - §oRemoves all enchantment types from an item except for the item types specified. §r
.removeotheritemenchantments - §oRemoves all enchantment types from an item except for the item types specified. §r
.roie - §oRemoves all enchantment types from an item except for the item types specified. §r
.run - §oRuns the specified command. §r
.scanenderchest - §oScans a player's ender chest and displays the contents of it. §r
.scnendchst - §oScans a player's ender chest and displays the contents of it. §r
.sendui - §oOpens up a menu where you can type a chat message to send with no character limits. §r
.servershopsystemsettings - §oOpens up the server shop system settings menu. §r
.setitem - §oReplaces the item stack in the specified inventory slot with an item stack with a specified type and stack size. §r
.setitemb - §oReplaces the item stack in the specified inventory slot with an item stack based on the provided itemJSON. §r
.setnametag - §oSets the name tag of a player or entity.§r
.setplayernametag - §oSets the name tag of a player or entity.§r
.setentitynametag - §oSets the name tag of a player or entity.§r
.settings - §oOpens up the settings menu. §r
.shopsyssettings - §oOpens up the shop system settings menu. §r
.shopsystemsettings - §oOpens up the shop system settings menu. §r
.shuffleinventory - §oShuffles the inventory of the specified player. §r
.structure - §oManages structures. §r
.summon - §oSummons entities. §r
.swapinventories - §oSwaps the inventories of 2 players. §r
.swapitems - §oSwaps an item in a slot of one player's inventory with another slot of another player's inventory. §r
.takeitem - §oSteals an item from another player's inventory and puts it into yoru inventory. §r
.terminal - §oOpens up the command runner/terminal menu. §r
.timezone - §oSets your timezone to the specific UTC offset in hours. §r
.thru - §oTeleports to the other side of the wall/floor/ceilling that you are looking at. §r
.top - §oTeleports on top of the highest solid block at your x and z coordinates. §r
.tpa - §oRequests to teleport to the specified player. §r
.tpaccept - §oAccepts a player's teleport request. §r
.tpdeny - §oDenies a player's teleport request. §r
.transferitem - §oTransfers the item in your hand to the specified player's inventory. §r
.tz - §oSets your timezone to the specific UTC offset in hours. §r
.up - §oTeleports up the specified number of blocks and places glass below you if placeGlass is not set to false. 
.ver - §oDisplays the format version of the add-on. §r
.version - §oDisplays the format version of the add-on. §r
.vthru - §oTeleports to the other side of the wall/floor/ceilling that you are looking at, and allows for teleporting into the void. §r
.viewplayershops - §oOpens up the list of public player shops. §r
.viewservershops - §oOpens up the list of public server shops. §r
.warp - §oWarps to the specified global warp. §r
.warplist - §oLists all global warps. §r
.warplistdetails - §oLists all global warps with more details. §r
.warplistrawdata - §oLists the raw data of the global warps. §r
.warpremove - §oRemoves the specified global warp. §r
.warpreset - §oRemoves all global warps. §r
.warpset - §oSets a global warp. §r
.w - §oWarps to the specified private warp. §r
.wlist - §oLists all private warps. §r
.wlistdetails - §oLists all private warps with more details. §r
.wlistrawdata - §oLists the raw data of the private warps. §r
.wbsettings - §oOpens up the world border system settings menu. §r
.worldbordersettings - §oOpens up the world border system settings menu. §r
.wremove - §oRemoves the specified private warp. §r
.wreset - §oRemoves all private warps. §r
.wset - §oSets a private warp. §r
.transformresultatdvindex - §oDisplays what item a smithing table enchanted book combined with a enchantment transfer smithing template of the specified data value would turn in to. §r
.gettransformst - §oGives you an enchantment transfer smithing template with the data value needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. §r
.findtransformdvindex - §oDisplays the data value of enchantment transfer smithing template needed to combine with a smithing table enchanted book in a smithing table to turn the smithing table enchanted book into the specified item type and data value. §r
§cDangerous Commands: §4
.chunkban - §oFills a shulker box with the item in your first hotbar slot and put that shulker box into your first hotbar slot, and repeats this the specified number of times, this can be used to create a chunk ban. §r
§aWorldEdit Commands: §r
.brush - §oSets the held item as the specified brush type or unbinds the brush from the held item. §r
.butcher - §oKill all or nearby mobs. §r
.butcherdespawn - §oDespawn all or nearby mobs. §r
.selectioninfo - §oDisplays info about the current selection. §r
.selinfo - §oDisplays info about the current selection. §r
.seli - §oDisplays info about the current selection. §r
.snapshot - §rManages backups and backup areas. §r
.\\cut - §oCuts the selected area to the clipboard. §r
.\\copy - §oCopies the selected area to the clipboard. §r
.\\paste - §oPastes the clipboard to the selected area. §r
.\\undo - §oUndoes the last action (from history). §r
.\\backuparea - §oCreates a new backup area convering the entire selected area. §r
.\\protectarea - §oSets the selected area as a protected area. §r
.\\pos1 - §oSets the pos1 location of the selected area for use in other worldedit commands. §r
.\\pos2 - §oSets the pos2 location of the selected area for use in other worldedit commands. §r
.\\hpos1 - §oSets the pos1 location of the selected area to the block that you are looking at for use in other worldedit commands. §r
.\\hpos2 - §oSets the pos2 location of the selected area to the block that you are looking at for use in other worldedit commands. §r
.\\chunk - §oSets the pos1 and pos2 locations of the selected area to contain the entire chunk that you are currently in for use in other worldedit commands. §r
.\\shift - §oShifts the pos1 and pos2 locations of the selected area. §r
.\\offset - §oOffsets the pos1 and pos2 locations of the selected area. §r
.\\generate - §oGenerates a 3d shape according to a formula in the selected area. §r
.\\generatef - §oGenerates a 3d shape according to a formula in the selected area. §r
.\\generates - §oGenerates a 3d shape with the specified step according to a formula in the selected area. §r
.\\stack - §oStacks the specified number of copies of the selected area on top of the selected area. §r
.\\selectmode - §oSets the selection mode for the item your are holding, this is used to pick where to set pos1/pos2 to if the held item is a selection tool, or if the \\brush command was used to make the held item into a custom brush then it will be used to determine what block the brush will target. §r
.\\itfill - §oFills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. §r
.\\idtfill - §oFills all or parts of the selected area with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, also allows specifying the integrity of the fill, can use any block type including NBT Editor only ones. §r
.\\replace - §oReplaces the blocks between the selected area with the selected block type. §r
.\\walls - §oReplaces the walls of the selected area with the selected block type. §r
.\\set - §oSets the blocks between the selected area to the selected block type. §r
.\\seti - §oSets the blocks between the selected area to the selected block type with the specified integrity. §r
.\\drain - §oDrains the blocks between the selected area. §r
.\\flood - §oFloods the blocks between the selected area. §r
.\\remove - §oRemove the blocks in the selected area. §r
.\\sphere - §oGenerates a sphere in the selected area. §r
.\\hsphere - §oGenerates a hollow sphere in the selected area. §r
.\\cone - §oGenerates a cone in the selected area. §r
§bCommands that require "8Crafter's Entity Scale, NBT, and Behavior Modifier, Bossbar, and Morph Addon" in order to function: §6
.disconnect - §oDisconnects one or more players from the server. §r§6
.morph - §oMorphs into the morph with the specified ID. §r§6
.scale - §oSets your scale value to the specified amount. §r§6
.tint - §oTints the specified player's skin the specified color, or makes it glow, and optionally adjusts the opacity of their skin. §r§6
.tps - §oDisplays the TPS. §r§6
.visualscale - §oSets your visual scale (the one that does not actually change your hitbox size) to the specified amount. §r§6
.visualscaleenabled - §oEnables or diables your visual scaling. 
§7Deprecated Commands: §8
.ecinvseec - §oScans a player's ender chest and displays the contents of it. §r§8
.ifillb - §oFills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. §r§8
.ifillc - §oFills all or parts of a reigon with a specific block, with no limits, can use any block type including NBT Editor only ones. §r§8
.igfill - §oFills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. §r§8
.iogfill - §oFills all or parts of a reigon with a specific block, with no limits, uses a generator function so it never will produce a script hang error but it is extremely slow, can use any block type including NBT Editor only ones. §r§8
.itfillc - §oFills all or parts of a reigon with a specific block, with no limits, also temporarily spawns a tickingarea to load in chunks around it, can use any block type including NBT Editor only ones. §r§8
.scanenderchestc - §oScans a player's ender chest and displays the contents of it. §r§8
.scnendchstc - §oScans a player's ender chest and displays the contents of it. §r§8
.swapinventoriesb - §oSwaps the inventories of 2 players. §r`;
export const helpUpcomingCommandChatCommandsList = `§1Upcoming Chat Commands List§r
.\\generatejs - §oGenerates a 3d shape according to the outputs of a JavaScript function in the selected area. §r
.\\generatecallback - §oExecutes the specified callback JavaScript function for each block in the selected area. §r
.\\generate2d - §oGenerates a 2d shape according to a formula in the selected area. §r
.\\generates2d - §oGenerates a 2d shape with the specified step according to a formula in the selected area. §r
.\\hcone - §oGenerates a hollow cone in the selected area. §r`;
export function getCommandHelpPageForModBayCommandsDocumentation(commandName) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return (!!!commanddescriptions[cmd.commandName] && !!!commandsyntaxes[cmd.commandName] && !!!commandflags[cmd.commandName] && !!!cmd.command_version)
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `${!cmd.commandName.startsWith("\\") ? "\\" + cmd.commandName : cmd.commandName}\n${(commanddescriptions[cmd.commandName] ?? cmd.settings.defaultSettings?.description).replaceAll(/§[a-zA-Z]/g, "")}\nCommand Syntax:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? commandsyntaxes[cmd.commandName] ?? tryget(() => cmd.formats["map"](v => !!v?.format ? v.format : v).join(" ")) ?? (typeof cmd.formats == "string" ? cmd.formats : undefined) ?? "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? !!!commandflags[cmd.commandName]
                ? ""
                : "\nFlags:\n" + commandflags[cmd.commandName]
            : "\nFlags:\n" + commandflags[cmd.currentCommandName]}\nAliases: ${(cmd.aliases?.length ?? 0) != 0 ? `${JSON.stringify(cmd.aliases.map((v) => v.commandName))}` : "[]"}${!!!cmd.category
            ? ""
            : "\nCategories: " + JSON.stringify(cmd.categories)}${!!!cmd.settings.defaultSettings
            ? ""
            : "\nDefault Required Tags: " + JSON.stringify(cmd.settings.defaultSettings.requiredTags)}${!!!cmd.command_version
            ? ""
            : "\nVersion: " + cmd.command_version}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replace(!cmd.commandName.startsWith("\\") ? "\\" + cmd.commandName : cmd.commandName, "<h3>" + (!cmd.commandName.startsWith("\\") ? "\\" + cmd.commandName : cmd.commandName) + "</h3>").replaceAll(/(?<!\<\/h3\>)\n(?!\<h3\>)/g, "</p>\n<p>").replaceAll(/(?<=\<\/h3\>)\n(?!\<h3\>)/g, "\n<p>").replaceAll(/(?<!\<\/h3\>)\n(?=\<h3\>)/g, "</p>\n") + "</p>";
}
//${se}let a = ""; commands.filter(v=>v.deprecated==true&&v.functional==true).forEach(v=>{a+="\n"+cmdsdocs.getCommandHelpPageForModBayCommandsDocumentation(v.commandName)}); console.log(a)
export function getCommandHelpPage(commandName, player) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return !!!commanddescriptions[cmd.commandName] && !!!commandsyntaxes[cmd.commandName] && !!!commandflags[cmd.commandName] && !!!cmd.command_version && !cmd.isHidden
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName] ?? cmd.description}§r\nUsage:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? tryget(() => cmd.formats?.["map"](v => !!v?.format ? v.format : v).join(" ")) ?? (typeof cmd.formats == "string" ? cmd.formats : undefined) ?? "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? ""
            : "\nFlags:\n" + commandflags[cmd.currentCommandName].split("\n").join("§r\n")}${!!!cmd.command_version
            ? ""
            : "\nVersion: " + cmd.formatting_code + cmd.command_version}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled
            ? "§cDISABLED"
            : "§aENABLED"}${!cmd.isDeprecated
            ? ""
            : "\n§cThis command is deprecated!"}${cmd.isFunctional
            ? ""
            : "\n§cThis command is not functional!"}${!!player
            ? cmd.testCanPlayerUseCommand(player)
                ? ""
                : "\n§cYou do not have permission to use this command!"
            : ""}`;
}
export function getCommandHelpPageExtra(commandName, player) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return (!!!commanddescriptions[cmd.commandName] && !!!commandsyntaxes[cmd.commandName] && !!!commandflags[cmd.commandName] && !!!cmd.command_version) || cmd.isHidden
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName] ?? cmd.settings.defaultSettings?.description ?? "Missing"}§r\nUsage:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? tryget(() => cmd.settings.defaultSettings.formats["map"](v => !!v?.format ? v.format : v).join(" ")) ?? (typeof cmd.settings.defaultSettings.formats == "string" ? cmd.settings.defaultSettings.formats : undefined) ?? "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? ""
            : "§r\nFlags:\n" + commandflags[cmd.currentCommandName].split("\n").join("§r\n")}${!!!cmd.command_version
            ? ""
            : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${!!!cmd.category
            ? ""
            : "§r\nCategories: " + JSON.stringify(cmd.categories)}${!!!cmd.settings.defaultSettings
            ? ""
            : "§r\nDefault Required Tags: " + JSON.stringify(cmd.settings.defaultSettings.requiredTags)}${!!!cmd.settings.requiredTags
            ? ""
            : "§r\nRequired Tags: " + JSON.stringify(cmd.settings.requiredTags)}${!!!cmd.settings.requiresOp
            ? ""
            : "§r\nRequires OP: " + JSON.stringify(cmd.settings.requiresOp)}${!!!cmd.settings.requiredPermissionLevel
            ? ""
            : "§r\nRequired Permission Level: " + JSON.stringify(cmd.settings.requiredPermissionLevel)}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled
            ? "§cDISABLED"
            : "§aENABLED"}${!cmd.isDeprecated
            ? ""
            : "\n§cThis command is deprecated!"}${cmd.isFunctional
            ? ""
            : "\n§cThis command is not functional!"}${!!player
            ? cmd.testCanPlayerUseCommand(player)
                ? ""
                : "\n§cYou do not have permission to use this command!"
            : ""}`;
}
export function getCommandHelpPageDebug(commandName, player, spacing = 0) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return (!!!commanddescriptions[cmd.commandName] && !!!commandsyntaxes[cmd.commandName] && !!!commandflags[cmd.commandName] && !!!cmd.command_version) || cmd.isHidden
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName]}§r\nUsage:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? ""
            : "§r\nFlags:\n" + commandflags[cmd.currentCommandName].split("\n").join("§r\n")}${!!!cmd.command_version
            ? ""
            : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${!!!cmd.category
            ? ""
            : "§r\nCategories: " + JSON.stringify(cmd.categories)}${!!!cmd.settings?.defaultSettings
            ? ""
            : "§r\nBuilt-In Raw Command Data: " + JSON.stringify(Object.fromEntries(Object.entries(cmd.settings.defaultSettings).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") {
                return "§r" + v + "§r";
            }
            else {
                return v;
            } }, spacing)}${!!!cmd.settings
            ? ""
            : "§r\nRaw Settings: " + JSON.stringify(Object.fromEntries(Object.entries(cmd.settings).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") {
                return "§r" + v + "§r";
            }
            else {
                return v;
            } }, spacing)}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled
            ? "§cDISABLED"
            : "§aENABLED"}${!cmd.isDeprecated
            ? ""
            : "\n§cThis command is deprecated!"}${cmd.isFunctional
            ? ""
            : "\n§cThis command is not functional!"}${!!player
            ? cmd.testCanPlayerUseCommand(player)
                ? ""
                : "\n§cYou do not have permission to use this command!"
            : ""}`;
}
export function getCommandHelpPageDebugPlus(commandName, player, spacing = 0) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return !!!commanddescriptions[cmd.commandName] && !!!commandsyntaxes[cmd.commandName] && !!!commandflags[cmd.commandName] && !!!cmd.command_version
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName]}§r\nUsage:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? ""
            : "§r\nFlags:\n" + commandflags[cmd.currentCommandName].split("\n").join("§r\n")}${!!!cmd.command_version
            ? ""
            : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${!!!cmd.category
            ? ""
            : "§r\nCategories: " + JSON.stringify(cmd.categories, (k, v) => { if (typeof v == "string") {
                return "§r" + v + "§r";
            }
            else {
                return v;
            } })}${!!!cmd.settings?.defaultSettings
            ? ""
            : "§r\nBuilt-In Raw Command Data: " + JSON.stringify(Object.fromEntries(Object.entries(cmd.settings.defaultSettings).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") {
                return "§r" + v + "§r";
            }
            else {
                return v;
            } }, spacing)}${!!!cmd.settings
            ? ""
            : "§r\nRaw Settings: " + JSON.stringify(Object.fromEntries(Object.entries(cmd.settings).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") {
                return "§r" + v + "§r";
            }
            else {
                return v;
            } }, spacing)}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled
            ? "§cDISABLED"
            : "§aENABLED"}${!cmd.isDeprecated
            ? ""
            : "\n§cThis command is deprecated!"}${cmd.isFunctional
            ? ""
            : "\n§cThis command is not functional!"}${!!player
            ? cmd.testCanPlayerUseCommand(player)
                ? ""
                : "\n§cYou do not have permission to use this command!"
            : ""}`;
}
export function getCommandHelpPageCustomDebug(commandName, player, spacing = 0) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "custom");
    return !cmd.settings.isSaved
        ? `§cError: Unknown custom command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName]}§r\nUsage:\n- ${(commandsyntaxes[cmd.currentCommandName] ?? "missing")
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName]
            ? ""
            : "§r\nFlags:\n" + commandflags[cmd.currentCommandName].split("\n").join("§r\n")}${!!!cmd.command_version
            ? ""
            : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${!!!cmd.category
            ? ""
            : "§r\nCategories: " + JSON.stringify(cmd.categories)}${!!!cmd.settings
            ? ""
            : "§r\nRaw Settings: " + JSON.stringify(Object.fromEntries(Object.entries(cmd.settings).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") {
                return "§r" + v + "§r";
            }
            else {
                return v;
            } }, spacing)}${!!!cmd
            ? ""
            : "§r\nRaw Command Data: " + JSON.stringify(Object.fromEntries(Object.entries(cmd).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") {
                return "§r" + v + "§r";
            }
            else {
                return v;
            } }, spacing)}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled
            ? "§cDISABLED"
            : "§aENABLED"}${!!player
            ? cmd.testCanPlayerUseCommand(player)
                ? ""
                : "\n§cYou do not have permission to use this command!"
            : ""}`;
}
//# sourceMappingURL=commands_documentation.js.map