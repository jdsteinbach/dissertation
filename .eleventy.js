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
        input: '.',
        includes: '_includes',
        data: '_data',
        output: '_site'
      }
    }
}
