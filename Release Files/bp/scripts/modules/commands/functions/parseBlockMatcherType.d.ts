export declare function parseBlockMatcherType(matcher: string): {
    raw: string;
    block: {
        id: string;
        states: {
            [id: string]: string | number | boolean;
        } | undefined;
    };
};
