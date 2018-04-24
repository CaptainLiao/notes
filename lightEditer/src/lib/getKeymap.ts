const START = 65
let azKeycode = ( <any>new Array(26) ).fill()
  .reduce((res:any, item:undefined, index: number) => {
    let code = index + 65
    res.push({[String.fromCharCode(code)]: code})
    return res
  }, [])

let otherKeyCode = [
  {Ctrl: 8},
  {Shift: 16},
  {'Ctrl+Shift': 24}
]

let keymap:any = []
azKeycode.concat([ {Tab: 9} ])
  .forEach((item:Object, index:number) => {
    let k = Object.keys(item)[0]
    otherKeyCode.forEach(o => {
      let o_k = Object.keys(o)[0]
      keymap.push({[o_k+ '+' +k]: item[k] +'+'+ o[o_k]})
    })
  })

export default [...azKeycode, ...keymap]