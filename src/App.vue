<template>
  <div id="app">
    <top-header></top-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import topHeader from 'components/top-header/top-header'
import tab from 'components/tab/tab'
export default {
  components: {
    topHeader,
    tab
  }
}
</script>

<style>

</style>
