const { minify } = require("terser")
const CleanCSS = require("clean-css");
const hljs = require('highlight.js');
const markdownIt = require("markdown-it");

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
      const html = hljs.highlight(code, {language: 'md'}).value
      return `<pre>${html}</pre>`;
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
