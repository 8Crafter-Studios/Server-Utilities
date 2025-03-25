export declare function cycleRGB(callback: (current: {
    r: number;
    g: number;
    b: number;
}) => any, cancel?: () => boolean, step?: number): Promise<void>;
