export default {
  computed: {
    scrollTopThreshold() {
      const threshold = this.$root.system.scrollThreshold,
        range = 15,
        navbarHeight = 60;

      let scrollTop = this.$root.system.scrollChange;
      scrollTop /= (threshold / range); // keep moving range 15px max

      return scrollTop / navbarHeight;

    }
  }
};
