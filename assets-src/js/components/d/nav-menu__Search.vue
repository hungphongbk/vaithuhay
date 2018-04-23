<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  form {
    .form-control, .btn {
      background: #ffe066;
    }
    .btn {
      cursor: default;
      padding: 6px 12px 7px;
    }
  }

  .search-panel {
    position: absolute;
    top: $navbar-height;
    padding: {
      top: 8px;
      bottom: 8px;
    }
    right: 0;
    width: 500px;
    background: white;
    box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.35);
    .btn {
      padding: $line-height-computed*.7 $grid-gutter-width;
    }
  }

  .search-item {
    > a {
      @extend %clearfix;
      @extend %reset-link;
      display: block;
      padding: 6px 8px;
      border-left: 3px solid transparent;
      &:hover {
        background-color: #f0f0f0;
        border-left-color: $theme-red-color;
      }
    }
    img {
      width: 100%;
      height: auto;
    }
    .thumb {
      float: left;
      margin-right: 15px;
      width: 60px;
    }
    .title {
      font-weight: 700;
      margin-top: 4px;
    }
  }
</style>
<template lang="pug">
  div
    form.navbar-form
      .input-group.add-on
        input.form-control#search(:placeholder="$t('0')", v-model="keyword")
        .input-group-btn
          .btn
            i.fa.fa-search
    transition(name="vth-fade")
      div.search-panel(v-if="isOpen_")
        .btn.btn-sm(style="margin-left: 11px;", :class="view==='product'?'btn-dark':'btn-grey'", @click="view='product'") Sản phẩm
        .btn.btn-sm(:class="view==='article'?'btn-dark':'btn-grey'", @click="view='article'") Bài viết
        paginate.mt-1(:for_="view==='product'?searchedProducts:searchedArticles", :perPage="6")
          template(slot-scope="p")
            ul
              li.search-item(v-for="i in p.list")
                a(:href="i.url")
                  template(v-if="i._type==='product'")
                    .ratio-1-1.thumb
                      .content
                        img(:src="i.thumbnail")
                    h5.title {{i._title[$i18n.locale]}}
                    span.regular-price {{i.price.current}}
                  template(v-else)
                    .ratio-1-1.thumb
                      .content
                        img(:src="i.image")
                    h5.title {{i.title}}
</template>
<script>
  import {Paginate} from "@/components"
  import {searchMixin} from "@/components/mixins"

  const $ = jQuery;

  export default {
    mixins: [searchMixin],
    components: {Paginate},
    data() {
      return {
        view: 'product'
      }
    },
    computed: {
      isOpen_() {
        return this.keyword.length > 0
      }
    }
  }
</script>
<i18n>
  {
    "en": {
      "0": "SEARCH"
    },
    "vi": {
      "0": "TÌM SẢN PHẨM"
    }
  }
</i18n>
