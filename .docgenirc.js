/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
  mode: 'full',
  title: 'ai-demo',
  description: '项目健康度智能监控系统',
  docsDir: 'docs',
  locales: [
    { key: 'zh-cn', name: '中文' },
  ],
  defaultLocale: 'zh-cn',
  navs: [
    {
      title: '组件',
      path: 'components',
      locales: {
        'en-us': {
          title: 'Component'
        }
      }
    },
    {
      title: 'GitHub',
      path: 'https://github.com/smile1016/ai-risk-demo-frontend',
      isExternal: true
    },
  ],
  libs: [

  ],
  switchTheme: true
};
