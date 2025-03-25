export function jsonFromString(str, useBetterJSONParse = true) {
    const regex = /([{\["]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]"]{1}|["]{1}(([^(")]|\\")*)+(?<!\\)["]){1}/gis;
    const matches = str.match(regex);
    if (useBetterJSONParse)
        return matches.map((m) => JSONParse(m));
    else
        return matches.map((m) => JSON.parse(m));
}
//# sourceMappingURL=jsonFromString.js.map