<template>
  <div class="my-no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>

<script>
  export default {
    name: 'MyNoResult',
    data() {
      return {
      }
    },
    props: {
      title: {
        type: String,
        default: '抱歉，暂无数据'
      }
    },
    watch: {

    },
    filters: {},
    methods: {},
    computed: {

    },
    created() {

    },
    mounted() {

    },
    destroyed() {

    }
  }
</script>

<style lang="scss" scoped>
@import '~common/scss/const.scss';
@import '~common/scss/mixin.scss';

.my-no-result {
  text-align: center;
  .no-result-icon {
    width: 86px;
    height: 90px;
    margin: 0 auto;
    @include bg-image('no-result');
    background-size: 86px 90px;
  }
  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text-d;
  }
}
</style>
