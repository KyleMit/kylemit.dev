const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  // Copy the `assets/` directory
  eleventyConfig.addPassthroughCopy("assets");

  // add css minify filter
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
};
