/**
 * @since 1.20.0-development.63
 */
export class SemVerString {
    major;
    minor;
    patch;
    pre_release_stage_internal;
    pre_release_version_internal;
    build;
    constructor(major, minor, patch, pre_release, build /*, SemVerVersion*/) {
        if (!!!pre_release) {
        }
        else if (typeof pre_release != "string") {
            throw new TypeError(`Native type conversion failed. Function argument [3] expected type string but got type ${typeof pre_release} instead`);
        }
        else if (!!!pre_release.match(/^(?:(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?$/)) {
            throw new TypeError(`Invalid pre-release version: ${JSON.stringify(pre_release)}. Pre-release string must match the following regex expression: /^(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*$/`);
        }
        if (!!!build) {
        }
        else if (typeof build != "string") {
            throw new TypeError(`Native type conversion failed. Function argument [4] expected type string but got type ${typeof build} instead`);
        }
        else if (!!!build.match(/^([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/)) {
            throw new TypeError(`Invalid build version: ${JSON.stringify(build)}. Pre-release string must match the following regex expression: /^[0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*$/`);
        }
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.pre_release_stage_internal =
            pre_release == ""
                ? undefined
                : pre_release.match(SemVerString.pre_release_regex).groups
                    .pre_release_phase;
        this.pre_release_version_internal =
            pre_release == ""
                ? undefined
                : pre_release.match(SemVerString.pre_release_regex).groups
                    .pre_release_version;
        this.build = build == "" ? undefined : build;
    }
    get pre_release() {
        return (this.pre_release_stage_internal + this.pre_release_version_internal);
    }
    set pre_release(pre_release) {
        if (!!!pre_release) {
        }
        else if (typeof pre_release != "string") {
            throw new TypeError(`Native type conversion failed. Function argument [0] expected type string but got type ${typeof pre_release} instead`);
        }
        else if (!!!pre_release.match(/^(?:(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?$/)) {
            throw new TypeError(`Invalid pre-release version: ${JSON.stringify(pre_release)}. Pre-release string must match the following regex expression: /^(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*$/`);
        }
        this.pre_release_stage_internal =
            pre_release == ""
                ? undefined
                : pre_release.match(SemVerString.pre_release_regex).groups
                    .pre_release_phase;
        this.pre_release_version_internal =
            pre_release == ""
                ? undefined
                : pre_release.match(SemVerString.pre_release_regex).groups
                    .pre_release_version;
    }
    get pre_release_stage() {
        return this.pre_release_stage_internal;
    }
    set pre_release_stage(pre_release_stage) {
        if (!!!pre_release_stage) {
        }
        else if (typeof pre_release_stage != "string") {
            throw new TypeError(`Native type conversion failed. Function argument [0] expected type string but got type ${typeof pre_release_stage} instead`);
        }
        else if (!!!pre_release_stage.match(/^(?:(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))?$/)) {
            throw new TypeError(`Invalid pre-release stage: ${JSON.stringify(pre_release_stage)}. Pre-release stage string must match the following regex expression: /^(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)$/`);
        }
        this.pre_release_stage_internal =
            pre_release_stage == "" ? undefined : pre_release_stage;
    }
    get pre_release_version() {
        return this.pre_release_version_internal;
    }
    set pre_release_version(pre_release_version) {
        if (!!!pre_release_version) {
        }
        else if (typeof pre_release_version != "string") {
            throw new TypeError(`Native type conversion failed. Function argument [0] expected type string but got type ${typeof pre_release_version} instead`);
        }
        else if (!!!pre_release_version.match(/^(?:(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?$/)) {
            throw new TypeError(`Invalid pre-release stage: ${JSON.stringify(pre_release_version)}. Pre-release stage string must match the following regex expression: /^(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*$/`);
        }
        this.pre_release_version_internal =
            pre_release_version == "" ? undefined : pre_release_version;
    }
    get raw() {
        return `${!!this.major ? this.major + "." : ""}${!!this.minor ? this.minor + "." : ""}${!!this.patch ? this.patch : ""}${!!this.pre_release_stage
            ? `-${this.pre_release_stage}${!!this.pre_release_version_internal
                ? this.pre_release_version_internal
                : ""}`
            : !!this.pre_release_version_internal
                ? "-" + this.pre_release_version_internal
                : ""}${!!this.build ? "+" + this.build : ""}`;
    }
    toString() {
        return this.raw;
    }
    toPrimitive() {
        return this.raw;
    }
    toJSON() {
        return {
            major: this.major,
            minor: this.minor,
            patch: this.patch,
            pre_release_stage: this.pre_release_stage_internal,
            pre_release_version: this.pre_release_version_internal,
            build: this.build,
            type: "SemVerString",
        };
    }
    static pre_release_regex = /^(?<pre_release>(?<pre_release_stage>0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?<pre_release_version>(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))$/;
    static build_regex = /^([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/;
    static semver_regex = /^(?<base>(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*))(?:-(?<pre_release>(?<pre_release_stage>0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?<pre_release_version>(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    static fromJSON(json) {
        return new SemVerString(Number(json.major), Number(json.minor), Number(json.patch), json.pre_release_stage + json.pre_release_version, json.build);
    }
    static fromString(string) {
        const json = string.match(SemVerString.semver_regex).groups;
        return new SemVerString(Number(json.major), Number(json.minor), Number(json.patch), json.pre_release_stage + json.pre_release_version, json.build);
    }
}
export function SemVerValidator(string) {
    return !!string.match(SemVerString.semver_regex);
}
export function SemVerMatcher(string) {
    return string.match(SemVerString.semver_regex);
}
//# sourceMappingURL=SemVerString.js.map