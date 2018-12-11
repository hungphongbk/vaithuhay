<style lang="scss" scoped>
@import "../../../sass/inc/inc";

a {
  cursor: pointer;
}

.order-detail {
  padding: {
    top: 0.3rem;
    bottom: 0.3rem;
  }
  &-date {
    color: lighten($text-color, 5%);
    @include font-size-with-line-height($font-size-base * 0.8);
  }
  &-products {
    .vth-thumb {
      display: block;
      border-radius: 2px;
      border: 2px solid $theme-color-dark;
      /deep/ img {
        height: unset;
      }
    }
    > div {
      position: relative;
      float: left;
      width: 60px;
      margin-right: 1.3rem;
    }
    .count {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      text-align: center;
      $f: $font-size-base * 0.9;
      $s: $f * 1.45;
      font-size: $f;
      height: $s;
      width: $s;
      line-height: $s;
      margin-top: -$s/2.5;
      margin-right: -$s/2.5;
      border-radius: 50%;
      color: white;
      background: $theme-red-color;
    }
  }
}
</style>
<template lang="pug">
  div
    transition
      template(v-if="!manualFind")
        h5 Dưới đây là các đơn hàng mới nhất của bạn.&nbsp;
          a(@click="manualFind_ = true") Tìm theo mã đơn hàng, email hoặc số điện thoại khác
      template(v-else)
        h5 Ahihi.&nbsp;
          a(@click="manualFind_ = false") GO BACK
    paginate(:for_="searched", :perPage="5")
      template(slot-scope="p")
        table.table
          thead
            tr
              th(scope="col") Mã đơn hàng
              th(scope="col") Sản phẩm
              th(scope="col") Trạng thái đơn hàng
          tbody
            tr(v-for="order in p.list")
              td(scope="row")
                .order-detail
                  p.order-detail-number {{order.order_number}}
                  p.order-detail-date {{order.created_at}}
              td(scope="row")
                .order-detail
                  .order-detail-products.clearfix
                    div(v-for="line_item in order.line_items")
                      thumbnail.no-effect.ratio-1-1(:lazy_="false", :overlay_="false", :url_="line_item.image.src")
                      span.count {{line_item.quantity}}
</template>
<script>
import { orderTrackingMixin } from "../mixins";
import { Paginate } from "../../components";

export default {
  mixins: [orderTrackingMixin],
  components: { Paginate },
  data() {
    return {};
  },
  computed: {}
};
</script>
