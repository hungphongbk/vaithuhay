<style lang="scss" scoped>
@import "../../sass/inc/inc";

.vth-post-grid {
  margin: {
    left: 0;
    right: 0;
  }
  @media screen and (max-width: $screen-xs-max) {
    margin: {
      /*bottom: 20px;*/
      left: $grid-gutter-width/3;
      right: $grid-gutter-width/3;
    }
  }
}

$width: 70%;
$h-margin: (100% - $width)/2;
.service-title {
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.6em;
}

.item {
  img {
    width: $width;
    height: auto;
    margin: 0 $h-margin 20px $h-margin;
  }
  @include responsive("xs-max") {
    margin-bottom: 24px;

    img {
      width: 60%;
      margin: 10px 20% 5px 20%;
    }
    h4 {
      @include font-size-with-line-height($font-size-h5);
    }
  }
}

.modal-wrapper {
  /deep/ .modal-dialog {
    margin-top: 200px;
  }
  /deep/ .modal-content {
    border: none;
    border-radius: 0;
    position: relative;
  }
  /deep/ .modal-header {
    position: absolute;
    right: 0;
    z-index: 999999;
    .modal-title {
      display: none;
    }
  }
  .modal-body {
    padding: 0;
  }
}
</style>
<template lang="pug">
  index-section.vth-post-carousel(:title="$t('0')", title-foreground="#fc0")
    .vth-post-grid
      .row
        .col-xs-6.col-sm-3(v-for="item in services$")
          .item
            .content
              item(:item="item")
    div(v-observe-visibility="show")
    template(v-if="$mq.phone")
      modal.modal-wrapper(v-if="showInMobile", title="-", @dismiss="showInMobile=false;firstShow=false")
        .modal-body
          contact
    contact(v-else, :popup-in-mobile_="true")
</template>
<script>
import { IndexSection, ItemLoop } from "../components";
import { slickOptions_ } from "../components/helpers";
import Contact from "../components/index__Contact.vue";

export default {
  components: {
    IndexSection,
    Contact,
    ItemLoop,
    Item: {
      functional: true,
      render(
        h,
        {
          props: { item }
        }
      ) {
        return (
          <div>
            <img src={item.thumbnail} alt={item.title} />
            <h4 class="service-title">{item.title}</h4>
          </div>
        );
      },
      props: {
        item: Object
      }
    }
  },
  props: {
    content: Object
  },
  data() {
    return {
      services: [
        require("../../img/service-1.svg"),
        require("../../img/service-2.svg"),
        require("../../img/service-3.svg"),
        require("../../img/service-4.svg")
      ],
      slickOptions_,
      showInMobile: false,
      firstShow: true
    };
  },
  computed: {
    services$() {
      const self = this;
      return self.content[self.$i18n.locale].map((obj, index) => ({
        title: obj.text,
        thumbnail: self.services[index]
      }));
    }
  },
  methods: {
    show(isVisible) {
      if (isVisible && !this.showInMobile)
        this.showInMobile = isVisible && this.firstShow;
    }
  }
};
</script>
<i18n>
  {
    "en": {
      "0": "our commitment to you"
    },
    "vi": {
      "0": "cam kết dịch vụ"
    }
  }
</i18n>
