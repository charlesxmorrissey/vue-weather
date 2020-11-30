<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style scoped>
.loader {
  display: inline-block;
  height: 80px;
  position: relative;
  width: 80px;
}

.loader::before,
.loader::after {
  animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  border-radius: 50%;
  border: 4px solid var(--grey-50);
  content: '';
  opacity: 1;
  position: absolute;
}

.loader::after {
  animation-delay: -0.5s;
}

@keyframes ripple {
  0% {
    height: 0;
    left: 36px;
    opacity: 1;
    top: 36px;
    width: 0;
  }

  100% {
    height: 72px;
    left: 0px;
    opacity: 0;
    top: 0px;
    width: 72px;
  }
}
</style>
