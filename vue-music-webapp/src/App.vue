<template lang='html'>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-player></my-player>
  </div>
</template>

<script>
import MyHeader from 'components/MyHeader/MyHeader'
import MyTab from 'components/MyTab/MyTab'
import MyPlayer from 'components/MyPlayer/MyPlayer'
export default {
  name: 'App',
  components: {
    MyHeader,
    MyTab,
    MyPlayer
  }
}
</script>

<style lang="scss" scoped>

</style>
