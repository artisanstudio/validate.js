module.exports = {
  title: 'validate.js',
  description: 'A lightweight, extensible, dependency-free validation library.',
  base: "/validate.js/",
  themeConfig: {
    sidebar: [
      ['/guide/', 'Introduction'],
      ['/guide/available-validation-rules', 'Available Validation Rules'],
      ['/guide/localization', 'Localization'],
      ['/guide/usage-in-vue', 'Usage in Vue'],
      ['/guide/advanced', 'Advanced'],
    ]
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-attrs'))
    }
  },
  plugins: ['flowchart'],
}
