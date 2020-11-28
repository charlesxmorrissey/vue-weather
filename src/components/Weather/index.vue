<template>
  <div class="weather">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  props: {
    msg: String,
  },
}
</script>

<style scoped>
.weather {
  background: tomato;
}

h1 {
  margin: 0;
}
</style>
