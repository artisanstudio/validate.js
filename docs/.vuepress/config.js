module.exports = {
  title: 'validate.js',
  description: 'A lightweight, extensible, dependency-free validation library.',
  base: "/validate.js/",
  themeConfig: {
    sidebar: [
      ['/guide/', 'Introduction'],
      '/guide/custom-validation-rules',
      '/guide/available-validation-rules',
      '/guide/localization',
      '/guide/usage-in-vue',
      '/guide/advanced',
    ]
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-attrs'))
    }
  },
  plugins: ['flowchart'],
}
