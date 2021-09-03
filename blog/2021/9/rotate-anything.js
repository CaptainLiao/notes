

/**
 * 用例：
  const rotate = rotateAnything({elemId: 'rotateElementId'})
  rotate.start(startParam)
  rotate.end(endParam) // 返回 promise
  rotate.stop() // 返回旋转的总角度（单位deg）

  startParam 参数如下：
  |    参数    |   类型   |  必填                 |  含义  |
  -----------------------------------
  | angle    |  number  |   否，缺省0            |  开始旋转的角度（deg） |
  | easingFn |  Function |  否 ，缺省easeInQuad   |  旋转的缓动函数（https://easings.net/cn#） |
  | duration |  number  |  否 ，缺省2000         |  缓动函数的持续时间（ms） |

  endParam 参数如下：
  |    参数    |   类型   |  必填   |  含义  |
  -----------------------------------
  | angle    |  number  |   否，缺省0             |  结束旋转的角度（deg） |
  | easingFn |  Function |  否 ，缺省easeOutQuad  |  旋转的缓动函数（https://easings.net/cn#） |
  | duration |  number  |  否 ，缺省1200        |  缓动函数的持续时间（ms） |

 **/

const ROTATE_STATUS = {
  START: 'start',
  END: 'end',
  STOP: 'stop'
}
function rotateAnything({elemId}) {
  const ONE_CIRCLE = 360
  const elem = document.getElementById(elemId)
  elem.style.willChange = 'transform'

  let tweenRes = null
  let rotateStatu = ''

  return {
    start({
      angle = 0, 
      easingFn = easeInQuad,
      duration = 2000
    } = {}) {
      rotateStatu = ROTATE_STATUS.START
      if (tweenRes) tweenRes.stop()

      tweenRes = tweenExcution({
        startValue: angle,
        endValue: angle + 720,
        duration,
        infinite: true,
        easingFn,
        stepCb: v => {
          elem.style.transform = `rotate(${v}deg)`
        }
      })
    },
    end({
      angle = 0,
      easingFn = easeOutQuad,
      duration = 1200
    } = {}) {
      if (rotateStatu !== ROTATE_STATUS.START) return Promise.resolve();
      tweenRes.stop();

      rotateStatu = ROTATE_STATUS.END
      const currentValue = tweenRes.getState()
      const remainAngle = ONE_CIRCLE - currentValue % ONE_CIRCLE + angle

      tweenExcution({
        startValue: currentValue,
        endValue: currentValue + remainAngle,
        duration,
        easingFn,
        infinite: false,
        stepCb: v => {
          elem.style.transform = `rotate(${v}deg)`
        }
      })
      return sleep(duration)
    },
    stop() {
      rotateStatu = ROTATE_STATUS.STOP
      tweenRes.stop()
      return tweenRes.getState()
    }
  }
}


// 缓动函数：https://easings.net/cn#
// x 代表当前动画的运动时间点[0, 1]，并返回这个时间点动画所处的位置
function easeInQuad(x) {
  return x * x;
}
function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

function tweenExcution ({
  startValue, 
  endValue, 
  duration,  
  infinite,
  easingFn, 
  stepCb
}) {
  const perUpdateDistance = 1000 / (duration * 60)
  const diffValue = endValue - startValue

  let position = 0
  let prevState = 0
  let state = 0
  let maxDiffState = 0
  let shouldStop = false

  function step () {
    if (shouldStop) return

    if (position < 1) { // 按 easingFn 进行运动
      position += perUpdateDistance
      prevState = state
      state = startValue + diffValue * easingFn(position)
      stepCb(state)
      rAF(step)
    } else if (infinite) {
      if (maxDiffState == 0) {
        maxDiffState = state - prevState
      }
      state += maxDiffState
            
      stepCb(state)
      rAF(step)
    }
  }

  step()

  return {
    stop() {
      shouldStop = true
    },
    getState() {
      return state
    }
  }
}

function rAF(cb) {
  requestAnimationFrame(cb)
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

