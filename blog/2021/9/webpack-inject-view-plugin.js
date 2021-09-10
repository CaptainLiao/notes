
module.exports = class InjectViewStr {
  constructor(viewStr) {
    this.viewStr = viewStr
  }

  apply(compliler) {
    compliler.hooks.emit.tap('WebpackCdnPlugin', compilation => {
      if (!this.viewStr) return
      
      const logSuccess = (...args) => console.log(`\x1b[32m%s\x1b[0m`, ...args)

      let count = 0
      compilation.getAssets().forEach(item => {
        const xmlReg = /.*\.[a-z]{1}xml/
        if (xmlReg.test(item.name)) {
          ++count
          item.source._value += this.viewStr
        }
      })
      console.log('')
      console.log('')
      logSuccess('Inject Success:', `注入${this.viewStr}到${count}个xml文件内`)
    })
  }
}
