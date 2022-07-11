const { compilePlainText, convertMarkdownToHtml, minifyCss, minifyJs, syntaxHighlightMarkdown} = require("./utils/index")
module.exports = function(eleventyConfig) {

    // add assets
    eleventyConfig.addPassthroughCopy("src/assets");

    eleventyConfig.addFilter("md", convertMarkdownToHtml);

    eleventyConfig.addFilter("highlightMd", syntaxHighlightMarkdown);

    // override md engine to return plain content
    eleventyConfig.addExtension("md", { compile: compilePlainText });

    eleventyConfig.addFilter("cssmin", minifyCss);

    eleventyConfig.addNunjucksAsyncFilter("jsmin", minifyJs)


    return {
        dir: {
            input: "src",
            layouts: "_layouts"
        },

    };
};
