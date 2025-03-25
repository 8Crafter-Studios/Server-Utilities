import { patternList } from "./patternList";
export const patternFunctionList = {
    rainbow: (ib) => patternList.rainbow[ib % patternList.rainbow.length],
    randomrainbow: (ib, offset) => patternList.rainbow[(ib + offset) % patternList.rainbow.length],
    shuffledrainbow: () => patternList.rainbow[Math.floor(Math.random() * patternList.rainbow.length)],
    bluegradient: (ib) => patternList.blue[ib % patternList.blue.length],
    randombluegradient: (ib, offset) => patternList.blue[(ib + offset) % patternList.blue.length],
    shuffledbluegradient: () => patternList.blue[Math.floor(Math.random() * patternList.blue.length)],
    yellowgradient: (ib) => patternList.yellow[ib % patternList.yellow.length],
    randomyellowgradient: (ib, offset) => patternList.yellow[(ib + offset) % patternList.yellow.length],
    shuffledyellowgradient: () => patternList.yellow[Math.floor(Math.random() * patternList.yellow.length)],
    blackgradient: (ib) => patternList.black[ib % patternList.black.length],
    randomblackgradient: (ib, offset) => patternList.black[(ib + offset) % patternList.black.length],
    shuffledblackgradient: () => patternList.black[Math.floor(Math.random() * patternList.black.length)],
    graygradient: (ib) => patternList.gray[ib % patternList.gray.length],
    randomgraygradient: (ib, offset) => patternList.gray[(ib + offset) % patternList.gray.length],
    shuffledgraygradient: () => patternList.gray[Math.floor(Math.random() * patternList.gray.length)],
    purplegradient: (ib) => patternList.purple[ib % patternList.purple.length],
    randompurplegradient: (ib, offset) => patternList.purple[(ib + offset) % patternList.purple.length],
    shuffledpurplegradient: () => patternList.purple[Math.floor(Math.random() * patternList.purple.length)]
};
//# sourceMappingURL=patternFunctionList.js.map