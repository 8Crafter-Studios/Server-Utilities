export declare function getParametersFromExtractedJSON(rawdata: RegExpMatchArray[]): {
    input: RegExpMatchArray[];
    originalinput: string;
    resultAndTypeList: any[];
    separatedResultList: {
        s: string;
        v: any;
    }[][];
    errors: any[];
    unfilteredresults: any[];
    results: any[];
    unfilteredresultsincludingunmodified: any[];
    resultsincludingunmodified: any[];
};
