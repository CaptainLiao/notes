var xhr;
if(window.XMLHttpRequest) {
  xhr = new XMLHttpRequest()
}
else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

xhr.onreadstatechange = () => {
  if(xhr.readyState === 4) {
    var status = xhr.status;
    if(status >= 200 && status < 300 || status === 340) {
      console.log(xhr.responseText)
    }else {
      console.log('request fail: ' + xhr.status);
    }
  }
}

xhr.open('get', url, false);
xhr.timeout = 1000;
xhr.ontimeout = function() {
  alert('Request timeout')
}
xhr.send(null);