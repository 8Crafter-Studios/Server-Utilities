export class Base52 {
    static charMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    static toBase52(input) {
        let result = '';
        for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i);
            result += Base52.charMap.charAt((charCode >> 6) & 0x1F) + Base52.charMap.charAt(charCode & 0x3F);
        }
        return result;
    }
    static fromBase52(input) {
        let result = '';
        for (let i = 0; i < input.length; i += 2) {
            const charCode = (Base52.charMap.indexOf(input.charAt(i)) << 6) | Base52.charMap.indexOf(input.charAt(i + 1));
            result += String.fromCharCode(charCode);
        }
        return result;
    }
}
//# sourceMappingURL=Base52.js.map