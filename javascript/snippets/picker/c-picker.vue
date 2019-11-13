<template>
  <div class="a-input-block">
    <div class="a-input-head">
      <div class="a-input-label">{{ label }}</div>
    </div>
    <div class="a-input-body" @click="onClick">
      <div class="a-input">{{ text }}</div>
      <div v-show="!text" class="a-input-placeholder">{{ placeholder }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import pickDate from './mixins/pickDate';
  import pickMonth from './mixins/pickMonth';

  export default {
    mixins: [
      pickDate,
      pickMonth,
    ],

    props: {
      label: String,
      placeholder: String,
      text: String,

      mode: String,
      range: Array,
      rangeKey: String,
      value: null,
      disabled: Boolean,

      // 当mode=date,month或time时可指定起至日期或时间
      min: String,
      max: String,
    },

    methods: {
      onClick() {
        if (this.disabled) return;

        if (this.mode === 'date') {
          this.$pickDate({
            min: this.min,
            max: this.max,
            value: this.value,
            onChange: this.onChange,
          });
        } else if (this.mode === 'month') {
          this.$pickMonth({
            min: this.min,
            max: this.max,
            value: this.value,
            onChange: this.onChange,
          });
        } else {
          this.pick(this.value, this.range);
        }
      },

      pick(value, ranges) {
        this.$pick({
          ranges: ranges,
          rkey: this.rangeKey,
          value: value,
          onChange: this.onChange,
          onCancel: this.onCancel,
          onColumnChange: this.onColumnChange
        })
      },

      onChange(value) {
        this.$emit('change', {
          detail: {
            value
          }
        });
      },

      onCancel() {
        this.$emit('cancel');
      },

      onColumnChange(column, value) {
        this.$emit('column-change', {
          detail: {
            column,
            value
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
$_: 1px;

.a-input-block {
  padding: $_*20;
  padding-top: $_*16;
}

.a-input-head {
  display: flex;

  .a-input-label {
    flex: 1;
  }
}

.a-input-body {
  padding-top: $_*6;
  display: flex;
  align-items: center;
  position: relative;
}

.a-input {
  font-size: 16*$_;
  font-weight: 100;
  display: block;
  flex: 1;
  padding: $_*10 0;
  height: 1.4em;
  line-height: inherit;
}

.a-input-placeholder {
  font-size: 16*$_;
  font-weight: 100;
  position: absolute;
  left: 0;
  top: $_*16;
  pointer-events: none;
  color: $color-gray;
}

.a-input-action-text {
  font-size: 16*$_;
  font-weight: 100;
}

.a-input-icon-clear {
  width: $_*26;
  height: $_*26;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAABGdBTUEAALGPC/xhBQAAA9JJREFUWAnNmU1rE0EYxzeLaAKSU4SSgqFeRIMv9OXU3rxH8CwKfgK/QD3YU4/5AgXFs9B+hniyLb6QihdLhISAPRWh0UPi/7+ZJ85OZ3dnN9ukA8m8Ps/zyzMzz85OCt4UaX9//16hUGiMRqO7UFPlB3XmHtp6yIIP2o5Q31tdXf3KviypkFZIwb2A4ceQXUopfwzoXcjupIV2BgXgTUBtwdBTGPJTAoaGQ8cQOt6hcRPAP0OdEZVE0Ha7ffXs7Ow1lL+E8msRerI2DyDYLJVKr+r1+t84JbGgh4eHN4bD4Xso2IhTkkNfy/f9J8vLy7+idEWCHhwc3IfQHrxYixLOsx0z1oG+xsrKyhebXiuogvwAyOs2oYtqA+xv6F63wZ4D5XQD8OOsPGn+aHoWnzVzGYR2LzcO1+S8IAlN22Qgi/4jQqCDwWALnRe9cXT7UeUNRhq9czL1Kk5+R2dRHzDHMkPXbYmzukfpTSfIcrmcmT+FLFnIFKTAo+qx+AnrQweXMaF8YWHBW1xc9E5OTrxOpxPqS6rUajWvUql43W7X6/f7ScM9bCo+wR7ycRuAoYHP7kRIeoOQTDRIw65JIDmeOlw8SyayUSaAQwMPGInp9PQ08KQMdIXVISnL2aAulyRsBQZ3VD67CMkYm+GoZZBmrOg3c3j1AV3bMDuS6oSiVyRFeTYPSNogo4/gekcMpsmTYPOCJBMZryAPTuRpIGWsTDc9yiS5Wc4SIQKF/7+qU4FSTxws+3OApJoq12hmj1IDk7kMxq25QXKNVhNjpxidd+4jNPFNcapkbhxRFhUNpN81JyM9OhWoCck16RK6XCHVuB43U2ZQG6RsLhqQKCC53qcAXLMe3qn8b66j9XFJkOYGm2YZYDMdMeDv6gAu5SRI0ZEXLNbonhzzfkD5khiIy10hdR1ZZDT5YxzzbgXhCa518iqPZrLeqMg1mNs863LMow1hk2PeDhqG7IhLPJrx0MvkCin6dFjqcDnmkQnTvkMdwdSzgFP+G2TPWE5K9IaLIZuelLJvMe3PqUd/Mm3iF/yxKTfbskJSTwpZvtxtiu0JqHrba0rHJcibiilAmYCyViwW+QtaQc98v1q84dMRQqC8+uOtGpZARx80yzJtk8G8hgyBEkjd+TQgwAurmSZls2HeOxHiHCgb1W3a+iw9q2xZb/IiQQUWwmsoz2LNtmjLdt1IFiarR8dd42WARf0I9W0ocgpdIuuYMwRt04ZtunUdk4CvN9rKl/7PBhNa3VNd3r9vTGDWecuCJdFQdwN8SbT+IcYzL49qcWvQpl9v+wcOqOBQIAcglAAAAABJRU5ErkJggg==") no-repeat;
  background-size: $_*14 $_*14;
  background-position: center;
}
</style>


