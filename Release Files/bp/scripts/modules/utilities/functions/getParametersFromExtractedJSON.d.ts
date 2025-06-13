export declare function getParametersFromExtractedJSON(rawdata: RegExpMatchArray[]): {
    input: RegExpMatchArray[];
    originalinput: string | undefined;
    resultAndTypeList: {
        t: "json" | "non-json";
        v: any;
    }[];
    separatedResultList: {
        s: string;
        v: any;
    }[][];
    errors: {
        i: number;
        v: any;
    }[];
    unfilteredresults: any[];
    results: any[];
    unfilteredresultsincludingunmodified: {
        s: string;
        v: any;
    }[];
    resultsincludingunmodified: {
        s: string;
        v: any;
    }[];
};
