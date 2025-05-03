export function getArrayElementProperty(array, property) {
    array.forEach((v, i, a) => {
        array[i] = eval(`v.${property}`);
    });
    return array;
}
//# sourceMappingURL=getArrayElementProperty.js.map