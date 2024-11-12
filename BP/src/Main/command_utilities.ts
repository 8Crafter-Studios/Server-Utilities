import {
  Block,
  BlockInventoryComponent,
  BlockPermutation,
  ChatSendBeforeEvent,
  Container,
  Dimension,
  DimensionTypes,
  EntityInventoryComponent,
  ItemStack,
  Player,
  system,
  world,
  Entity,
  EquipmentSlot,
  ContainerSlot,
  EntityEquippableComponent,
  BlockType,
  BlockTypes,
  ItemTypes,
  ItemType,
  ItemLockMode,
  type Enchantment,
  type DimensionLocation,
  type Vector3,
  type Vector2,
  CompoundBlockVolume,
  BlockVolumeIntersection,
  BlockVolume,
  BlockVolumeBase,
  GameMode,
  type RawMessage,
  type MusicOptions,
  type PlayerSoundOptions,
  type EntityApplyDamageOptions,
  type EntityApplyDamageByProjectileOptions,
  MolangVariableMap,
  type BlockRaycastOptions,
  type EntityComponentTypeMap,
  EffectType,
  type EntityRaycastOptions,
  type EntityQueryOptions,
  type PlayAnimationOptions,
  type TeleportOptions,
  EnchantmentTypes,
  StructureSaveMode,
  EntityTypes,
  type BlockRaycastHit,
  StructureAnimationMode,
  StructureMirrorAxis,
  StructureRotation,
  Structure,
  type BlockComponentTypeMap,
  PlayerCursorInventoryComponent,
} from "@minecraft/server";
import {
  getTopSolidBlock,
  arrayToElementList,
  debugAction,
  interactable_block,
  interactable_blockb,
  customFormUIElement,
  strToCustomFormUIElement /*,format_version*/,
  getUICustomForm,
  worldPlayers,
  timeZones,
  mainEval,
  debugActionb,
  indirectMainEval,
  gedp,
  gidp,
  gwdp,
  mainRun,
  sedp,
  sidp,
  swdp,
  fillBlocks,
  fillBlocksB,
  mainmetaimport,
  srun,
  gt,
  fillBlocksC,
  fillBlocksD,
  fillBlocksCG,
  fillBlocksH,
  fillBlocksHW,
  fillBlocksHB,
  fillBlocksHH,
  fillBlocksHO,
  fillBlocksHP,
  scanForContainerBlocks,
  clearAllContainerBlocks,
  fillBlocksHC,
  fillBlocksHS,
  fillBlocksHHS,
  fillBlocksHT,
  fillBlocksHSG,
  fillBlocksHHSG,
  fillBlocksHDG,
  fillBlocksHSSG,
  fillBlocksHOG,
  fillBlocksHHOG,
  fillBlocksHSGG,
  fillBlocksHISGG,
  format_version,
  fillBlocksHFG,
  fillBlocksHWG,
  fillBlocksHHG,
  fillBlocksHOTG,
  fillBlocksHFGB,
  dimensionTypeDisplayFormatting,
  dimensionTypeDisplayFormattingB,
  dimensionTypeDisplayFormattingC,
  dimensionTypeDisplayFormattingD,
  config,
  fillBlocksHSGB,
  fillBlocksHCGB,
  fillBlocksHHSGB,
  fillBlocksHFFGB,
  fillBlocksHWFGB,
  dimensionTypeDisplayFormattingE,
  SemVerString,
  SemVerMatcher,
  SemVerValidator,
  dimensions,
  dimensionsb,
  dimensionsc,
  dimensionsd,
  dimensionse,
  fillBlocksHHFGB,
  fillBlocksHISGGB,
  fillBlocksHOFGB,
  fillBlocksHSGGB,
  flatPath,
  getGroundSolidBlock,
  getNextTopSolidBlockAbovePosition,
  getNextTopSolidBlockBelowPosition,
  getPathInObject,
  nether,
  overworld,
  scanForBlockType,
  the_end,
  v3Multiply,
  fillBlocksE,
  fillBlocksF,
} from "../Main";
import {
  LocalTeleportFunctions,
  coordinates,
  coordinatesB,
  evaluateCoordinates,
  anglesToDirectionVector,
  anglesToDirectionVectorDeg,
  caretNotationB,
  caretNotation,
  caretNotationC,
  caretNotationD,
  coordinatesC,
  coordinatesD,
  coordinatesE,
  coordinates_format_version,
  evaluateCoordinatesB,
  movePointInDirection,
  facingPoint,
  type ILocalTeleport,
  WorldPosition,
  rotate,
  rotate3d,
  roundVector3ToMiddleOfBlock,
  generateTickingAreaFillCoordinatesC,
  doBoundingBoxesIntersect,
  chunkIndexToBoundingBox,
  roundVector3ToMiddleOfBlockFloorY,
  evaluateRotationCoordinates,
  getChunkIndex,
  getChunkIndexB,
  getChunkIndexC,
  approxEqual,
  approxEquals,
  approximatelyEqual,
  approximatelyEquals,
  parseExpression,
  generateMathExpression,
  parseExpressionKE,
  parseExpressionR,
  Vector,
  chunkIndexToBoundingBoxB,
  parseExpressionBR,
  parseExpressionBKE,
  parseExpressionB,
  blockClipboard,
  removeAirFromStructure,
  undoClipboard,
  AreaBackups,
  AreaBackup,
  VSTR,
  diroffsetmapb,
  diroffsetmap,
} from "./coordinates";
import { ban, ban_format_version } from "./ban";
import {
  player_save_format_version,
  savedPlayer,
  type savedPlayerData,
  type savedItem,
} from "./player_save.js";
import {
  editAreas,
  noPistonExtensionAreas,
  noBlockBreakAreas,
  noBlockInteractAreas,
  noBlockPlaceAreas,
  noExplosionAreas,
  noInteractAreas,
  protectedAreas,
  testIsWithinRanges,
  getAreas,
  spawnProtectionTypeList,
  spawn_protection_format_version,
  convertToCompoundBlockVolume,
  getType,
  editAreasMainMenu,
} from "./spawn_protection.js";
import {
  customElementTypeIds,
  customFormListSelectionMenu,
  editCustomFormUI,
  forceShow,
  showCustomFormUI,
  addNewCustomFormUI,
  customElementTypes,
  customFormDataTypeIds,
  customFormDataTypes,
  customFormUIEditor,
  customFormUIEditorCode,
  ui_format_version,
  settings,
  personalSettings,
  editorStickB,
  editorStickMenuB,
  mainMenu,
  globalSettings,
  evalAutoScriptSettings,
  editorStickMenuC,
  inventoryController,
  editorStickC,
  playerController,
  entityController,
  scriptEvalRunWindow,
  editorStick,
  managePlayers,
  terminal,
  manageCommands,
  chatMessageNoCensor,
  chatCommandRunner,
  chatSendNoCensor,
  notificationsSettings,
} from "./ui.js";
import { listoftransformrecipes } from "Assets/constants/transformrecipes";
import {
  arrayify,
  utilsmetaimport,
  combineObjects,
  customModulo,
  escapeRegExp,
  extractJSONStrings,
  fixedPositionNumberObject,
  fromBaseToBase,
  generateAIID,
  generateCUID,
  generateTUID,
  getAIIDClasses,
  getArrayElementProperty,
  getCUIDClasses,
  getParametersFromExtractedJSON,
  getParametersFromString,
  jsonFromString,
  objectify,
  roundPlaceNumberObject,
  shootEntity,
  shootEntityB,
  shootProjectile,
  shootProjectileB,
  shuffle,
  splitTextByMaxProperyLength,
  stringify,
  toBase,
  arrayModifier,
  arrayModifierOld,
} from "./utilities";
import {
  chatMessage,
  chatSend,
  chatmetaimport,
  currentlyRequestedChatInput,
  evaluateChatColorType,
  patternColors,
  patternColorsMap,
  patternFunctionList,
  patternList,
  requestChatInput,
  requestConditionalChatInput,
} from "./chat";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import * as main from "../Main";
import * as transformrecipes from "Assets/constants/transformrecipes";
import * as coords from "./coordinates";
import * as cmds from "./commands";
import * as bans from "./ban";
import * as uis from "./ui";
import * as playersave from "./player_save";
import * as spawnprot from "./spawn_protection";
import * as chat from "./chat";
import * as cmdutils from "./command_utilities";
import * as utils from "./utilities";
import * as errors from "./errors";
import mcMath from "@minecraft/math.js";
import { uiManager, UIManager } from "@minecraft/server-ui";
import {
  getEntityById,
  getPlayer,
  type executeCommandPlayerW,
} from "./commands";
export const cmdutilsmetaimport = import.meta;
//globalThis.modules={main, coords, cmds, bans, uis, playersave, spawnprot, mcMath}
mcServer;
mcServerUi; /*
mcServerAdmin*/ /*
mcDebugUtilities*/ /*
mcCommon*/
GameTest; /*
mcVanillaData*/
main;
coords;
cmds;
bans;
uis;
playersave;
spawnprot;
mcMath;
export function targetSelector(
  selector: string,
  filters: string,
  UUID: number
) {
  let scoreboardUUID = Math.round(Math.random() * 100 + 50);
  world
    .getAllPlayers()
    .find(
      (currentlySelectedPlayerEntity) =>
        Number(currentlySelectedPlayerEntity.id) == UUID
    )
    .runCommand(
      "/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID
    );
  let selectedEntityUUIDValue = world.scoreboard
    .getObjective("andexdbDebug")
    .getScores()
    .find((score) => score.score == scoreboardUUID)
    .participant.getEntity().id;
  world
    .getAllPlayers()
    .find(
      (currentlySelectedPlayerEntity) =>
        Number(currentlySelectedPlayerEntity.id) == UUID
    )
    .runCommand(
      "/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0"
    );
  return Number(selectedEntityUUIDValue);
}
export function targetSelectorB(
  selector: string,
  filters: string,
  UUID: number
) {
  let scoreboardUUID = Math.round(Math.random() * 100 + 50);
  world
    .getAllPlayers()
    .find(
      (currentlySelectedPlayerEntity) =>
        Number(currentlySelectedPlayerEntity.id) == UUID
    )
    .runCommand(
      "/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID
    );
  let selectedEntityUUIDValue = world.scoreboard
    .getObjective("andexdbDebug")
    .getScores()
    .find((score) => score.score == scoreboardUUID)
    .participant.getEntity().id;
  world
    .getAllPlayers()
    .find(
      (currentlySelectedPlayerEntity) =>
        Number(currentlySelectedPlayerEntity.id) == UUID
    )
    .runCommand(
      "/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0"
    );
  return world
    .getDimension(
      DimensionTypes.getAll().find((dimension) =>
        world
          .getDimension(dimension.typeId)
          .getEntities()
          .find((entity) => entity.id == selectedEntityUUIDValue)
      ).typeId
    )
    .getEntities()
    .find((entity) => entity.id == selectedEntityUUIDValue);
}
export function targetSelectorAllListB(
  selector: string,
  filters: string,
  UUID: number
) {
  let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
  world
    .getAllPlayers()
    .find(
      (currentlySelectedPlayerEntity) =>
        Number(currentlySelectedPlayerEntity.id) == UUID
    )
    .runCommand(
      "/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID
    );
  let selectedEntity: Entity[];
  for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    selectedEntity.push(
      world.scoreboard
        .getObjective("andexdbDebug")
        .getScores()
        .filter((score) => score.score == scoreboardUUID)
        [i].participant.getEntity()
    );
  }
  world
    .getAllPlayers()
    .find(
      (currentlySelectedPlayerEntity) =>
        Number(currentlySelectedPlayerEntity.id) == UUID
    )
    .runCommand(
      "/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0"
    );
  return selectedEntity;
}
export function targetSelectorAllListC(
  selector: string,
  filters: string,
  position: string,
  sourceEntityCommandExecution?: Entity | Player
) {
  let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
  if (sourceEntityCommandExecution == undefined) {
    world
      .getAllPlayers()[0]
      .runCommand(
        "/execute positioned " +
          position +
          " as " +
          selector +
          filters +
          " at @s run /scoreboard players set @s andexdbDebug " +
          scoreboardUUID
      );
  } else {
    sourceEntityCommandExecution.runCommand(
      "/execute positioned " +
        position +
        " as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID
    );
  }
  let selectedEntity: Entity[];
  selectedEntity = [];
  for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    try {
      selectedEntity.push(
        world.scoreboard
          .getObjective("andexdbDebug")
          .getScores()
          .filter((score) => score.score == scoreboardUUID)
          [i].participant.getEntity()
      );
    } catch (e) {}
  }
  if (sourceEntityCommandExecution == undefined) {
    world
      .getAllPlayers()[0]
      .runCommand(
        "/execute positioned " +
          position +
          " as " +
          selector +
          filters +
          " at @s run /scoreboard players set @s andexdbDebug 0"
      );
  } else {
    sourceEntityCommandExecution.runCommand(
      "/execute as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0"
    );
  }
  return selectedEntity;
}
export function targetSelectorAllListD(
  selector: string,
  position: string,
  dimension: Dimension = world.getDimension("overworld")
) {
  let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
  dimension.runCommand(
    "/execute positioned " +
      position +
      " as " +
      selector +
      " at @s run /scoreboard players set @s andexdbDebug " +
      scoreboardUUID
  );
  let selectedEntity: Entity[];
  selectedEntity = [];
  for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    try {
      selectedEntity.push(
        world.scoreboard
          .getObjective("andexdbDebug")
          .getScores()
          .filter((score) => score.score == scoreboardUUID)
          [i].participant.getEntity()
      );
    } catch (e) {}
  }
  dimension.runCommand(
    "/execute as " +
      selector +
      " at @s run /scoreboard players set @s andexdbDebug 0"
  );
  return selectedEntity;
}
export function targetSelectorAllListE(selector: string, position: string) {
  let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
  DimensionTypes.getAll().forEach((dt) => {
    let dimension = world.getDimension(dt.typeId);
    dimension.runCommand(
      "/execute positioned " +
        position +
        " as " +
        selector +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID
    );
  });
  let selectedEntity: Entity[];
  selectedEntity = [];
  for (let i in world.scoreboard.getObjective("andexdbDebug").getScores()) {
    try {
      selectedEntity.push(
        world.scoreboard
          .getObjective("andexdbDebug")
          .getScores()
          .filter((score) => score.score == scoreboardUUID)
          [i].participant.getEntity()
      );
    } catch (e) {}
  }
  DimensionTypes.getAll().forEach((dt) => {
    let dimension = world.getDimension(dt.typeId);
    dimension.runCommand(
      "/execute as " +
        selector +
        " at @s run /scoreboard players set @s andexdbDebug 0"
    );
  });
  return selectedEntity;
}

export enum fillmodetypeenum {
  "" = "",
  "replace" = "replace",
  "fill" = "fill",
  "clear" = "clear",
  "drain" = "drain",
  "keep" = "durability",
  "walls" = "walls",
  "hollow" = "hollow",
  "outline" = "outline",
  "skygrid" = "skygrid",
  "inverseskygrid" = "inverseskygrid",
  "tunnel" = "tunnel",
  "floor" = "floor",
  "ceilling" = "ceilling",
  "diamond" = "diamond",
  "ovoid" = "ovoid",
  "hollowovoid" = "hollowovoid",
  "sphere" = "sphere",
  "semisphere" = "semisphere",
  "hollowsphere" = "hollowsphere",
  "dome" = "dome",
  "r" = "replace",
  "f" = "fill",
  "clr" = "clear",
  "dr" = "drain",
  "k" = "durability",
  "w" = "walls",
  "h" = "hollow",
  "o" = "outline",
  "sg" = "skygrid",
  "isg" = "inverseskygrid",
  "t" = "tunnel",
  "fl" = "floor",
  "ce" = "ceilling",
  "d" = "diamond",
  "ovd" = "ovoid",
  "hovd" = "hollowovoid",
  "hollowovd" = "hollowovoid",
  "hovoid" = "hollowovoid",
  "s" = "sphere",
  "ss" = "semisphere",
  "hs" = "hollowsphere",
  "dm" = "dome",
  "hsphere" = "hollowsphere",
  "hollows" = "hollowsphere",
  "circle" = "circle",
  "circlex" = "circlex",
  "circley" = "circley",
  "circlez" = "circlez",
  "circlexy" = "circlexy",
  "circleyz" = "circleyz",
  "circlexz" = "circlexz",
  "circlexyz" = "circlexyz",
  "circ" = "circle",
  "circx" = "circlex",
  "circy" = "circly",
  "circz" = "circlez",
  "circxy" = "circlexy",
  "circyz" = "circleyz",
  "circxz" = "circlexz",
  "circxyz" = "circlexyz",
  "c" = "circle",
  "cx" = "circlex",
  "cy" = "circly",
  "cz" = "circlez",
  "cxy" = "circlexy",
  "cyz" = "circleyz",
  "cxz" = "circlexz",
  "cxyz" = "circlexyz",
  "disc" = "circle",
  "discx" = "circlex",
  "discy" = "circly",
  "discz" = "circlez",
  "discxy" = "circlexy",
  "discyz" = "circleyz",
  "discxz" = "circlexz",
  "discxyz" = "circlexyz",
  "cylinder" = "cylinder",
  "cylinderx" = "cylinderx",
  "cylindery" = "cylindery",
  "cylinderz" = "cylinderz",
  "hourglass" = "hourglass",
  "cyl" = "cylinder",
  "cylx" = "cylinderx",
  "cyly" = "cylindery",
  "cylz" = "cylinderz",
  "cl" = "cylinder",
  "clx" = "cylinderx",
  "cly" = "cylindery",
  "clz" = "cylinderz",
  "hrgl" = "hourglass",
  "hrgs" = "hourglass",
  "cube" = "cube",
  "cu" = "cube",
  "cb" = "cube",
}

export enum componentTypeEnum {
  "enchantable" = "enchantable",
  "minecraft:enchantable" = "enchantable",
  "durability" = "durability",
  "minecraft:durability" = "durability",
  "damage" = "damage",
  "minecraft:damage" = "damage",
  "cooldown" = "cooldown",
  "minecraft:cooldown" = "cooldown",
  "food" = "food",
  "minecraft:food" = "food",
}
export enum enchantableComponentTypeEnum {
  "add" = "addEnchantment",
  "minecraft:add" = "addEnchantment",
  "addEnchantment" = "addEnchantment",
  "minecraft:addEnchantment" = "addEnchantment",
  "addList" = "addEnchantments",
  "minecraft:addList" = "addEnchantments",
  "addEnchantments" = "addEnchantments",
  "minecraft:addEnchantments" = "addEnchantments",
  "remove" = "removeEnchantment",
  "minecraft:remove" = "removeEnchantment",
  "removeEnchantments" = "removeEnchantment",
  "minecraft:removeEnchantments" = "removeEnchantment",
  "clear" = "removeAllEnchantments",
  "minecraft:clear" = "removeAllEnchantments",
  "clearAll" = "removeAllEnchantments",
  "minecraft:clearAll" = "removeAllEnchantments",
  "removeAll" = "removeAllEnchantments",
  "minecraft:removeAll" = "removeAllEnchantments",
  "removeAllEnchantments" = "removeAllEnchantments",
  "minecraft:removeAllEnchantments" = "removeAllEnchantments",
}
export enum durabilityComponentTypeEnum {
  "durability" = "durability",
  "minecraft:durability" = "durability",
  "setDurability" = "durability",
  "minecraft:setDurability" = "durability",
  "damage" = "damage",
  "minecraft:damage" = "damage",
  "setDamage" = "damage",
  "minecraft:setDamage" = "damage",
  "repair" = "repair",
  "minecraft:repair" = "repair",
  "setDurabilityToMax" = "setDurabilityToMax",
  "minecraft:setDurabilityToMax" = "setDurabilityToMax",
}
export enum propertyTypeEnum {
  "name" = "nameTag",
  "minecraft:name" = "nameTag",
  "nameTag" = "nameTag",
  "minecraft:nameTag" = "nameTag",
  "lore" = "lore",
  "minecraft:lore" = "lore",
  "description" = "lore",
  "minecraft:description" = "lore",
  "count" = "amount",
  "minecraft:count" = "amount",
  "amount" = "amount",
  "minecraft:amount" = "amount",
  "keepOnDeath" = "keepOnDeath",
  "minecraft:keepOnDeath" = "keepOnDeath",
  "keepondeath" = "keepOnDeath",
  "minecraft:keepondeath" = "keepOnDeath",
  "keep_on_death" = "keepOnDeath",
  "minecraft:keep_on_death" = "keepOnDeath",
  "lockMode" = "lockMode",
  "minecraft:lockMode" = "lockMode",
  "lockmode" = "lockMode",
  "minecraft:lockmode" = "lockMode",
  "lock_mode" = "lockMode",
  "minecraft:lock_mode" = "lockMode",
  "itemLockMode" = "lockMode",
  "minecraft:itemLockMode" = "lockMode",
  "itemlockmode" = "lockMode",
  "minecraft:itemlockmode" = "lockMode",
  "item_lock_mode" = "lockMode",
  "minecraft:item_lock_mode" = "lockMode",
  "canPlaceOn" = "canPlaceOn",
  "minecraft:canPlaceOn" = "canPlaceOn",
  "canplaceon" = "canPlaceOn",
  "minecraft:canplaceon" = "canPlaceOn",
  "can_place_on" = "canPlaceOn",
  "minecraft:can_place_on" = "canPlaceOn",
  "canDestroy" = "canDestroy",
  "minecraft:canDestroy" = "canDestroy",
  "candestroy" = "canDestroy",
  "minecraft:candestroy" = "canDestroy",
  "can_destroy" = "canDestroy",
  "minecraft:can_destroy" = "canDestroy",
  "components" = "components",
  "minecraft:components" = "components",
  "dynamicProperties" = "dynamicProperties",
  "minecraft:dynamicProperties" = "dynamicProperties",
  "dynamicproperties" = "dynamicProperties",
  "minecraft:dynamicproperties" = "dynamicProperties",
  "properties" = "dynamicProperties",
  "minecraft:properties" = "dynamicProperties",
  "itemProperties" = "dynamicProperties",
  "minecraft:itemProperties" = "dynamicProperties",
  "itemproperties" = "dynamicProperties",
  "minecraft:itemproperties" = "dynamicProperties",
  "clearAllDynamicProperties" = "clearDynamicProperties",
  "minecraft:clearAllDynamicProperties" = "clearDynamicProperties",
  "clearalldynamicproperties" = "clearDynamicProperties",
  "minecraft:clearalldynamicproperties" = "clearDynamicProperties",
  "clearDynamicProperties" = "clearDynamicProperties",
  "minecraft:clearDynamicProperties" = "clearDynamicProperties",
  "cleardynamicproperties" = "clearDynamicProperties",
  "minecraft:cleardynamicproperties" = "clearDynamicProperties",
  "removeDynamicProperties" = "removeDynamicProperties",
  "minecraft:removeDynamicProperties" = "removeDynamicProperties",
  "removedynamicproperties" = "removedynamicproperties",
  "minecraft:removedynamicproperties" = "removedynamicproperties",
  "removeDynamicProperty" = "removeDynamicProperty",
  "minecraft:removeDynamicProperty" = "removeDynamicProperty",
  "removedynamicproperty" = "removedynamicproperty",
  "minecraft:removedynamicproperty" = "removedynamicproperty",
}
//world.afterEvents.dataDrivenEntityTrigger.subscribe(event=>{if(event.getModifiers().find(v=>v.removedComponentGroups.includes("andexsa:entity_inventory_5_minecart_hopper"))){bsend(JSON.stringify(event.getModifiers()))}})
//world.afterEvents.dataDrivenEntityTrigger.subscribe(event=>{if(event.getModifiers().find(v=>v.removedComponentGroups.includes("andexsa:entity_inventory_5_minecart_hopper"))){event.getModifiers().find(v=>v.removedComponentGroups.includes("andexsa:entity_inventory_5_minecart_hopper")).removedComponentGroups=[]; event.getModifiers().find(v=>v.removedComponentGroups.includes("andexsa:entity_inventory_5_minecart_hopper")).addedComponentGroups=["andexsa:entity_inventory_5_minecart_hopper"]; bsend(JSON.stringify(event.getModifiers().))}})
export interface ItemJSONParseInput {
  name?: string;
  "minecraft:name"?: string;
  nameTag?: string;
  "minecraft:nameTag"?: string;
  lore?: string[];
  "minecraft:lore"?: string[];
  description?: string[];
  "minecraft:description"?: string[];
  count?: number;
  "minecraft:count"?: number;
  amount?: number;
  "minecraft:amount"?: number;
  keepOnDeath?: boolean;
  "minecraft:keepOnDeath"?: boolean;
  keepondeath?: boolean;
  "minecraft:keepondeath"?: boolean;
  keep_on_death?: boolean;
  "minecraft:keep_on_death"?: boolean;
  lockMode?: ItemLockMode;
  "minecraft:lockMode"?: ItemLockMode;
  lockmode?: ItemLockMode;
  "minecraft:lockmode"?: ItemLockMode;
  lock_mode?: ItemLockMode;
  "minecraft:lock_mode"?: ItemLockMode;
  itemLockMode?: ItemLockMode;
  "minecraft:itemLockMode"?: ItemLockMode;
  itemlockmode?: ItemLockMode;
  "minecraft:itemlockmode"?: ItemLockMode;
  item_lock_mode?: ItemLockMode;
  "minecraft:item_lock_mode"?: ItemLockMode;
  canPlaceOn?: string[];
  "minecraft:canPlaceOn"?: string[];
  canplaceon?: string[];
  "minecraft:canplaceon"?: string[];
  can_place_on?: string[];
  "minecraft:can_place_on"?: string[];
  canDestroy?: string[];
  "minecraft:canDestroy"?: string[];
  candestroy?: string[];
  "minecraft:candestroy"?: string[];
  can_destroy?: string[];
  "minecraft:can_destroy"?: string[];
  components?: {
    enchantable?: {
      add?: Enchantment | Enchantment[];
      "minecraft:add"?: Enchantment | Enchantment[];
      addEnchantment?: Enchantment | Enchantment[];
      "minecraft:addEnchantment"?: Enchantment | Enchantment[];
      addList?: Enchantment[];
      "minecraft:addList"?: Enchantment[];
      addEnchantments?: Enchantment[];
      "minecraft:addEnchantments"?: Enchantment[];
      remove?: Enchantment;
      "minecraft:remove"?: Enchantment;
      removeEnchantments?: Enchantment;
      "minecraft:removeEnchantments"?: Enchantment;
      clear?: any;
      "minecraft:clear"?: any;
      clearAll?: any;
      "minecraft:clearAll"?: any;
      removeAll?: any;
      "minecraft:removeAll"?: any;
      removeAllEnchantments?: any;
      "minecraft:removeAllEnchantments"?: any;
    };
    "minecraft:enchantable"?: {
      add?: Enchantment | Enchantment[];
      "minecraft:add"?: Enchantment | Enchantment[];
      addEnchantment?: Enchantment | Enchantment[];
      "minecraft:addEnchantment"?: Enchantment | Enchantment[];
      addList?: Enchantment[];
      "minecraft:addList"?: Enchantment[];
      addEnchantments?: Enchantment[];
      "minecraft:addEnchantments"?: Enchantment[];
      remove?: Enchantment;
      "minecraft:remove"?: Enchantment;
      removeEnchantments?: Enchantment;
      "minecraft:removeEnchantments"?: Enchantment;
      clear?: any;
      "minecraft:clear"?: any;
      clearAll?: any;
      "minecraft:clearAll"?: any;
      removeAll?: any;
      "minecraft:removeAll"?: any;
      removeAllEnchantments?: any;
      "minecraft:removeAllEnchantments"?: any;
    };
    durability?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    "minecraft:durability"?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    damage?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    "minecraft:damage"?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    cooldown?: any;
    "minecraft:cooldown"?: any;
    food?: any;
    "minecraft:food"?: any;
  };
  "minecraft:components"?: {
    enchantable?: {
      add?: Enchantment | Enchantment[];
      "minecraft:add"?: Enchantment | Enchantment[];
      addEnchantment?: Enchantment | Enchantment[];
      "minecraft:addEnchantment"?: Enchantment | Enchantment[];
      addList?: Enchantment[];
      "minecraft:addList"?: Enchantment[];
      addEnchantments?: Enchantment[];
      "minecraft:addEnchantments"?: Enchantment[];
      remove?: Enchantment;
      "minecraft:remove"?: Enchantment;
      removeEnchantments?: Enchantment;
      "minecraft:removeEnchantments"?: Enchantment;
      clear?: any;
      "minecraft:clear"?: any;
      clearAll?: any;
      "minecraft:clearAll"?: any;
      removeAll?: any;
      "minecraft:removeAll"?: any;
      removeAllEnchantments?: any;
      "minecraft:removeAllEnchantments"?: any;
    };
    "minecraft:enchantable"?: {
      add?: Enchantment | Enchantment[];
      "minecraft:add"?: Enchantment | Enchantment[];
      addEnchantment?: Enchantment | Enchantment[];
      "minecraft:addEnchantment"?: Enchantment | Enchantment[];
      addList?: Enchantment[];
      "minecraft:addList"?: Enchantment[];
      addEnchantments?: Enchantment[];
      "minecraft:addEnchantments"?: Enchantment[];
      remove?: Enchantment;
      "minecraft:remove"?: Enchantment;
      removeEnchantments?: Enchantment;
      "minecraft:removeEnchantments"?: Enchantment;
      clear?: any;
      "minecraft:clear"?: any;
      clearAll?: any;
      "minecraft:clearAll"?: any;
      removeAll?: any;
      "minecraft:removeAll"?: any;
      removeAllEnchantments?: any;
      "minecraft:removeAllEnchantments"?: any;
    };
    durability?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    "minecraft:durability"?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    damage?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    "minecraft:damage"?: {
      durability?: number;
      "minecraft:durability"?: number;
      setDurability?: number;
      "minecraft:setDurability"?: number;
      damage?: number;
      "minecraft:damage"?: number;
      setDamage?: number;
      "minecraft:setDamage"?: number;
      repair?: number;
      "minecraft:repair"?: number;
      setDurabilityToMax?: any;
      "minecraft:setDurabilityToMax"?: any;
    };
    cooldown?: any;
    "minecraft:cooldown"?: any;
    food?: any;
    "minecraft:food"?: any;
  };
  force?: boolean;
  source?: {
    type?: string;
    targetSelector?: string;
    targetSelectorExecutionLocation?: DimensionLocation;
    targetSelectorSourceEntity?: Entity;
    player?: string;
    entityAtBlock?: DimensionLocation;
    entityType?: string;
    entityTypeId?: string;
    entityId?: string | number;
    block?: DimensionLocation;
    slot?: number;
    id?: string;
    itemId?: string;
    count?: number;
    amount?: number;
  };
  type?: string;
  id?: string;
  itemId?: string;
  new?: [string, number?];
  dynamicProperties?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  dynamicproperties?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  properties?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  itemproperties?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  itemProperties?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  clearAllDynamicProperties?: any;
  clearDynamicProperties?: any;
  clearalldynamicproperties?: any;
  cleardynamicproperties?: any;
  removeDynamicProperties?: string[];
  removedynamicproperties?: string[];
  removeDynamicProperty?: string;
  removedynamicproperty?: string;
  "minecraft:dynamicProperties"?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  "minecraft:dynamicproperties"?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  "minecraft:properties"?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  "minecraft:itemProperties"?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  "minecraft:itemproperties"?:
    | [string, string | number | boolean | Vector3 | undefined][]
    | Record<string, string | number | boolean | Vector3 | undefined>
    | { [k: string]: string | number | boolean | Vector3 | undefined };
  "minecraft:clearAllDynamicProperties"?: any;
  "minecraft:clearDynamicProperties"?: any;
  "minecraft:clearalldynamicproperties"?: any;
  "minecraft:cleardynamicproperties"?: any;
  "minecraft:removeDynamicProperties"?: string[];
  "minecraft:removedynamicproperties"?: string[];
  "minecraft:removeDynamicProperty"?: string;
  "minecraft:removedynamicproperty"?: string;
}

export function itemJSONPropertiesEval(
  itemJSON: ItemJSONParseInput,
  StartingItem?: ItemStack | ContainerSlot,
  player?: Player | executeCommandPlayerW
) {
  /*
    let item = {getComponent: (string)=>(string=="enchantable"?{addEnchantment: (enchantment)=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull"), addEnchantments: (enchantments)=>(enchantments.forEach(enchantment=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull")))}:"somethingelse")}*/

  let ij = itemJSON;
  ij.force ??= false;
  let sp = player as Player;
  let item = !!ij.new
    ? new ItemStack(ij.new[0], ij.new[1])
    : (!!StartingItem
        ? StartingItem instanceof ContainerSlot
          ? StartingItem.getItem()
          : StartingItem instanceof ItemStack
          ? StartingItem
          : undefined
        : undefined) ??
      (!!ij.source
        ? ij.source.type == "slot"
          ? (!!ij.source.targetSelector
              ? (!!ij.source.targetSelectorExecutionLocation
                  ? targetSelectorAllListD(
                      ij.source.targetSelector,
                      ij.source.targetSelectorExecutionLocation.x +
                        " " +
                        ij.source.targetSelectorExecutionLocation.y +
                        " " +
                        ij.source.targetSelectorExecutionLocation.z,
                      ij.source.targetSelectorExecutionLocation.dimension
                    )[0]
                  : targetSelectorAllListC(
                      ij.source.targetSelector,
                      "",
                      ij.source.targetSelectorSourceEntity.location.x +
                        " " +
                        ij.source.targetSelectorSourceEntity.location.y +
                        " " +
                        ij.source.targetSelectorSourceEntity.location.z,
                      ij.source.targetSelectorSourceEntity
                    )[0]
                )?.getComponent?.("inventory")
              : !!ij.source.entityId
              ? getEntityById(ij.source.entityId)?.getComponent?.("inventory")
              : !!ij.source.player
              ? getPlayer(ij.source.player)?.getComponent?.("inventory")
              : !!ij.source.entityAtBlock
              ? ij.source.entityAtBlock.dimension
                  .getEntitiesAtBlockLocation(ij.source.entityAtBlock)
                  .find(
                    (v) =>
                      v.typeId ==
                      (ij.source.entityTypeId ?? ij.source.entityType)
                  )
                  ?.getComponent?.("inventory")
              : !!ij.source.block
              ? ij.source.block.dimension
                  .getBlock(ij.source.block)
                  ?.getComponent?.("inventory")
              : sp?.getComponent?.("inventory")
            )?.container?.getItem(ij.source.slot ?? 0)
          : new ItemStack(ij.source.id, ij.source.count ?? ij.source.amount)
        : new ItemStack(
            ij?.id ?? ij?.type ?? ij?.itemId,
            ij?.count ?? ij?.amount
          )); /*
    if(!!ij.new){item=new ItemStack(ij.new[0], ij.new[1])}*/

  const itemPropertyEnum = {
    components: (property: [string, any]) =>
      Object.entries(property[1]).forEach((vb) =>
        itemComponentEnum[componentTypeEnum[vb[0]]](vb)
      ),
    nameTag: (property: [string, any]) =>
      property[1] !== item.nameTag || ij.force
        ? (item.nameTag = property[1])
        : false,
    lore: (property: [string, string[] | undefined | null]) =>
      property[1] !== item.getLore() || ij.force
        ? item.setLore(property[1])
        : false,
    amount: (property: [string, number]) =>
      property[1] != item.amount || ij.force
        ? (item.amount = property[1])
        : false,
    keepOnDeath: (property: [string, boolean]) =>
      property[1] != item.keepOnDeath || ij.force
        ? (item.keepOnDeath = property[1])
        : false,
    lockMode: (property: [string, ItemLockMode]) =>
      property[1] != item.lockMode || ij.force
        ? (item.lockMode = property[1])
        : false,
    canPlaceOn: (property: [string, string[] | undefined | null]) =>
      property[1] !== item.getCanPlaceOn() || ij.force
        ? item.setCanPlaceOn(property[1])
        : false,
    canDestroy: (property: [string, string[] | undefined | null]) =>
      property[1] !== item.getCanDestroy() || ij.force
        ? item.setCanDestroy(property[1])
        : false,
    dynamicProperties: (
      property: [
        string,
        (
          | [string, string | number | boolean | Vector3 | undefined][]
          | Record<string, string | number | boolean | Vector3 | undefined>
        )
      ]
    ) =>
      property[1] instanceof Array
        ? (
            property[1] as [string, string | number | boolean | Vector3][]
          ).forEach((vc) => item.setDynamicProperty(vc[0], vc[1]))
        : Object.entries(
            property[1] as Record<string, string | number | boolean | Vector3>
          ).forEach((vc) => item.setDynamicProperty(vc[0], vc[1])),
    clearDynamicProperties: (property: [string, any]) =>
      item.clearDynamicProperties(),
    removeDynamicProperties: (property: [string, string[]]) =>
      property[1].forEach((v) => item.setDynamicProperty(v)),
    removeDynamicProperty: (property: [string, string]) =>
      item.setDynamicProperty(property[1]),
  };
  const itemComponentEnum = {
    enchantable: (property: [string, object]) =>
      Object.entries(property[1]).forEach((vc) =>
        itemEnchantableComponentEnum[enchantableComponentTypeEnum[vc[0]]](vc)
      ),
    durability: (property: [string, any]) =>
      typeof property[1] == "number"
        ? (item.getComponent("durability").damage =
            item.getComponent("durability").maxDurability - property[1])
        : Object.entries(property[1]).forEach((v) =>
            itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v[1])
          ),
    damage: (property: [string, any]) =>
      typeof property[1] == "number"
        ? (item.getComponent("durability").damage = property[1])
        : Object.entries(property[1]).forEach((v) =>
            itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v)
          ),
    food: (property?: [string, any]) => {},
    cooldown: (property?: [string, any]) => {},
  };
  const itemEnchantableComponentEnum = {
    addEnchantment: (property: [string, any]) =>
      property[1] instanceof Array
        ? item
            .getComponent("enchantable")
            .addEnchantments(
              property[1].map((v) => ({
                level: v.level,
                type: EnchantmentTypes.get(v.type),
              }))
            )
        : item
            .getComponent("enchantable")
            .addEnchantment({
              level: property[1].level,
              type: EnchantmentTypes.get(property[1].type),
            }),
    addEnchantments: (property: [string, any]) =>
      item
        .getComponent("enchantable")
        .addEnchantments(
          property[1].map((v) => ({
            level: v.level,
            type: EnchantmentTypes.get(v.type),
          }))
        ),
    removeEnchantment: (property: [string, any]) =>
      property[1] instanceof Array
        ? property[1].forEach((v) =>
            item.getComponent("enchantable").removeEnchantment(v)
          )
        : item.getComponent("enchantable").removeEnchantment(property[1]),
    removeAllEnchantments: (property: [string, any]) =>
      item.getComponent("enchantable").removeAllEnchantments(),
  };
  const itemDurabilityComponentEnum = {
    durability: (property: [string, number]) =>
      (item.getComponent("durability").damage =
        item.getComponent("durability").maxDurability - property[1]),
    damage: (property: [string, number]) =>
      (item.getComponent("durability").damage = property[1]),
    repair: (property: [string, number]) =>
      typeof property[1] == "number"
        ? (item.getComponent("durability").damage = Math.max(
            0,
            item.getComponent("durability").damage - property[1]
          ))
        : (item.getComponent("durability").damage = 0),
    setDurabilityToMax: (property: [string, any]) =>
      (item.getComponent("durability").damage = 0),
  };
  Object.entries(ij)
    .filter(
      (v) => !["force", "source", "id", "type", "itemId", "new"].includes(v[0])
    )
    .forEach((va) => itemPropertyEnum[propertyTypeEnum[va[0]]](va));
  return item;
  /*

    ij = {name: "sazx", components: {enchantable: {add: [{type: "fire_aspect", level: 2}, {type: "sharpness", level: 5}, {type: "looting", level: 3}, {type: "knockback", level: 2}]}}}*/
}

export function itemJSONPropertiesEvalCT(
  itemJSON: ItemJSONParseInput,
  containerSlot?: ContainerSlot,
  player?: Player | executeCommandPlayerW
) {
  /*
    let item = {getComponent: (string)=>(string=="enchantable"?{addEnchantment: (enchantment)=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull"), addEnchantments: (enchantments)=>(enchantments.forEach(enchantment=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull")))}:"somethingelse")}*/

  let ij = itemJSON;
  ij.force ??= false;
  let sp = player;
  let item = containerSlot;
  if (!!ij.new) {
    item.setItem(new ItemStack(ij.new[0], ij.new[1]));
  }

  const itemPropertyEnum = {
    components: (property: [string, any]) =>
      Object.entries(property[1]).forEach((vb) =>
        itemComponentEnum[componentTypeEnum[vb[0]]](vb)
      ),
    nameTag: (property: [string, any]) =>
      property[1] !== item.nameTag || ij.force
        ? (item.nameTag = property[1])
        : false,
    lore: (property: [string, string[] | undefined | null]) =>
      property[1] !== item.getLore() || ij.force
        ? item.setLore(property[1])
        : false,
    amount: (property: [string, number]) =>
      property[1] != item.amount || ij.force
        ? (item.amount = property[1])
        : false,
    keepOnDeath: (property: [string, boolean]) =>
      property[1] != item.keepOnDeath || ij.force
        ? (item.keepOnDeath = property[1])
        : false,
    lockMode: (property: [string, ItemLockMode]) =>
      property[1] != item.lockMode || ij.force
        ? (item.lockMode = property[1])
        : false,
    canPlaceOn: (property: [string, string[] | undefined | null]) =>
      property[1] !== item.getCanPlaceOn() || ij.force
        ? item.setCanPlaceOn(property[1])
        : false,
    canDestroy: (property: [string, string[] | undefined | null]) =>
      property[1] !== item.getCanDestroy() || ij.force
        ? item.setCanDestroy(property[1])
        : false,
    dynamicProperties: (
      property: [
        string,
        (
          | [string, string | number | boolean | Vector3 | undefined][]
          | Record<string, string | number | boolean | Vector3 | undefined>
        )
      ]
    ) =>
      property[1] instanceof Array
        ? (
            property[1] as [string, string | number | boolean | Vector3][]
          ).forEach((vc) => item.setDynamicProperty(vc[0], vc[1]))
        : Object.entries(
            property[1] as Record<string, string | number | boolean | Vector3>
          ).forEach((vc) => item.setDynamicProperty(vc[0], vc[1])),
    clearDynamicProperties: (property: [string, any]) =>
      item.clearDynamicProperties(),
    removeDynamicProperties: (property: [string, string[]]) =>
      property[1].forEach((v) => item.setDynamicProperty(v)),
    removeDynamicProperty: (property: [string, string]) =>
      item.setDynamicProperty(property[1]),
  };
  const itemComponentEnum = {
    enchantable: (property: [string, any]) =>
      Object.entries(property[1]).forEach((vc) =>
        itemEnchantableComponentEnum[enchantableComponentTypeEnum[vc[0]]](vc)
      ),
    durability: (property: [string, any]) =>
      typeof property[1] == "number"
        ? (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage =
              itemb.getComponent("durability").maxDurability - property[1];
            item.setItem(itemb);
          })()
        : Object.entries(property[1]).forEach((v) =>
            itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v[1])
          ),
    damage: (property: [string, any]) =>
      typeof property[1] == "number"
        ? (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = property[1];
            item.setItem(itemb);
          })()
        : Object.entries(property[1]).forEach((v) =>
            itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0]]](v)
          ),
    food: (property?: [string, any]) => {},
    cooldown: (property?: [string, any]) => {},
  };
  const itemEnchantableComponentEnum = {
    addEnchantment: (property: [string, any]) =>
      property[1] instanceof Array
        ? (() => {
            let itemb = item.getItem();
            itemb
              .getComponent("enchantable")
              .addEnchantments(
                property[1].map((v) => ({
                  level: v.level,
                  type: EnchantmentTypes.get(v.type),
                }))
              );
            item.setItem(itemb);
          })()
        : (() => {
            let itemb = item.getItem();
            itemb
              .getComponent("enchantable")
              .addEnchantment({
                level: property[1].level,
                type: EnchantmentTypes.get(property[1].type),
              });
            item.setItem(itemb);
          })(),
    addEnchantments: (property: [string, any]) =>
      (() => {
        let itemb = item.getItem();
        itemb
          .getComponent("enchantable")
          .addEnchantments(
            property[1].map((v) => ({
              level: v.level,
              type: EnchantmentTypes.get(v.type),
            }))
          );
        item.setItem(itemb);
      })(),
    removeEnchantment: (property: [string, any]) =>
      property[1] instanceof Array
        ? property[1].forEach((v) =>
            (() => {
              let itemb = item.getItem();
              itemb.getComponent("enchantable").removeEnchantment(v);
              item.setItem(itemb);
            })()
          )
        : (() => {
            let itemb = item.getItem();
            itemb.getComponent("enchantable").removeEnchantment(property[1]);
            item.setItem(itemb);
          })(),
    removeAllEnchantments: (property: [string, any]) =>
      (() => {
        let itemb = item.getItem();
        itemb.getComponent("enchantable").removeAllEnchantments();
        item.setItem(itemb);
      })(),
  };
  const itemDurabilityComponentEnum = {
    durability: (property: [string, number]) =>
      (() => {
        let itemb = item.getItem();
        itemb.getComponent("durability").damage =
          itemb.getComponent("durability").maxDurability - property[1];
        item.setItem(itemb);
      })(),
    damage: (property: [string, number]) =>
      (() => {
        let itemb = item.getItem();
        itemb.getComponent("durability").damage = property[1];
        item.setItem(itemb);
      })(),
    repair: (property: [string, number]) =>
      typeof property[1] == "number"
        ? (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = Math.max(
              0,
              itemb.getComponent("durability").damage - property[1]
            );
            item.setItem(itemb);
          })()
        : (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = 0;
            item.setItem(itemb);
          })(),
    setDurabilityToMax: (property: [string, any]) =>
      (() => {
        let itemb = item.getItem();
        itemb.getComponent("durability").damage = 0;
        item.setItem(itemb);
      })(),
  };
  Object.entries(ij)
    .filter(
      (v) => !["force", "source", "id", "type", "itemId", "new"].includes(v[0])
    )
    .forEach((va) => itemPropertyEnum[propertyTypeEnum[va[0]]](va));
  return item;
  /*

    ij = {name: "sazx", components: {enchantable: {add: [{type: "fire_aspect", level: 2}, {type: "sharpness", level: 5}, {type: "looting", level: 3}, {type: "knockback", level: 2}]}}}*/
}

export function rangeToIntArray(range: [number, number]) {
  let array = [] as number[];
  for (let i = range[0]; i < range[1]; i++) {
    array.push(i);
  }
  return array;
}

export function inventorySwap(
  player1: Player | executeCommandPlayerW | Entity,
  player2: Player | executeCommandPlayerW | Entity
) {
  for (let i = 0; i < 36; i++) {
    player1
      .getComponent("inventory")
      .container.swapItems(i, i, player2.getComponent("inventory").container);
  }
  let slots = [
    EquipmentSlot.Head,
    EquipmentSlot.Chest,
    EquipmentSlot.Legs,
    EquipmentSlot.Feet,
    EquipmentSlot.Offhand,
  ];
  for (let i = 0; i < 5; i++) {
    let item1 = player1.getComponent("equippable").getEquipment(slots[i]);
    let item2 = player2.getComponent("equippable").getEquipment(slots[i]);
    player1.getComponent("equippable").setEquipment(slots[i], item2);
    player2.getComponent("equippable").setEquipment(slots[i], item1);
  }
}
export function inventorySwapB(player1: Container, player2: Container) {
  for (let i = 0; i < 36; i++) {
    player1.swapItems(i, i, player2);
  }
}
export function inventorySwapC(
  player1: Container,
  player2: Container,
  player1indices: [number, number] = [0, 27],
  player2indices: [number, number] = [0, 27]
) {
  for (
    let i = 0;
    i <
    Math.min(
      player1indices[1] - player1indices[0],
      player2indices[1] - player2indices[0]
    );
    i++
  ) {
    player1.swapItems(i + player1indices[0], i + player2indices[0], player2);
  }
}
export function clearContainer(container: Container) {
  for (let i = 0; i < container.size; i++) {
    container.setItem(i);
  }
}
export function fillContainer(container: Container, item: ItemStack) {
  for (let i = 0; i < container.size; i++) {
    container.setItem(i, item);
  }
}
export function containerToItemStackArray(container: Container) {
  let itemList = [] as ItemStack[];
  for (let i = 0; i < container.size; i++) {
    itemList.push(container.getItem(i));
  }
  return itemList;
}
export function containerToContainerSlotArray(container: Container) {
  let itemList = [] as ContainerSlot[];
  for (let i = 0; i < container.size; i++) {
    itemList.push(container.getSlot(i));
  }
  return itemList;
}
export function equippableToItemStackArray(
  equippable: EntityEquippableComponent,
  includeMainhand: boolean = false
) {
  let itemList = [] as ItemStack[];
  for (let i = 0; i < 5 + Number(includeMainhand); i++) {
    itemList.push(
      equippable?.getEquipment(
        includeMainhand ? EquipmentSlots[i] : OtherEquipmentSlots[i]
      )
    );
  }
  return itemList;
}
export function equippableToContainerSlotArray(
  equippable: EntityEquippableComponent,
  includeMainhand: boolean = false
) {
  let itemList = [] as ContainerSlot[];
  for (let i = 0; i < 5 + Number(includeMainhand); i++) {
    itemList.push(
      equippable?.getEquipmentSlot(
        includeMainhand ? EquipmentSlots[i] : OtherEquipmentSlots[i]
      )
    );
  }
  return itemList;
}
export function entityToItemStackArray(
  entity: Entity,
  getContainer: boolean = true,
  getEquipment: boolean = true
) {
  let itemList = [] as ItemStack[];
  let container = entity.getComponent("inventory")?.container;
  let equipment = entity.getComponent("equippable");
  for (let i = 0; i < (container?.size ?? 0); i++) {
    itemList.push(container.getItem(i));
  }
  for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
    itemList.push(equipment?.getEquipment(OtherEquipmentSlots[i]));
  }
  return itemList;
}
export function blockToItemStackArray(block: Block) {
  let itemList = [] as ItemStack[];
  let container = block.getComponent("inventory")?.container;
  for (let i = 0; i < container.size; i++) {
    itemList.push(container.getItem(i));
  }
  return itemList;
}
export function entityToContainerSlotArray(
  entity: Entity,
  getContainer: boolean = true,
  getEquipment: boolean = true
) {
  let itemList = [] as ContainerSlot[];
  let container = entity.getComponent("inventory")?.container;
  let equipment = entity.getComponent("equippable");
  for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
    itemList.push(container.getSlot(i));
  }
  for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
    itemList.push(equipment?.getEquipmentSlot(OtherEquipmentSlots[i]));
  }
  return !!container || !!equipment ? itemList : undefined;
}
export function blockToContainerSlotArray(block: Block) {
  let itemList = [] as ContainerSlot[];
  let container = block.getComponent("inventory")?.container;
  for (let i = 0; i < (container?.size ?? 0); i++) {
    itemList.push(container.getSlot(i));
  }
  return !!container ? itemList : undefined;
}
export function entityToContainerSlotListObject(
  entity: Entity,
  getContainer: boolean = true,
  getEquipment: boolean = true
) {
  let itemList = {} as Record<string, ContainerSlot>;
  let container = entity.getComponent("inventory")?.container;
  let equipment = entity.getComponent("equippable");
  for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
    itemList[String(i)] = container.getSlot(i);
  }
  for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
    itemList[String(OtherEquipmentSlots[i])] = equipment?.getEquipmentSlot(
      OtherEquipmentSlots[i]
    );
  }
  return !!container || !!equipment ? itemList : undefined;
}
export function blockToContainerSlotListObject(block: Block) {
  let itemList = {} as Record<string, ContainerSlot>;
  let container = block.getComponent("inventory")?.container;
  for (let i = 0; i < (container?.size ?? 0); i++) {
    itemList[String(i)] = container.getSlot(i);
  }
  return !!container ? itemList : undefined;
}
export function entityToContainerSlotArrayB(
  entity: Entity,
  getContainer: boolean = true,
  getEquipment: boolean = true
) {
  let itemList = [] as ContainerSlot[];
  let itemListB = [] as ContainerSlot[];
  let container = entity.getComponent("inventory")?.container;
  let equipment = entity.getComponent("equippable");
  for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
    itemList.push(container.getSlot(i));
  }
  for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
    itemListB.push(equipment?.getEquipmentSlot(OtherEquipmentSlots[i]));
  }
  return !!container || !!equipment
    ? { inventory: itemList, equipment: itemListB }
    : undefined;
}
export function getPlayerselectedSlotIndex(
  player: Player | executeCommandPlayerW
) {
  return player
    .getComponent("inventory")
    .container.getSlot(player.selectedSlotIndex);
}
export function getInventory<T extends Block | Entity | Player>(
  containerBlockPlayerOrEntity: T
) {
  return (
    containerBlockPlayerOrEntity instanceof Block
      ? containerBlockPlayerOrEntity.getComponent("inventory")
      : (containerBlockPlayerOrEntity as Entity | Player).getComponent(
          "inventory"
        )
  ) as T extends Block ? BlockInventoryComponent : EntityInventoryComponent;
}
export function getEquipment(
  containerBlockPlayerOrEntity: Entity | executeCommandPlayerW | Player
) {
  return containerBlockPlayerOrEntity.getComponent("equippable");
}
export function getEntityHeldItemSlot(entity: Entity) {
  return entity
    .getComponent("equippable")
    .getEquipmentSlot(EquipmentSlot.Mainhand);
}
export function getPlayerHeldItemSlot(player: Player | executeCommandPlayerW) {
  return player
    .getComponent("inventory")
    .container.getSlot(player.selectedSlotIndex);
}
export const EquipmentSlots = [
  EquipmentSlot.Head,
  EquipmentSlot.Chest,
  EquipmentSlot.Legs,
  EquipmentSlot.Feet,
  EquipmentSlot.Mainhand,
  EquipmentSlot.Offhand,
] as const;
export const OtherEquipmentSlots = [
  EquipmentSlot.Head,
  EquipmentSlot.Chest,
  EquipmentSlot.Legs,
  EquipmentSlot.Feet,
  EquipmentSlot.Offhand,
] as const;
export const JunkItemTypes = [
  "dirt",
  "stick",
  "deadbush",
  "tripwire_hook",
  "rotten_flesh",
  "string",
  "cobblestone",
  "stone",
  "diorite",
  "andesite",
  "granite",
  "tuff",
  "end_stone",
  "wheat_seeds",
  "tallgrass",
  "leather_helmet",
  "leather_boots",
  "leather_chestplate",
  "leather_leggings",
  "wooden_sword",
  "wooden_axe",
  "wooden_pickaxe",
  "wooden_shovel",
  "wooden_hoe",
  "spider_eye",
];
export const OpItemTypes = [
  "diamond",
  "netherite_ingot",
  "gold_ingot",
  "iron_ingot",
  "diamond_sword",
  "diamond_chestplate",
  "diamond_helmet",
  "diamond_leggings",
  "diamond_boots",
  "diamond_pickaxe",
  "diamond_shovel",
  "diamond_hoe",
  "diamond_block",
];
export const IllegalItemTypes = [
  "netherreactor",
  "glowingobsidian",
  "stonecutter",
  "water",
  "flowing_water",
  "lava",
  "flowing_lava",
  "camera",
  "item.camera",
  "item.skull",
  "item.cauldron",
  "bedrock",
];
export function parseSlot(slot: string, selectedSlotIndex?: number) {
  return (
    [
      EquipmentSlot.Head,
      EquipmentSlot.Chest,
      EquipmentSlot.Legs,
      EquipmentSlot.Feet,
      EquipmentSlot.Mainhand,
      EquipmentSlot.Offhand,
    ][
      [
        "head",
        "chest",
        "legs",
        "feet",
        "mainhand",
        "offhand",
        "helmet",
        "chestplate",
        "leggings",
        "boots",
        "hand",
        "otherhand",
        "cap",
        "tunic",
        "pants",
        "shoes",
        "righthand",
        "lefthand",
        "hat",
        "shirt",
        "shorts",
        "sandals",
        "firsthand",
        "secondaryhand",
      ].findIndex((v) => v == tryget(() => slot?.trim()?.toLowerCase())) % 6
    ] ??
    (tryget(() => slot?.trim()) == "cursor" ? "cursor" : undefined) ??
    ((tryget(() => slot?.trim()) == "~" || tryget(() => slot?.trim()) == "") &&
    !!!selectedSlotIndex
      ? "~"
      : Number(tryget(() => slot?.trim()) ?? slot))
  );
}
export function getSlotFromParsedSlot(
  slot: "~" | "cursor" | EquipmentSlot | number,
  options?: {
    container?: Container;
    equipment?: EntityEquippableComponent;
    cursor?: PlayerCursorInventoryComponent;
    selectedSlotIndex?: number;
  }
) {
  if (typeof slot == "string") {
    return slot.trim() == "~"
      ? !!options?.selectedSlotIndex
        ? options?.container?.getSlot(Number(options?.selectedSlotIndex))
        : !!options?.equipment
        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand)
        : undefined
      : slot.trim() == "cursor"
      ? !!options?.cursor
        ? options?.cursor
        : undefined
      : !!options?.equipment
      ? slot.trim().toLowerCase() == "head"
        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Head)
        : slot.trim().toLowerCase() == "chest"
        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Chest)
        : slot.trim().toLowerCase() == "legs"
        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Legs)
        : slot.trim().toLowerCase() == "feet"
        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Feet)
        : slot.trim().toLowerCase() == "mainhand"
        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand)
        : slot.trim().toLowerCase() == "offhand"
        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Offhand)
        : !Number.isNaN(Number(slot))
        ? options?.container?.getSlot(Number(slot))
        : undefined
      : !Number.isNaN(Number(slot))
      ? options?.container?.getSlot(Number(slot))
      : undefined;
  } else if (typeof slot == "number") {
    return options?.container?.getSlot(Number(slot));
  } else return options?.container?.getSlot(Number(slot));
}
