import Vue from 'vue'
import CSlide from './_slide'
import './swiper.scss'

const rAF = window.requestAnimationFram || function(f) {
  setTimeout(f, 16);
};

export default Vue.component('swiper', {
  props: {
    indicatorDots: {
      type: Boolean,
      default: true
    },
    indicatorColor: {
      type: 'Color',
      default: 'rgba(0, 0, 0, .3)'
    },
    indicatorActiveColor: {
      type: 'Color',
      default: '#000'
    },
    duration: {
      type: Number,
      default: 500
    },
    previousMargin: {
      type: String,
      default: '12px'
    },
    nextMargin: {
      type: String,
      default: '0px'
    },
    
  },
  data () {
    return {
      offsetX: 0,
      itemNums: 0,
      itemWidth: 0,
      currentPos: 0,
      pause: false,
      isScrolling: false,
    };
  },

  computed: {
    transform() {
      return `translateX(${this.offsetX}px)`
    },
  },

  mounted() {
    let slots = this.$refs['swiper-wrap'].$children
    if (!slots || !slots.length) return;
    
    let elm = slots[0].$el
    let cWidth = elm.clientWidth - 2*parseInt(this.previousMargin)
    
    slots.forEach(item => item.$el.style.width = `${cWidth}px`)

    this.itemWidth = cWidth;
    
  },

  components: {CSlide},

  methods: {
    onTouchStart() {
      this.pause = true;
    },
    onLeftSlide(e, distance) {
      this.stopPropagation(e)
      this.move(distance)
    },
    onLeftSlideEnd(e, distance, speed) {
      this.stopPropagation(e)

      if (-this.currentPos !== this.itemNums - 1) {
        if (Math.abs(distance) > this.itemWidth/2 || ~~(speed*100)){
          this.currentPos--
        }
      }
      this.transOffsetX()
    },

    onRightSlide(e, distance) {
      this.stopPropagation(e)
      this.move(distance)
    },
    onRightSlideEnd(e, distance, speed) {
      this.stopPropagation(e)

      if (this.currentPos !== 0) {
        if (Math.abs(distance) > this.itemWidth/2 || ~~(speed*100)){
          this.currentPos++
        }
      }

      this.transOffsetX()
    },

    onTouchCancle(e) {
      this.stopPropagation(e)
      this.transOffsetX()
    },
    onUpDownSlide(e) {
      if (this.isScrolling) this.stopPropagation(e)
    },

    move(step) {
      this.offsetX += step;
      console.log(this.itemWidth*this.currentPos, this.offsetX)
    },

    transOffsetX() {
      this.pause = false

      let duration = Math.ceil(this.duration / 16)
      let v = 2*(this.itemWidth*this.currentPos - this.offsetX)/duration
      let a = -v/duration
      let t = 0
      let _this = this

      ;(function loop() {
        _this.isScrolling = t !== duration
        if (_this.pause || t === duration || v === 0) return

        ++t;
        _this.move(getS(t) - getS(t-1));
        rAF(loop);
      }())

      function getS(t) {
        return v*t + a*t*t/2;
      }
    },

    stopPropagation(e) {
      e.preventDefault()
      e.stopPropagation()
      return false;
    }
  },

  render (h) {
    let slots = this.$slots.default
    if (!slots || !slots.length) return;

    let current = Math.abs(this.currentPos)
    this.itemNums = slots.length
    
    return h('div', {
      attrs: {
        class: 'swiper'
      }
    }, [
      h('c-slide', {
        ref: 'swiper-wrap',
        attrs: {
          class: 'swiper-wrap'
        },
        style: {
          transform: this.transform,
          marginLeft: this.previousMargin
        },
        nativeOn: {
          'mousedown': this.onTouchCancle
        },
        on: {
          'touch-start': this.onTouchStart,
          'touch-cancle': this.onTouchCancle,

          'left-slide': this.onLeftSlide,
          'right-slide': this.onRightSlide,
          'right-slide-end': this.onRightSlideEnd,
          'left-slide-end': this.onLeftSlideEnd,
          
          'up-slide': this.onUpDownSlide,
          'down-slide': this.onUpDownSlide,
          'up-slide-end': this.onTouchCancle,
          'down-slide-end': this.onTouchCancle,
        }}, slots
      ),
      this.indicatorDots && h('div', {
        attrs: {
          class: 'swiper-dots'
        }
      }, slots.map((item, index) => h('div', {
        style: {
          transition: `all ${this.duration}ms cubic-bezier(.15,.85,.35,1)`,
          backgroundColor: index === (current === this.itemNums ? 0 : current)
            ? this.indicatorActiveColor
            : this.indicatorColor
        },
        'class': {
          dot: true,
        }
      }))),
    ])
  },

})

// function sleep(time) {
//   return new Promise(resolve => setTimeout(resolve, time))
// }
