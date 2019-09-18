var a = `点击立即预订表示已经阅读并同意 
<a href=https://jp.rsscc.com/hainan_airlines_battery_notice.html><font color='#1985FF'>锂电池安全运输告旅客书，</font></a>
<a href=https://cdn.133.cn/ticket/web/clause/ticket.html><font color='#1985FF'>机票购买服务协议，</font></a>
<a href=http://www.ceair.com/guide2/lkyxlysztj/t2016721_26905.html><font color='#1985FF'>中国东方航空国内运输总条件，</font></a>
<a href=https://wtest.133.cn/hangban/supports/provision?id=%E4%B8%9C%E4%B8%8A%E8%88%AA%E7%BB%9F%E4%B8%80%E8%BF%90%E8%90%A5%E7%9A%84%E6%B8%A9%E9%A6%A8%E6%8F%90%E7%A4%BA><font color='#1985FF'>东上航统一运营的温馨提示</font></a>`

function link2array(link) {
  return link.split('</a>')
    .filter(Boolean)
    .map(atag => {
      return {
        url: atag.replace(/(.*)href=(.*)>(.+)/, '$2'),
        name: atag.replace(/(.*)>(.*)/, '$2')
      }
    })
}

 var c = a.split('</a>')
.filter(Boolean)
.map(atag => {
  const arr = atag.split('href=')[1].split('')
  let url = ''
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === '>') break
    url += arr[i]
  }

  const name = atag.split(url + '>')[1]

  return {
    url,
    name: name.replace(/[^\u4e00-\u9fa5]*([\u4e00-\u9fa5]+).*/, '$1')
  }
})

console.log(c)