module.exports = eleventyConfig => {
    /* Markdown */
    let markdownIt = require('markdown-it')

    eleventyConfig.setLibrary('md', markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    }))

    return {
      templateFormats: [
        'md'
      ],
      dir: {
        input: 'src',
        data: '_data',
        output: '_site'
      },
      templateFormats: ['njk', 'md', '11ty.js'],
      htmlTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
      passthroughFileCopy: true
    }
}
