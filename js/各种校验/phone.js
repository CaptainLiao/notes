// 验证手机号
function verifyPhone(num) {
  var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return pattern.test(num);
}

module.exports = verifyPhone;
