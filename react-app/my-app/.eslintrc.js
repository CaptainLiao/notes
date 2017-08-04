module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  "extends": "react-app",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  rules: {
    'no-console': ['warn'],
    //'linebreak-style': ['error', 'windows'],
    'linebreak-style': 0,
    quotes: ['warn', 'single'],
    semi: 0,
    'no-unused-vars': ['warn'],
    'no-console': ['warn']
  },
  globals: {
    App: false,
    Page: false,
    wx: false,
    getCurrentPages: false
  }
}
