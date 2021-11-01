<!--  -->
<template>
  <div class="slider" ref="slider">
    <c-slide class="slider-wrap fx-row" ref="slider-wrap"
      @left-slide="onLeftSlide"
      @right-slide="onLeftSlide"
      @left-slide-end="onLeftSlideEnd"
      @right-slide-end="onLeftSlideEnd"
      :style="{'transform': transform, 'transition': transition}">

      <slot></slot>

    </c-slide>
  </div>
</template>

<script>
import CSlide from './_slide'

const rAF = window.requestAnimationFram || function(f) {
  setTimeout(f, 16);
};

export default {
  props: {
    showAll: { // 向左滚动显示全部内容后，复位
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      barWidth: 0,
      offsetX:0,
      transform: '',
      transition: '',
      duration: '500'
    };
  },

  components: {CSlide},

  mounted() {
    const {children} = this.$refs['slider-wrap'].$el
    if (!children || !children.length) return

    const totalWidth = [...children].map(el => getRealWidth(el)).reduce((acc, w) => acc + w, 0)
    const sliderWidth = this.$refs['slider'].offsetWidth
    const maxScrollDistance = Math.floor(totalWidth / sliderWidth) * sliderWidth - (sliderWidth - totalWidth % sliderWidth)
    this.__minDistance = -maxScrollDistance
    this.__isLocked = totalWidth <= sliderWidth

    if (this.showAll) {
      if (this.__isLocked) return
      this.$_transOffsetX2(this.__minDistance)
      setTimeout(() => this.$_transOffsetX2(-this.__minDistance), ~~this.duration + 200)
    }
  },

  methods: {
    onLeftSlide(e, distance) {
      if (this.__isLocked) return
      this.$_stopPropagation(e)
      this.$_move(distance)
    },

    onLeftSlideEnd(e, distance, speed) {
      if (this.__isLocked) return
      this.$_stopPropagation(e)
      this.$_transOffsetX2(speed*300)
    },

    $_transOffsetX2(speed) {
      clearTimeout(this.timer$)
      this.offsetX += speed
      this.transform = `translateX(${this.offsetX}px)`
      this.transition = `transform ${this.duration}ms ease-out`
      this.timer$ = setTimeout(() => this.$_resetMove(), 0)
    },

    $_transOffsetX(speed) {
      if (this.$_resetMove()) return 
      if (speed < 5 && speed > -5) return

      const MAX_STEP = 20

      rAF(() => {
        let dist = ~~speed;
        if (dist > MAX_STEP) {
          dist = MAX_STEP;
        } else if (dist < -MAX_STEP) {
          dist = -MAX_STEP;
        }

        if (this.$_move(dist)) {
          speed = 0;
        }
        this.$_transOffsetX(speed - dist);
      });
    },

    $_move(step) {
      this.offsetX += step
      this.transform = `translateX(${this.offsetX}px)`
      this.transition = ''
      return Math.abs(step) <= 2
    },

    $_resetMove() {
      const needRest = this.offsetX >= 0 || this.offsetX <= this.__minDistance
      if (!needRest) return needRest

      if (this.offsetX >= 0) {
        this.offsetX = 0
      }

      if (this.offsetX <= this.__minDistance) {
        this.offsetX = this.__minDistance
      }

      this.transform = `translateX(${this.offsetX}px)`
      this.transition = `transform ${this.duration}ms ease-out`

      return needRest
    },

    $_stopPropagation(e) {
      e.preventDefault()
      e.stopPropagation()
      return false;
    }
  }
}


function getRealWidth(ele) {
  const sty = window.getComputedStyle(ele, null)
  return ele.offsetWidth 
    + parseFloat(sty.getPropertyValue('margin-left'))
    + parseFloat(sty.getPropertyValue('margin-right'))
}
</script>
<style lang='scss' scoped>
$px: 1rem / 20;
.slider {
  width: 100%;
  overflow: hidden;
}

.slider-wrap {
  width: 10000000%;
}
</style>