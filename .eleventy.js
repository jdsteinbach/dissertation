module.exports = eleventyConfig => {
  // Markdown
  let markdownIt = require('markdown-it')

  eleventyConfig.setLibrary('md', markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }))

  eleventyConfig.addCollection('chapters', collection => {
    return collection
      .getAll()
      .filter(page => {
        return page.data.content_type === 'chapter'
      })
      .sort((a, b) => {
        return a.data.chapter_order === b.data.chapter_order
          ? 0
          : a.data.chapter_order < b.data.chapter_order
            ? -1
            : 1;
      })
      .map(page => {
        const children = collection.getAll().filter(item => {
          return item.data.title === page.data.title
        })

        const outline = children.find(item => {
          return item.data.content_type === 'outline'
        })

        const introduction = children.find(item => {
          return item.data.content_type === 'introduction'
        })

        const conclusion = children.find(item => {
          return item.data.content_type === 'conclusion'
        })

        page.data = {
          ...page.data,
          outline,
          introduction,
          conclusion
        }

        return page
      })
  })

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
