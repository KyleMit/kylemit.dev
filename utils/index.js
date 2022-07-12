const { minify } = require("terser")
const CleanCSS = require("clean-css");
const Prism = require('prismjs');
const markdownIt = require("markdown-it");
const loadLanguages = require('prismjs/components/');
loadLanguages(['md']);

const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
})

function convertMarkdownToHtml(code) {
    return md.render(code);
}

function syntaxHighlightMarkdown(code) {
    const html = Prism.highlight(code, Prism.languages.md, 'md');
    const lined =   html.split('\n')
        .map((line, num) => `<div class="line-num">${(num + 1)}</div><div class="line-code">${line}</div>`)
        .join('\n');
    return `<pre class="language-md"><code>${lined}</code></pre>`;
}

function compilePlainText(inputContent, _inputPath) {
    return (_data) => inputContent;
}

function minifyCss(code) {
    // return original text if run in dev
    if (process.env.ELEVENTY_ENV.toLowerCase() == "dev") return code
    return new CleanCSS({}).minify(code).styles;
}

async function minifyJs(code, callback) {
    // return original text if run in dev
    if (process.env.ELEVENTY_ENV.toLowerCase() == "dev") {
        callback(null, code)
    }

    try {
      const minified = await minify(code)
      callback(null, minified.code)
    } catch (err) {
      console.error("Terser error: ", err)
      // Fail gracefully.
      callback(null, code)
    }
}

module.exports = {
    convertMarkdownToHtml,
    syntaxHighlightMarkdown,
    compilePlainText,
    minifyCss,
    minifyJs,
}
