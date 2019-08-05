const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  // Copy the `assets/` directory
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPassthroughCopy("favicon.ico");

  // add css minify filter
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // add full year calc with JS
  eleventyConfig.addFilter("getYear", function(code) {
    return new Date().getFullYear();
  });
};
