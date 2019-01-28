<style lang="scss" module>
.loading {
  height: 100vh;
  background-color: white;
}
</style>
<template lang="pug">
  transition(name="vth-fade")
    div(:class="$style.loading")
</template>
<script>
export default {};
</script>
