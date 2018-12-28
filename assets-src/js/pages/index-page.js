import SliderSection from "../fragments/index__SliderSection.vue";
import Banner from "../fragments/index__Banner.vue";
import SaleProducts from "../fragments/index__PromotionsSection.vue";
import TopProducts from "../fragments/index__TopProductsSection.vue";
import Discover from "../fragments/index__DiscoverSection.vue";
import Service from "../fragments/index__Service.vue";
import News from "../fragments/index__News.vue";

export default {
  components: {
    SliderSection,
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
        commit: { en: [], vi: [] }
      }
    };
  },
  render(h) {
    const body = layoutJSON.map(layout => {
      const component = {
        CollectionSlider: () => (
          <TopProducts
            collections={layout.collections.filter(
              c => c.products && c.products.length > 0
            )}
            displayCategory={false}
          />
        ),
        Promotions: () => <SaleProducts />,
        Banner: () => <Banner banner={layout.banner} />
      }[layout.type];

      return component();
    });
    return (
      <div>
        <SliderSection />
        {body}
        <Discover />
        <Service content={this.data.commit} />
        <News />
      </div>
    );
  },
  async mounted() {
    const data = await $.get(
      "https://server.vaithuhay.com/b/settings/page/index"
    );
    Object.assign(this.data, data);
  }
};
