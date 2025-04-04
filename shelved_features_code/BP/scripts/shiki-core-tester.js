import shiki from './@shikijs/core.js'
import {createJavaScriptRegexEngine} from "./@shikijs/engine-javascript.js"
import githubDarkTheme from "./github-dark.js"
import javascript from './javascript.js';

const highlighter = await shiki.createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    themes: [githubDarkTheme],
    langs: [javascript[0]],
  });

// await highlighter.loadLanguage(myLang) // <--

const code = "function addTest(a, b){return a + b;}"

const html = highlighter.codeToHtml(code, {
  lang: 'javascript',
  theme: 'github-dark'
})

console.log(html)

// ${ase}dcsend((await import("shiki-core-tester")))
