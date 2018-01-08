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

  // 下面两行的逻辑有些繁复，注释以免自己懵逼
    // 因 offsetZone 带有正负
    // 再 offsetZone > 0 表示西时区（西区晚），则相对于京8区实际晚了 |offsetZone| + 8 个小时
    // 又 offsetZone < 0 表示东时区（东区早），则相对于京8区实际早了 -|offsetZone| + 8 个小时
    offsetZone += 8;
    currentZoneTime.setHours(currentZoneHours + offsetZone);
    return transfromDate(currentZoneTime)
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

