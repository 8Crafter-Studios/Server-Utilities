export declare let mutes: {
    [playerName: string]: muteData;
};
export interface muteData {
    unmuteDate: number | null;
    muteDate: number;
    mutedById: string | null;
    mutedByName: string | null;
    reason: string | null;
}
export declare class ModerationActions {
    static mutePlayer(playerName: string, options?: {
        unmuteDate?: number;
        muteDate?: number;
        mutedById?: string;
        mutedByName?: string;
        reason?: string;
    }): void;
    static unmutePlayer(playerName: string): void;
    static getMuteData(playerName: string): muteData | null;
    static getAllMutes(): {
        [playerName: string]: muteData;
    };
    static testForMutedPlayer(playerName: string): boolean;
    static testForPermanentlyMutedPlayer(playerName: string): boolean;
    static playerTimeUntilUnmute(playerName: string): number | null;
    static playerTimeUntilUnmuteFormatted(playerName: string): string | null;
    static playerMuteDuration(playerName: string): number | null;
    static playerMuteDurationFormatted(playerName: string): string | null;
    static saveMutes(): void;
    static refreshMutes(): void;
}
