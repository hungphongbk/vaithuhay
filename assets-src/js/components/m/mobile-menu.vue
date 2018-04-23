<style lang="scss" scoped>
  @import "../../../sass/inc/inc";

  @mixin search-group($font-size) {
    .search-form {
      .form-control, .btn {
        $padding: $font-size/2;
        $search-font-size: $font-size;
        $search-line-height: floor($search-font-size*$line-height-base);
        $ip-height: ($search-line-height + ($padding * 2) + 2);

        height: $ip-height;
        padding: $padding $padding-base-horizontal*1.2;
        font-size: $search-font-size;
      }
    }
  }

  @include search-group($font-size-base*1.22)

  @include responsive('xs-max') {
    @include search-group($font-size-base);
  }

  .input-group-btn {
    background-color: rgba(#fff, .25);
  }

  $s: $navbar-height;
  %top-buttons {
    position: absolute;
    top: 0;
  }

  .lang {
    @extend %top-buttons;
    right: $s*2;
  }

  .user {
    @extend %top-buttons;
    right: $s*1.2;
  }

  .search-panel {
    padding-top: $padding-base-vertical*1;
    border-top: 1px solid rgba(#fff, .25);
    li {
      padding: $padding-base-vertical 0;
    }
    a {
      @extend %reset-link;
    }

    @at-root .search-item h5{
      @include font-size-with-line-height($font-size-h5*0.96)
    }
  }

  .dash {
    display: flex;
    height: 100%;
    flex-direction: column;
    &-child {
      display: flex;
      flex-direction: column;
      overflow: scroll;
      flex-grow: 1;
    }
  }

  .dashboard {
    padding-top: $padding-base-vertical*4;
    width: 100%;
    li > a {
      @extend %reset-link;
      font-size: $font-size-base*1.2;
      display: inline-block;
      width: 100%;
      padding: $padding-base-vertical*1.2 0;
      .fa {
        float: right;
        line-height: 24px;
      }
    }
  }

  .customer {
    margin-bottom: .7em;
    h4 {
      display: inline-block;
    }
    h4 > span {
      line-height: 2em;
      vertical-align: bottom;
    }
    .pull-right {
      padding-top: 1.5em;
    }
    .logout {
      @extend %reset-link;
      color: rgba(#fff, .7);
      .fa {
        margin-right: .3em;
      }
    }
  }
</style>
<template lang="pug">
  div(style="height: 100%")
    lang.lang
    user-button.user(@click="!customer.id && login()")
    transition(name="vth-fade-slide-left", mode="out-in")
      .dash(v-if="mode==='dashboard' || mode==='search'", key="dash-search")
        form.form.search-form
          .input-group.add-on
            input.form-control#search(:placeholder="$t('0')", v-model="keyword")
            .input-group-btn
              .btn(@click="keyword=''; mode='dashboard'")
                i.fa.fa-times
        transition(name="vth-fade-slide-left", mode="out-in")
          .dash-child(v-if="mode==='dashboard'", key="dashboard")
            ul.dashboard
              li
                .customer.clearfix(v-if="customer.id", style="margin-bottom: 3em")
                  h4
                    i.fa.fa-user-circle-o.fa-2x(style="margin-right: .7em")
                    span {{customer.name}}
                  .pull-right
                    a.small.logout(href="/account/logout")
                      i.fa.fa-sign-out.fa-lg
                      | {{$t('signout')}}
              li
                a(target="_self", :href="home_")
                  h5 {{$t('homepage')}}
              li
                a(@click="mode='discover'")
                  h5 {{$t('discover')}}
                    i.fa.fa-lg.fa-angle-right
              li
                a(target="_self", :href="`${home_}/blogs/news`")
                  h5 {{$t('news')}}
              li
                a(target="_self", :href="`${home_}/pages/vaithuhay`")
                  h5 {{$t('intro')}}
          .dash-child(v-else, key="search")
            h4.mt-4.mb-4
              span.mr-4(:class="{'disabled': searchType==='article'}", @click="searchType='product'") Sản phẩm
              span(:class="{'disabled': searchType==='product'}", @click="searchType='article'") Bài viết
            ul.search-panel
              li.search-item(v-for="p in currentSearch")
                a(:href="p.url")
                  h5(v-if="p._type==='product'") {{p._title[$i18n.locale]}}
                  h5(v-else) {{p.title}}
      .dash(v-else-if="mode==='discover'", key="discover")
        .dash-child
          ul.dashboard
            li(v-for="cat in categories")
              a(:href="cat.url")
                h5 {{cat.title}}
      .dash(v-else-if="mode==='cart'", key="cart")
        .dash-child
          cart-panel
      .dash(v-else, key="login")
        .dash-child
          login-panel
</template>
<script>
  import debounce from 'lodash/debounce'
  import Paginate from '../paginate.vue'
  import Lang from '../d/nav-menu__Lang.vue'
  import CartPanel from './cart__Panel.vue'
  import LoginPanel from './app__Login.vue'
  import {UserButton} from "../index"
  import {mapGetters} from 'vuex'
  import {CATEGORIES_LIST_, CATEGORIES_ALL_, USER_LOGIN_FORM_SHOW_} from "../../store/types"
  import {searchMixin} from "@/components/mixins";

  export default {
    mixins: [searchMixin],
    components: {Paginate, Lang, CartPanel, LoginPanel, UserButton},
    data() {
      return {
        mode: 'dashboard',
        home_: vth.links.home,
        searchType: 'product'
      }
    },
    computed: {
      ...mapGetters({
        categories: CATEGORIES_LIST_,
        all: CATEGORIES_ALL_
      }),
      customer() {
        return this.$store.state.customer
      },
      goBack() {
        const self = this;
        return (self.mode === 'discover' || self.mode === 'cart') ? () => {
          self.mode = 'dashboard'
        } : null
      },
      currentSearch() {
        return this.searchType === 'product' ?
          this.searchedProducts :
          this.searchedArticles;
      }
    },
    watch: {
      kw(value, oldValue) {
        if (oldValue.length === 0 && value.length > 0) {
          this.mode = 'search';
        }
      }
    },
    methods: {
      update_: debounce(function ({target}) {
        this.keyword = target.value;
      }, 300),
      login() {
        this.$store.commit(USER_LOGIN_FORM_SHOW_, true);
      },
      signOut() {

      }
    }
  }
</script>
<i18n>
  {
    "en": {
      "0": "TYPE TO SEARCH SOMETHING...",
      "homepage": "Home",
      "discover": "Discover",
      "news": "News",
      "intro": "About us",
      "signout": "Sign out",
      "signin": "Sign in"
    },
    "vi": {
      "0": "TÌM SẢN PHẨM...",
      "homepage": "Trang chủ",
      "discover": "Khám phá",
      "news": "Tin tức",
      "intro": "Giới thiệu",
      "signout": "Đăng xuất",
      "signin": "Đăng nhập"
    }
  }
</i18n>
