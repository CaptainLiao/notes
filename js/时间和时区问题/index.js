// 获取绝对时间
// 即无论你在哪个时区，都和在京8区的时间一致
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

    let years = currentZoneTime.getFullYear()
    let month = currentZoneTime.getMonth() + 1
    let day = currentZoneTime.getDate()
    let hours =  currentZoneTime.getHours()
    let minutes =  currentZoneTime.getMinutes()
    let seconds = currentZoneTime.getSeconds()
    return {
      years,
      month: currentZoneTime.getMonth() + 1,
      day: month < 10 ? '0' + month : month,
      hours: hours < 10 ? '0' + hours : hours,
      minutes: minutes < 10 ? '0' + minutes : minutes,
      seconds: seconds < 10 ? '0' + seconds : seconds
    }
  } catch(e) {
    throw e
  }
}
