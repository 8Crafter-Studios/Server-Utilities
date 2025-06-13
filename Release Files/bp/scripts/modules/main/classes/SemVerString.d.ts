/**
 * @since 1.20.0-development.63
 */
export declare class SemVerString {
    major: number;
    minor: number;
    patch: number;
    private pre_release_stage_internal?;
    private pre_release_version_internal?;
    build?: string | undefined;
    constructor(major: number, minor: number, patch: number, pre_release?: string, build?: string);
    get pre_release(): string;
    set pre_release(pre_release: string);
    get pre_release_stage(): string;
    set pre_release_stage(pre_release_stage: string);
    get pre_release_version(): string;
    set pre_release_version(pre_release_version: string);
    get raw(): string;
    toString(): string;
    toPrimitive(): string;
    toJSON(): {
        major: number;
        minor: number;
        patch: number;
        pre_release_stage: string | undefined;
        pre_release_version: string | undefined;
        build: string | undefined;
        type: string;
    };
    static pre_release_regex: RegExp;
    static build_regex: RegExp;
    static semver_regex: RegExp;
    static fromJSON(json: {
        major: number;
        minor: number;
        patch: number;
        pre_release_stage: string;
        pre_release_version: string;
        build: string;
        type: string;
    }): SemVerString;
    static fromString(string: string): SemVerString;
}
export declare function SemVerValidator(string: string): boolean;
export declare function SemVerMatcher(string: string): RegExpMatchArray | null;
