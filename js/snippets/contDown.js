/**
 * @param {Date} countDownTime 日期时间戳
 */
function __formatTime(countDownTime) {
  if (countDownTime === void 0) return
  let diffTime = countDownTime - Date.now()
  if (diffTime < 0) return diffTime
  
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  let day = parseInt(diffTime / DAY)
  diffTime -= day * DAY
  let h = parseInt(diffTime / HOUR)
  diffTime -= h * HOUR
  let m = parseInt(diffTime / MINUTE)
  diffTime -= m * MINUTE
  let s = parseInt(diffTime / SECOND)

  h = ('0'+h).substr(-2)
  m = ('0'+m).substr(-2)
  s = ('0'+s).substr(-2)

  return day > 0
    ? `${day}天 ${h}:${m}:${s}`
    : `${h}:${m}:${s}`;
}