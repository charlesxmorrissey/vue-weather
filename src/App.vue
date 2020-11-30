<template>
  <Weather v-if="results" :results="results" />
  <Loader v-else />
</template>

<script>
import Loader from '@/components/Loader'
import Weather from '@/components/Weather'
import DarkSkyApi from '@/helpers/DarkSkyApi'

DarkSkyApi.apiKey = process.env.VUE_APP_DARK_SKY_SECRET_KEY

export default {
  name: 'App',
  components: {
    Loader,
    Weather,
  },

  data() {
    return {
      results: null,
    }
  },

  created() {
    this.fetchWeather().then((data) => {
      this.results = data
    })
  },

  methods: {
    fetchWeather: () => {
      return DarkSkyApi.loadCurrent()
    },
  },
}
</script>

<style>
#app {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
