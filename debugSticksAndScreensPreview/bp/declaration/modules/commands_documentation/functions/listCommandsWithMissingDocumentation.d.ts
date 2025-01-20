export declare function listCommandsWithMissingDocumentation(options?: {
    onlyFunctional?: boolean;
    onlyNonFunctional?: boolean;
    onlyNonVersion0?: boolean;
    onlyVersion0?: boolean;
    onlyNonDeprecated?: boolean;
    onlyDeprecated?: boolean;
}): {
    commandName: string;
    missingFlagsList?: string;
    syntax: boolean;
    description: boolean;
    flags: boolean;
    list: boolean;
}[];
