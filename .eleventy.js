const { minify } = require("terser")
const CleanCSS = require("clean-css");
const Prism = require('prismjs');
const markdownIt = require("markdown-it");
const loadLanguages = require('prismjs/components/');
loadLanguages(['md']);

module.exports = function(eleventyConfig) {

    // add assets
    eleventyConfig.addPassthroughCopy("src/assets");

    const md = markdownIt({
      html: true,
      breaks: true,
      linkify: true
    })
    eleventyConfig.setLibrary("md", md);

    eleventyConfig.addFilter("md", function(code) {
      // return original text if run in dev
      return md.render(code);
    });

    eleventyConfig.addFilter("highlight", function(code) {
      // return original text if run in dev
      const html = Prism.highlight(code, Prism.languages.md, 'md');
      return `<pre class="language-md"><code>${html}</code></pre>`;
    });

    // override md engine to return plain content
    eleventyConfig.addExtension("md", {
      compile: function (inputContent, _inputPath) {
        return (_data) => inputContent;
      }
    });

    eleventyConfig.addFilter("cssmin", function(code) {
        // return original text if run in dev
        if (process.env.ELEVENTY_ENV.toLowerCase() == "dev") return code
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
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
    )


    return {
        dir: {
            input: "src",
            layouts: "_layouts"
        },

    };
};
