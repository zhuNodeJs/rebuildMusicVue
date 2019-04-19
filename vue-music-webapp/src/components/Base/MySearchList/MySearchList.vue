<template>
  <div class="my-search-list" v-show="searches.length">
    <transition-group name='list' tag='ul'>
      <li class="search-item" @click="selectItem(item)" v-for="item in searches" :key="item">
        <span class="text">{{item}}</span>

        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
/**
 * 在实现列表的过程中，如果需要使用过渡的元素是通过v-for渲染出来的，则不能使用transition来渲染，而要使用transition-group来渲染了，
 * 若要为v-for循环创建的元素设置动画，必须为每一个元素设置:key属性。
 * v-move 和 v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果
 */
  export default {
    name: 'MySearchList',
    data() {
      return {
      }
    },
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      deleteOne(item) {
        this.$emit('delete', item)
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.my-search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    &.list-enter-active, &.list-leave-active {
      transition: all 0.1s;
    }
    &.list-enter, &.list-leave-to {
      height: 0;
    }
    .text {
      flex: 1;
      color: $color-text-l;
    }
    .icon {
      @include extend-click();
      .icon-delete {
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
  }
}
</style>
