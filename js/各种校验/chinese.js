// 验证中文字符
function verifyChinese(str) {
  var pattern = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;
  return pattern.test(str);
}

module.exports = verifyChinese;