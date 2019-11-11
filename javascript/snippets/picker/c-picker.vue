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

