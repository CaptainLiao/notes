const RE_FORMAT = new RegExp('%([1-9]?)(.)', 'g')
const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
/**
 * @param {RegExp} fmt 按照strftime的规则，但是多了个数字，比如 "%d"=>"02", "%1d" => "2"，目前支持最多以天为单位的倒计时 
 * @param {time} diffTime 倒计时剩余时间 单位：毫秒
 */
function format(fmt, diffTime) {
  if (diffTime === void 0 || diffTime < 0) return diffTime
  
  let day = parseInt(diffTime / ONE_DAY)
  diffTime -= day * ONE_DAY
  let h = parseInt(diffTime / ONE_HOUR)
  diffTime -= h * ONE_HOUR
  let m = parseInt(diffTime / ONE_MINUTE)
  diffTime -= m * ONE_MINUTE
  let s = parseInt(diffTime / ONE_SECOND)

  let res = fmt.replace(RE_FORMAT, function(_, digit, val) {
    switch (val) {
      case 'd': // 日，01-31
        return zpad(digit || 2, day);
      case 'H': // 时，01-24
        return zpad(digit || 2, h);
      case 'M': // 分，01-59
        return zpad(digit || 2, m);
      case 'S': // 秒，01-59
        return zpad(digit || 2, s);
    }
  })

  return res
}

const ZEROS = '00000000000000000000';
function zpad(n, v) {
  return (ZEROS + v).substr(-n)
}

export default {
  format,
  zpad
}