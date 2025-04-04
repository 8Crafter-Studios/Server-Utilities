import Highlighter from "./textmate-highlighter.js";

// First of all let's define where to get grammars, themes and Onigiruma from
// You can also pre-fetch some these objects on your own if you want, we'll use URLs here for simplicity
// You can name your grammars differently, but internally some grammars will reference other grammars using these names, so you should registered them like this

const ONIGURUMA = "https://unpkg.com/vscode-oniguruma@2.0.1/release/onig.wasm";

const GRAMMARS = {
    "source.js": "./javascript.js"
};

const THEMES = {
    "github-dark": "./github-dark.js",
};

// Now let's instantiate the highlighter

const highlighter = new Highlighter({
    getGrammar: (grammar) => {
        console.log("Loading grammar:", grammar);
        return GRAMMARS[grammar];
    },
    getTheme: (theme) => {
        console.log("Loading theme:", theme);
        return THEMES[theme];
    },
    getOniguruma: () => {
        return ONIGURUMA;
    },
});

// Rendering some code to HTML

const html = await highlighter.highlightToHTML({
    code: 'const foo = "bar";',
    grammar: "source.js",
    theme: "github-dark",
});

// Rendering some code to ANSI, for the terminal

const ansi = await highlighter.highlightToANSI({
    code: 'const foo = "bar";',
    grammar: "source.js",
    theme: "github-dark",
});

// Rendering some code to ANSI, for the terminal

const mcfc = await highlighter.highlightToMCFC({
    code: 'const foo = "bar";',
    grammar: "source.js",
    theme: "github-dark",
});

// Doing low-level tokenization

const lines = ["function sum ( a, b ) {", "  return a + b;", "}"];

const abortController = new AbortController();
const abortSignal = abortController.signal;

const linesTokens = await highlighter.tokenize(lines, "source.js", "github-dark", abortSignal, (lineTokens, lineIndex) => {
    console.log("Line tokens:", lineTokens);
    console.log("Line index:", lineIndex);
});

console.log("HTML Highlight:", html);
console.log("ANSI Highlight:", ansi);
