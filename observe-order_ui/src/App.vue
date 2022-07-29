<template>
  <!-- <div id="app">
    <MyCommonList/>
  </div> -->
  <div id="app">
    <router-view name="fullPage"/>
    <router-view name="navigator"/>
  </div>
  
  
</template>

<script>

export default {
  name: "App",
  components: {},

  methods: {
  },
  created() {
    
  },
};
</script>
<style>
body {
  margin: 0;

  background: #1a3d5f;;

}
</style>
