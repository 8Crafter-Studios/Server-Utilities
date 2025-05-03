export declare function flatPath(directoryObject: {
    [k: string]: any;
}, startingPath?: string[]): {
    [k: string]: any;
    path: string[];
    name: string;
    index?: number;
    arrayindex?: number;
    objectindex?: number;
}[];
