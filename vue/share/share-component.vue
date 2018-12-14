<!-- 分享到微信及朋友圈弹窗 -->
<template>
<div v-if="show">
  <div class="a-overlay" @touchmove.stop.prevent @click="tapClose"></div>
  <div class="wrap">
    <div class="popup a-text-center">
      <div class="a-text-medium">邀请好友助力</div>
      <div class="subtitle a-text-14">延误5分钟，立赔10元！</div>
      <div class="share-content fx-row fx-m-between a-text-12">
        <div @click="tapShareWxminiprogram">
          <img class="image" src="https://cdn.133.cn/ticket/images/hangban/vue/delaycare/share_wx.png" alt="">
          <div>微信传递</div>
        </div>
        <div @click="tapShareTimeline">
          <img class="image" src="https://cdn.133.cn/ticket/images/hangban/vue/delaycare/share_pyq.png" alt="">
          <div>朋友圈传递</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import device from "@/utils/device"
import env from '@/utils/env'
import get from '@/utils/get'

import share from './share'
import API from '../../../service/api'

export default {
  props: {
    arrcityname: String,
    id: String,
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    tapShareWxminiprogram() {
      this.tapClose()
      if (!env.isNative) return this.$notify({type: 'info', message: '点击浏览器右上角分享给好友'})

      let opts = {
        title: `我去${this.arrcityname}的航班担心延误`,
        path: `projects/home/main?p=dc-s&id=${this.id}`,
        backgroundImage: 'https://cdn.133.cn/ticket/images/hangban/vue/delaycare/share_to_friends.png'
      }

      // 获取分享的图片
      return this.$withLoading(API[331392], {transparent: true})(this.id)
        .then(
          res => opts.backgroundImage = get(res, 'res.bd.data.imgUrl'),
          e => console.error('#331392 获取图片失败：', e)
        )
        .then(() => checkNativeSupportVersion())
        .then(isSupport => {
          return isSupport 
            ? share.toMiniprogram(opts)
            : this.shareWeixin()
        })
    },
    tapShareTimeline() {
      this.tapClose()

      if (!env.isNative) return this.$notify({type: 'info', message: '点击浏览器右上角分享给好友'})

      let opts = {
        title: `我去${this.arrcityname}的航班担心延误`,
        path: `projects/home/main?p=dc-s&id=${this.id}`,
        backgroundImage: 'https://cdn.133.cn/ticket/images/hangban/vue/delaycare/share_to_friends2.png'
      }

      return checkNativeSupportVersion()
        .then(isSupport => {
          return isSupport
            ? this.$withLoading(share.toTimeline, {title: '正在生成图片'})(opts)
            : this.shareWeixin()
        })
    },

    tapClose() {
      this.$emit('close')
    },

    shareWeixin(){
      let opts = {
        title:'帮我助力，你也有奖',
        desc: '我的延误奖励就靠大家啦',
        link: `${window.HLCX_H5_BASE_URL}/delaycare/share/detail-others?id=${this.id}`,
        backgroundImage: 'https://cdn.133.cn/ticket/images/hangban/vue/delaycare/share_to_friends.png',
      }

      return share.toWeixin(opts)
    },
  }
}

// helper

// http://192.168.0.41/hbgjclient/doc/hloneapi/index.html#/api?id=sharepage
function checkNativeSupportVersion(ver = '7.1.2') {
  return device.get()
    .then(({version} = {}) => {
      if (!version) return false
      if (ver === version) return true

      let lowestV = ver.split('.')
      return version.split('.')
        .some((v,i) => ~~v > ~~lowestV[i])
    })
}

</script>
<style lang='scss' scoped>
$px: 1rem / 20;

.wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10001;
}

.popup {
  margin: 12*$px;
  padding: 10*$px 0 16*$px;
  border-radius: 8*$px;
  background: #fff;
  text-align: center;
}
.subtitle {
  padding: 6*$px 0 11*$px 0;
  color: RGBA(102, 102, 102, 1);
}
.share-content {
  padding: 22*$px 64*$px 0 64*$px;
  border-top: 0.5px solid RGBA(0, 0, 0, 0.2);

  .image {
    margin-bottom: 4*$px;
    width: 48*$px;
    height: 48*$px;
  }
}
</style>