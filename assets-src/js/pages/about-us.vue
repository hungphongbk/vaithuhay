<style lang="scss" scoped>
@import "../../sass/inc/inc";

.about-us /deep/ {
  * {
    line-height: 1.7em;
  }
  .vth-section-title {
    margin: {
      top: 50px;
      bottom: 60px;
    }
    @include responsive("xs-max") {
      margin: {
        top: 25px;
        bottom: 30px;
      }
    }
  }
  .vth-section {
    padding-bottom: 100px;
  }
}
</style>
<template lang="pug">
  .about-us
    slider-section(:slides="data.slides")
    about-us-section#ve-chung-toi
    mission-section#nhiem-vu
    member-section#thanh-vien
    clients-section#thuong-hieu
    join-section
</template>
<script>
import SliderSection from "../fragments/about-us__SliderSection.vue";
import AboutUsSection from "../fragments/about-us__AboutUs.vue";
import MissionSection from "../fragments/about-us__Mission.vue";
import MemberSection from "../fragments/about-us__Members.vue";
import ClientsSection from "../fragments/about-us__Clients.vue";
import JoinSection from "../fragments/about-us__Join.vue";

const $ = jQuery;

export default {
  components: {
    SliderSection,
    AboutUsSection,
    MissionSection,
    MemberSection,
    ClientsSection,
    JoinSection
  },
  data() {
    return {
      data: window.aboutUs
    };
  },
  provide() {
    const { data } = this,
      section = {};
    Object.defineProperties(section, {
      aboutUs: {
        get: () => data.aboutUs
      },
      mission: {
        get: () => data.mission
      },
      member: {
        get: () => data.member
      },
      join: {
        get: () => data.join
      },
      clients: {
        get: () => data.clients
      },
      agencies: {
        get: () => data.agencies
      }
    });
    return { section };
  },
  mounted() {
    const { hash } = window.location;
    this.$nextTick(() => {
      $.scrollTo(hash);
    });
  }
};
</script>
