/**
 * 获取绝对时间
 * 即无论你在哪个时区，得到的时间和京8区的时间一致
 * 
 * @param {Date} time 
 * @returns {years,month, day, hours, minutes, seconds}
 */
function getAbsTime(time) {
  try {
    let currentZoneTime = new Date(time);
    let currentZoneHours = currentZoneTime.getHours();
    let offsetZone = -currentZoneTime.getTimezoneOffset() / 60;

    if(offsetZone < 0) {
      // 少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间
      // 西区时间比东区时间早 所以加时区间隔
      offsetZone = Math.abs(offsetZone) + 8;
      currentZoneTime.setHours(currentZoneHours + offsetZone)
    } else {
      // 大于0的是东区  东区时间直接跟京八区相减
      offsetZone -= 8; 
      currentZoneTime.setHours(currentZoneHours - offsetZone);
    }
    return transfromDate(currentZoneTime)
  } catch(e) {
    throw e
  }
}

/**
 * 日期显示两位数，一位则加0补齐
 * 
 * @param {Date} time 
 * @returns {years,month, day, hours, minutes, seconds}
 */
function transfromDate(time) {
  time = new Date(time)
  let years = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hours =  time.getHours()
  let minutes =  time.getMinutes()
  let seconds = time.getSeconds()
  return {
    years,
    month: month < 10 ? '0' + month : month,
    day: day < 10 ? '0' + day : day,
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds
  }
}