const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "styles.css";

module.exports = class {
  async data() {
    const rawFilepath = path.join(
      __dirname,
      `../_includes/postcss/${fileName}`
    );
    console.log(rawFilepath);
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      require("postcss-import"),
      require("postcss-nested"),
      require("postcss-image-inliner")({
        assetPaths: [path.join(__dirname, `../_includes/img`)],
        maxFileSize: 0,
      }),
      require("autoprefixer"),
      require("cssnano"),
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
