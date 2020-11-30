<template>
  <div class="weather" :style="bgStyle">
    <h1 class="weatherTitle">
      {{ results.summary }} ({{ results.icon }}) &mdash;
      {{ Math.round(results.temperature) }}&deg;
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
  },
}
</script>

<style scoped>
.weather {
  height: 100%;
  padding: 0 32px;
  width: 100%;
}

.weatherTitle {
  background: var(--white);
  font-size: 16px;
  font-weight: 300;
  padding: 20px;
  position: absolute;
  right: 32px;
  top: 0;
}

@media screen and (min-width: 400px) {
  .weatherTitle {
    font-size: 24px;
  }
}

@media screen and (min-width: 1000px) {
  .weatherTitle {
    font-size: 32px;
  }
}
</style>
