/**
 * Shuffles the provided array, mutates the original array.
 *
 * @template T The type of the array to shuffle.
 * @param {T[]} array The array to shuffle.
 * @returns {T[]} The shuffled array.
 *
 * @author 8Crafter
 */
export function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
//# sourceMappingURL=shuffle.js.map