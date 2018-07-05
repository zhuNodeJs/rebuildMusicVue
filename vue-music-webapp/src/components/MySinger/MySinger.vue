<template>
  <div class="my-singer" ref="singerRef">
    <my-phone-list></my-phone-list>
  </div>
</template>

<script>
 import MyPhoneList from 'components/Base/MyPhoneList/MyPhoneList'
  export default {
    name: 'MySinger',
    
    components: {
      MyPhoneList
    }
  }
</script>

<style lang='scss' scoped>

</style>
