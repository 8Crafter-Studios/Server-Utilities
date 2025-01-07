export declare class BlockMask {
    private blocksList;
    private hasStates;
    private blockTypeIds;
    get blocks(): {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        get raw(): string;
        get rawns(): string;
    }[];
    set blocks(blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]);
    get includesStates(): boolean;
    get blockTypes(): string[];
    evaluateIds(): void;
    constructor(blocks?: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]);
    push(...blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]): number;
    static parse(): void;
    static extractRaw(str: string): string | null;
    static extract(str: string, extraIdParsingEnabled?: boolean): BlockMask;
    static extractWRaw(str: string, extraIdParsingEnabled?: boolean): {
        raw: string;
        parsed: BlockMask;
    };
    static extractAllRaw(str: string): string[] | null;
    static extractAll(str: string, extraIdParsingEnabled?: boolean): BlockMask[];
    static extractAllWRaw(str: string, extraIdParsingEnabled?: boolean): {
        raw: string[];
        parsed: BlockMask[];
    };
}
