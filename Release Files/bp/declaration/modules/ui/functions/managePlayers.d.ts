import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
export declare function managePlayers(sourceEntity: loosePlayerType, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}, cachedPlayers?: [online: savedPlayer[], offline: savedPlayer[], banned: savedPlayer[]]): Promise<0 | 1>;
