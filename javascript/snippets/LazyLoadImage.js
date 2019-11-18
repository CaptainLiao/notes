import 'intersection-observer'

IntersectionObserver.prototype['THROTTLE_TIMEOUT'] = 300

const DefaultLoadingImage = '默认loading图片'

export default class LazyLoadImage {
  constructor({
    loadingImage = DefaultLoadingImage
  }) {
    this._observer = null
    this._loadingImage = loadingImage
    this._init()
  }

  _init() {
    const observerOpts = {
      root: null,
      rootMargin: "500px 200px 1000px 200px", // 扩大视窗范围，提前加载
      threshold: 0.1
    }

    this._observer = new IntersectionObserver(callback, observerOpts)

    function callback(entries){
      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        const url = entry.target.getAttribute('data-src')
        entry.target.setAttribute('src', url)
        entry.target.setAttribute('data-src', '')

        // 取消后续观察
        this._observer && this._observer.unobserve(entry.target)
      })
    }
  }

  // 让每个img标签自行调用add方法，把自己添加到观察者队列中
  add(entry) {
    this._observer && this._observer.observe(entry.el);
  }

}


// 全局只实例化一个类，实例执行init方法自己创建观察者队列
const lazyload = new LazyLoadImage();
// 让每个img标签自行调用add方法，把自己添加到观察者队列中
// 用法： <img v-lazy="图片地址" />
Vue.directive('lazy', {
    bind(el, binding) {
        el.setAttribute('data-src', binding.value);
        el.setAttribute('src', lazyload._loadingImage);
        lazyload.add({el: el, val: binding.value});
    }
})