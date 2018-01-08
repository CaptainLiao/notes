// 验证英文字符
function verifyEnglish(str) {
  var pattern = /^[a-zA-Z]+$/;
  return pattern.test(str);
}

module.exports = verifyEnglish;