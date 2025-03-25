import { ContainerSlot, Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import type { ItemJSONParseInput } from "../enums/ItemJSONParseInput";
export declare function itemJSONPropertiesEvalCT(itemJSON: ItemJSONParseInput, containerSlot?: ContainerSlot, player?: Player | executeCommandPlayerW): ContainerSlot;
