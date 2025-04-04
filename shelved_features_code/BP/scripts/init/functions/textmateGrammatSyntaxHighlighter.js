function textmateGrammatSyntaxHighlighter(text, grammar, // assuming the TextMate grammar JSON
theme // Minecraft Bedrock edition formatting codes
) {
    const highlightedText = [];
    const regex = new RegExp(grammar.patterns.map((pattern) => pattern.pattern).join("|"), "g");
    let match;
    while ((match = regex.exec(text)) !== null) {
        const scopeName = grammar.patterns.find((pattern) => pattern.pattern === match[0]).scopeName;
        const formatCode = theme[scopeName] || "";
        highlightedText.push(`§${formatCode}${match[0]}§r`);
    }
    return highlightedText.join("");
}
// const text = 'function helloWorld() { console.log("Hello, World!"); }';
// const grammar = import("./path/to/grammar.json");
// const theme = {
//     "source.js": "l", // bold
//     keyword: "n", // underline
//     string: "o", // italic
// };
// const highlightedText = textmateGrammatSyntaxHighlighter(text, grammar, theme);
// console.log(highlightedText);
//# sourceMappingURL=textmateGrammatSyntaxHighlighter.js.map