const fs = require("fs")
const CleanCSS = require("clean-css");
const { minify } = require("terser")

module.exports = function(eleventyConfig) {

    // add assets
    eleventyConfig.addPassthroughCopy("assets");


    // add collections
    eleventyConfig.addCollection("categories", function(collectionApi) {
        // get all restaurants
        let restaurants = collectionApi.getFilteredByTag("restaurants");

        // ["fine dining", "fine dining", "casual"]
        let categoryNames = restaurants.map(r => r.data.category)

        // ["fine dining", "casual"]
        let categories = Array.from(new Set(categoryNames))

        let output = categories.map(cat => {
            let matches = restaurants.filter(r => r.data.category === cat)

            let obj = {
                name: cat,
                restaurants: matches
            }

            return obj
        })

        return output
    });



    // add filters
    eleventyConfig.addFilter("toTitleCase", function(str) {
        return str.replace(/\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );

    });

    eleventyConfig.addFilter("base64", function(path) {
        try {
            let image = fs.readFileSync(path);
            let encode = new Buffer(image).toString('base64');
            return `data:image/png;base64,${encode}`
        } catch (error) {
            return path
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

        // By default markdown files are pre-processing with liquid template engine
        // https://www.11ty.io/docs/config/#default-template-engine-for-markdown-files
        markdownTemplateEngine: "njk",
    };
};
