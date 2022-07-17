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

function formatMarkdown(code) {
    const highlighted = syntaxHighlightMarkdown(code);
    const linkified = linkifyMarkup(highlighted)
    const mobilized = mobileReferenceLinks(linkified)
    const numbered = addLineNumbers(mobilized)
    const wrapped = wrapWithLanguageTag(numbered)
    return wrapped;
}

function syntaxHighlightMarkdown(code) {
    const html = Prism.highlight(code, Prism.languages.md, 'md');
    return html;
}

function linkifyMarkup(code) {
    const reg = /<span class="token url">\[<span class="token content">.+?<\/span>\]\(<span class="token url">(.+?)<\/span>\)<\/span>/g
    const linkified = code.replace(reg, `<a href="$1" target="_blank">$&</a>`)
    return linkified
}

function mobileReferenceLinks(code) {
    const reg = /\(<span class="token url">(.+?)<\/span>\)/g

    let idx = 0;
    const replaced = code.replaceAll(reg, (el) => {
        idx++
        return `<span class="d-md">${el}</span><span class="d-sm">[<span class="token url">${idx}</span>]</span>`;
    })

    const matches = [...code.matchAll(reg)]
    const references = matches.map((m, i) => `<span class="d-sm d-sm-wrap"><span class="punctuation">[</span>${i+1}<span class="punctuation">]:</span> <span class="break-all">${m[1]}</span></span>`).join("\n")

    const output = `${replaced}
${references}`

    return output
}

function addLineNumbers(code) {
    const numbered = code.split('\n')
        .map((line, num) => {
            const responsiveClass = line.includes("d-sm-wrap") ? "d-sm" : "";
            return `<div class="line-num ${responsiveClass}">${(num + 1)}</div><div class="line-code ${responsiveClass}">${line}</div>`
        })
        .join('\n');
    return numbered
}

function wrapWithLanguageTag(code) {
    const wrapped = `<pre class="language-md"><code>${code}</code></pre>`;
    return wrapped
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
    formatMarkdown,
    compilePlainText,
    minifyCss,
    minifyJs,
}
