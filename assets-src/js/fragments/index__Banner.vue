<style lang="scss" module></style>
<template lang="pug">
  wrapper
    img.img-fluid(:src="img")
</template>
<script>
export default {
  name: "Banner",
  components: {
    Wrapper: {
      functional: true,
      render: (h, { parent, children }) => {
        const { banner } = parent;
        if (!banner.link.url) return <div>{children}</div>;
        const props = {
          href: banner.link.url
        };
        if (banner.link.newTab) props["target"] = "_blank";
        return h("a", { attrs: props }, children);
      }
    }
  },
  props: {
    banner: {
      type: Object,
      required: true
    }
  },
  computed: {
    img() {
      const {
        banner: { image }
      } = this;
      if (this.$mq.phone) return image.mobile.thumbnails["600w"];
      else return image.desktop.thumbnails["1920w"];
    }
  }
};
</script>
