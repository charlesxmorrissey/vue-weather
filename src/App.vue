<template>
  <Weather msg="Welcome to Your Vue.js App" />
</template>

<script>
import Weather from './components/Weather'

export default {
  name: 'App',
  components: {
    Weather,
  },
}
</script>

<style>
@import-normalize;

html,
body {
  background: lime;
  height: 100%;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
