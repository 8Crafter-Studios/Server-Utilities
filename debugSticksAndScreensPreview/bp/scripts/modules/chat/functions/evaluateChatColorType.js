import { patternFunctionList } from "modules/chat/constants/patternFunctionList";
import { patternList } from "modules/chat/constants/patternList";
export function evaluateChatColorType(text, type) {
    let ib = -1n;
    //    let value = "hi§r§btest s§# a zs§# x vc §r§ksazx"; 
    let stop = false;
    return text.split("").map((v, i, a) => { if (a[i - 1] == "§" && v == "!") {
        stop = true;
        return v;
    }
    else if (a[i - 1] == "§" && v == "?") {
        stop = !stop;
        return v;
    }
    else if (a[i - 1] == "§" && v == "#") {
        stop = false;
        return v;
    }
    else if (a[i - 1] == "§" || v == "§" || v == " " || stop) {
        return v;
    }
    else {
        ib++;
        return patternFunctionList[type](Number(ib), Math.floor(Math.random() * patternList.rainbow.length)) + v;
    } }).join("");
}
//# sourceMappingURL=evaluateChatColorType.js.map