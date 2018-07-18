export default {
  computed: {
    scrollTopThreshold() {
      const threshold = 160,
        range = 15,
        navbarHeight = 60;

      let scrollTop = this.$root.system.scrollTop;
      if (scrollTop > threshold) scrollTop = threshold;
      scrollTop /= (threshold/range); // keep moving range 15px max

      return scrollTop / navbarHeight;

    }
  }
};
