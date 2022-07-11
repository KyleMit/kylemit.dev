const { minify } = require("terser")
const CleanCSS = require("clean-css");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);

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
      return `<pre>${code}</pre>`;
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
