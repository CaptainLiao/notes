import './style/index.less'
import './lib/toolbarTip'

let azKeycode = new Array(26).fill().map((item:number, index:number) => 65 + index)

let keyMap = [
  {B: 66},
  {I: 73},
  {U: 85},
  {S: 83},
  {Y: 89},
  {Z: 90},
  {Tab: 9},
  {Ctrl: 8},
  {'Ctrl+B': 74},
  {'Ctrl+I': 81},
  {'Ctrl+U': 93},
  {'Ctrl+Z': 98},
  {'Ctrl+Y': 97},
  {'Shift+Ctrl+I': 97},
  {'Shift+Ctrl+U': 109},
  {'Shift+Ctrl+Y': 113},
  {Shift: 16},
]

console.log(keyMap)

document.addEventListener('keyup', (e) => {
  console.log(e.keyCode)
  let keyCode = e.keyCode
  
  switch(keyCode) {
    case 8:
      console.log('退格键')
      break;
  }
})
