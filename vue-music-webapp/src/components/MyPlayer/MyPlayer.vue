<template>
  <div class="my-player">
    <!-- 正常的播放器 -->
    <div class="normal-player"></div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";
  export default {
    name: 'MyPlayer',
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
    destroyed () {

    }
  }
</script>

<style lang='scss' scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.my-player {
  .normal-player {
    position: fixed;
    left: 0px;
    right: 0px;
    z-index: 150;
    bottom: 0px;
    background: $color-background;

  }
}

</style>
