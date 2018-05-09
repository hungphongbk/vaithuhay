<style lang="scss">
</style>
<template lang="pug">
  transition(name="vth-fade")
    div
      slider-section
      new-products
      sale-products
      top-products
      discover
      service(:content="data.commit")
      news
</template>
<script>
  import SliderSection from '../fragments/index__SliderSection.vue';
  import NewProducts   from '../fragments/index__NewProductsSection.vue';
  import SaleProducts  from '../fragments/index__SaleProductsSection.vue';
  import TopProducts   from '../fragments/index__TopProductsSection.vue';
  import Discover      from '../fragments/index__DiscoverSection.vue';
  import Service       from '../fragments/index__Service.vue';
  import News          from '../fragments/index__News.vue';

  export default {
    components: {
      SliderSection,
      NewProducts,
      SaleProducts,
      TopProducts,
      Discover,
      Service,
      News
    },
    data() {
      return {
        data: {
          version: 1.01,
          commit: {en: [], vi: []}
        }
      };
    },
    async mounted() {
      const data = await $.get('https://api.v1.hungphongbk.com/vaithuhay/b/settings/page/index');
      Object.assign(this.data, data);
    }
  };
</script>
