declare function textmateGrammatSyntaxHighlighter(text: string, grammar: any, // assuming the TextMate grammar JSON
theme: {
    [key: string]: string;
}): string;
