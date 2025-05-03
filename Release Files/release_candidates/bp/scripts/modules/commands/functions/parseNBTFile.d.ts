export declare function parseNBTFile(nbt: {
    blocks: {
        pos: [x: number, y: number, z: number];
        state: number;
    }[];
    entities?: any;
    palette: {
        Name: string;
        properties?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
}): {
    pos: [x: number, y: number, z: number];
}[];
