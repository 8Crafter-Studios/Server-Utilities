import { ScoreboardObjective } from "@minecraft/server";
export declare class ScoreboardV2 {
    static addObjective(objectiveId: string, displayName?: string): ScoreboardV2Objective;
    static getObjective(objectiveId: string): ScoreboardV2Objective | undefined;
    static getObjectives(): ScoreboardV2Objective[];
    static getObjectiveIds(): string[];
    static removeObjective(objectiveId: ScoreboardV2Objective | string): boolean;
}
export declare class ScoreboardV2Objective {
    displayName: string;
    id: string;
    private scores;
    constructor(id: string);
    addScore(participant: string, scoreToAdd: bigint): bigint;
    getParticipants(): string[];
    getScore(participant: string): bigint | undefined;
    getScores(): {
        participant: string;
        score: bigint;
    }[];
    hasParticipant(participant: string): boolean;
    isValid(): boolean;
    transferFromScoreboard(scoreboard: ScoreboardObjective): void;
    removeParticipant(participant: string): boolean;
    setScore(participant: string, score: bigint): void;
    private save;
    /**
     * @throws Throws if the scoreboard has not been saved.
     */
    private load;
    delete(): void;
    toJSON(): {
        id: string;
        displayName: string;
        scores: {
            [playerId: string]: bigint;
        };
    };
    static get(objectiveId: string): ScoreboardV2Objective | undefined;
    static new(objectiveId: string, displayName?: string): ScoreboardV2Objective;
}
