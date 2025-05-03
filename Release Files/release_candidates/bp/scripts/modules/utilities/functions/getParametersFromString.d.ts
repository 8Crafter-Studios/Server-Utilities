export declare function getParametersFromString(string: string): {
    rawdata: any[] | RegExpMatchArray[];
    input: string;
    resultAndTypeList: {
        t: string;
        v: string;
    }[];
    separatedResultList: {
        s: string;
        v: any;
    }[];
    errors: {
        i: number;
        v: Error;
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
