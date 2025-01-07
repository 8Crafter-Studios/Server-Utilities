export function splitUpStringData(data, chunkSize = 32760) {
    if (chunkSize == 0) {
        throw (new RangeError(`chunkSize cannot be 0 (got ${chunkSize.toString()})`));
    }
    if (typeof data != "string") {
        throw (new TypeError(`args[0]: Expected type of string but got type of ${typeof data} instead.`));
    }
    if (typeof chunkSize == "bigint") {
        const chunkSizeB = Number(chunkSize);
        let remainingData = data;
        const splitData = [];
        for (let i = 0n; remainingData.length != 0; i++) {
            splitData.push(remainingData.slice(0, Math.min(remainingData.length, chunkSizeB)));
            remainingData = remainingData.slice(Math.min(remainingData.length, chunkSizeB));
        }
        return splitData;
    }
    else if (typeof chunkSize != "number") {
        throw (new TypeError(`args[1]: Expected type of number but got type of ${typeof chunkSize} instead.`));
    }
    else {
        let remainingData = data;
        let splitData = [];
        for (let i = 0n; remainingData.length != 0; i++) {
            splitData.push(remainingData.slice(0, Math.min(remainingData.length, chunkSize)));
            remainingData = remainingData.slice(Math.min(remainingData.length, chunkSize));
        }
        return splitData;
    }
}
//# sourceMappingURL=splitUpStringData.js.map