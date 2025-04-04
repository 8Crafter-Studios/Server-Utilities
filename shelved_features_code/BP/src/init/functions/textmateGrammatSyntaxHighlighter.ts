function textmateGrammatSyntaxHighlighter(
    text: string,
    grammar: any, // assuming the TextMate grammar JSON
    theme: { [key: string]: string } // Minecraft Bedrock edition formatting codes
): string {
    const highlightedText: string[] = [];
    const regex = new RegExp(grammar.patterns.map((pattern: any) => pattern.pattern).join("|"), "g");

    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
        const scopeName = grammar.patterns.find((pattern: any) => pattern.pattern === match![0]).scopeName;
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
