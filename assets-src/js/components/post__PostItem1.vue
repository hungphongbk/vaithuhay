<style lang="scss" module src="./post__PostItem1.vue.scss"></style>
<template lang="pug">
  a(:class="$style.postItem", :href="url")
    div(style='position: relative')
      thumbnail(:url_='thumbnail', :alt_="title", ratio_='1-1', :thumbnailSize_="defaultThumbnailSize_", :lazy_="false")
        template(v-if="!$mq.tablet", slot="overlay")
          span.fa.fa-cart-plus(:class="$style.addToCartBtn", @click.stop.prevent="add_($event, variants[0].id)")
        // sale composes: content
        div(:class="$style.sale", v-if="isSale")
          .flex-center
            span
              span(:class="$style.percentage") {{sale}}%
              br
              | off
        // caption-overlay composes: content
        div(:class="$style.captionOverlay")
          div(:class="[$style.prices, isSale_?$style.isSale:'']")
            div
              template(v-if='isSale_')
                span(:class="$style.salePrice") {{price.current}}
                br
                span(:class="$style.regularPrice") {{price.old}}
              span.regular-price(v-else) {{price.current}}
    div(:class="$style.caption")
      h5(:class="$style.category") {{type}}
      h4 {{title}}
      p(:class="$style.description", v-if="!$mq.tablet", v-html="description")
    .bottom
      //product-rating.large(:rating="rating")
</template>
<script>
  import {CART_ADD_}  from '../store/types';
  import {mapActions} from 'vuex';
  import {delay}      from './helpers';
  // import {ProductRating} from "../components";

  const $ = jQuery;

  export default {
    // components: {ProductRating},
    props: {
      item: Object,
      thumbnailSize_: String
    },
    data() {
      return this.item;
    },
    computed: {
      routerLink() {
        return {
          name: 'product',
          params: {
            product: this.handle
          }
        };
      },
      defaultThumbnailSize_() {
        if (this.thumbnailSize_) return this.thumbnailSize_;
        return this.$mq.tablet ? 'medium' : 'large';
      },
      title() {
        return this.item._title[this.$i18n.locale];
      },
      isSale_() {
        return this.price.old !== null;
      }
    },
    methods: {
      ...mapActions({
        addToCart_: CART_ADD_
      }),
      async add_({target: btn}, id) {
        const $style=this.$style;

        await this.addToCart_({id});
        const $btn = $(btn);
        $btn.addClass($style.preAdded);
        await delay(250);
        $btn.addClass(`${$style.added} fa-check`).removeClass(`${$style.preAdded} fa-cart-plus`);
        await delay(2400);
        $btn.addClass($style.preAdded).removeClass($style.added);
        await delay(250);
        $btn.removeClass(`${$style.preAdded} fa-check`).addClass('fa-cart-plus');
      }
    }
  };
</script>
