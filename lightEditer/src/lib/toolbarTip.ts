/**
 * 给顶部每个工具绑定事件
 *  * hover 显示tips
 *  * click 处理响应动作
 */

import debounce from './utils/debounce'
let getByClass = document.getElementsByClassName.bind(document)

let classes:any = {
  undo: {
    t: '撤销',
    k: 'Ctrl+Z'
  },
  redo: {
    t: '重做',
    k: 'Ctrl+Y'
  },
  formatpainter: {
    t: '格式刷',
    k: '双击使用连续格式刷'
  },
  clean: {
    t: '清除格式',
    k: ''
  },
  bold: {
    t: '粗体',
    k: 'Ctrl+B'
  },
  italic: {
    t: '斜体',
    k: 'Ctrl+I'
  },
  underline: {
    t: '下划线',
    k: 'Ctrl+U'
  },
  strike: {
    t: '中划线',
    k: 'Ctrl+Shift+S'
  },
  'color-picker': {
    t: '文本颜色',
    k: ''
  },
  'bg-color-picker': {
    t: '背景颜色',
    k: ''
  },
  order: {
    t: '有序列表',
    k: 'Ctrl+Shift+U'
  },
  unorder: {
    t: '无序列表',
    k: 'Ctrl+Shift+I'
  },
  bullet: {
    t: '任务列表',
    k: 'Ctrl+Shift+Y'
  },
  'pos-indent': {
    t: '增加缩进',
    k: 'Tab'
  },
  'neg-indent': {
    t: '减少缩进',
    k: 'Shift+Tab'
  },
  align: {
    t: '对齐',
    k: ''
  },
  'line-space': {
    t: '行距',
    k: ''
  },
}

let toolbars = getByClass('button-none')
let toolbarTip = <HTMLElement>getByClass('toolbar-tip')[0]
let keys = Object.keys(classes)

;[].forEach.call(toolbars, (bar:HTMLElement, i:number) => {
  let setToolbarTip = debounce(function(e:any) {
    let {target} = e
    let k = keys[i]
    let c = classes[k]

    toolbarTip.innerHTML = `<div>${c.t}</div><div>${c.k}</div>`
    toolbarTip.style.left = target.offsetLeft + target.offsetWidth/2 + 'px'
    toolbarTip.classList.remove('hidden')
  })


  bar.addEventListener('mouseenter', setToolbarTip)
  bar.addEventListener('mouseleave', () => toolbarTip.classList.add('hidden'))
  bar.addEventListener('click', function(e) {
    
    let key = [].slice.call(this.classList)
      .map((res:string) => keys.indexOf(res) === -1 ? 0 : res)
      .filter(Boolean)[0]

    console.log(key)
  })

})

document.addEventListener('keydown', function(e) {
  console.log(e.keyCode)
})
