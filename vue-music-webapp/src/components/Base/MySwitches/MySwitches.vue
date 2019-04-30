<template lang='html'>
  <ul class='my-switches'>
    <li class='switch-item' v-for="(item, index) in switches" :key="index" @click='switchItem(index)' :class='{"active": currentIndex === index}'>
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'MySwitches',
    data() {
      return {
      }
    },
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switch', index)
      }
    },
    // 过滤器设计目的就是用于简单的文本转换
    filters: {
    }
  }
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.my-switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;
  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;
    &.active {
      background: $color-highlight-background;
      color: $color-text;
    }
  }
}

</style>
