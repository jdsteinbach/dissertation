module.exports = eleventyConfig => {
  // Markdown
  let markdownIt = require('markdown-it')

  eleventyConfig.setLibrary('md', markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }))

  // Netlify Redirect
  eleventyConfig.addPassthroughCopy('_redirects')

  // Web Fonts
  eleventyConfig.addPassthroughCopy('src/fonts')

  //Favicon
  eleventyConfig.addPassthroughCopy('src/favicon.ico')

  return {
    dir: {
      input: 'src',
      data: '_data',
      output: '_site'
    },
    templateFormats: ['liquid', 'md', '11ty.js'],
    passthroughFileCopy: true
  }
}
