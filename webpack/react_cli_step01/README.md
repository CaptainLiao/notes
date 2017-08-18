# 使用 webpack 构建 react 开发环境

[webpack 构建解惑](https://segmentfault.com/a/1190000005089993#articleHeader3)

**构建功能及相关插件**
- 资源加载：css、js、img...
- css modules
- 自动生成 index.html
- webpack-dev-serve 配置
- 组件修改，局部刷新： react-hot-loader
    *  此插件依赖 webpack-dev-server 
      `npm install --save-dev webpack-dev-server react-hot-loader`
    *  [配置 webpack-dev-server](https://segmentfault.com/a/1190000004660311)
- 生产环境构建
- code splitting
- dynamic loading
- 优化缓存
- 引入antd-mobile
      