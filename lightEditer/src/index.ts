import './style/index.less'
import './lib/toolbarTip'
import keymap from './lib/getKeymap'

console.log(keymap)



document.addEventListener('keyup', (e) => {
  console.log(e.keyCode)
  let keyCode = e.keyCode
  
  switch(keyCode) {
    case 8:
      console.log('退格键')
      break;
  }
})
