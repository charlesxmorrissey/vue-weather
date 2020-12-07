<template>
  <div class="weather" :style="bgStyle">
    <h1 class="weatherTitle">
      {{ currentWeather }}
    </h1>
  </div>
</template>

<script>
import { BACKGROUND_COLOR_MAP } from '@/constants'

export default {
  name: 'Weather',
  props: {
    results: Object,
  },

  computed: {
    bgStyle() {
      return {
        backgroundColor:
          BACKGROUND_COLOR_MAP[this.results.icon] ||
          BACKGROUND_COLOR_MAP.default,
      }
    },

    currentWeather() {
      const { icon, summary, temperature } = this.results

      return `${summary} (${icon}) \u2014 ${Math.round(temperature)}\u00B0`
    },
  },
}
</script>

<style scoped>
.weather {
  height: 100%;
  padding: 0 16px;
  width: 100%;
}

@media screen and (min-width: 400px) {
  .weather {
    padding: 0 32px;
  }
}

.weatherTitle {
  background: var(--white);
  border-radius: 4px;
  font-size: 16px;
  font-weight: 300;
  padding: 20px;
}

@media screen and (min-width: 400px) {
  .weatherTitle {
    font-size: 24px;
    right: 32px;
    position: absolute;
    top: 0;
  }
}

@media screen and (min-width: 1000px) {
  .weatherTitle {
    font-size: 32px;
  }
}
</style>
