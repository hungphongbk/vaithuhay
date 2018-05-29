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
      .svg-inline--fa {
        margin-right: .3em;
      }
    }
  }
</style>
<style lang="scss" module="">
  @import "../../../sass/inc/inc";

  .dashboard {
    padding-top: $padding-base-vertical*4;
    width: 100%;
    li > a {
      @extend %reset-link;
      font-size: $font-size-base*1.2;
      display: inline-block;
      width: 100%;
      padding: $padding-base-vertical*1.2 0;
      :global(.svg-inline--fa) {
        float: right;
        line-height: 24px;
      }
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

  .search-panel {
    padding-top: $padding-base-vertical*1;
    border-top: 1px solid rgba(#fff, .25);
    li {
      padding: $padding-base-vertical 0;
    }
    a {
      @extend %reset-link;
    }

    @at-root .search-item h5 {
      @include font-size-with-line-height($font-size-h5*0.96)
    }
  }
</style>
<template lang="pug" src="./mobile-menu.vue.pug"></template>
<script>
  import debounce                                                   from 'lodash/debounce';
  import Paginate                                                   from '../paginate.vue';
  import Lang                                                       from '../d/nav-menu__Lang.vue';
  import CartPanel                                                  from './cart__Panel.vue';
  import LoginPanel                                                 from './app__Login.vue';
  import {UserButton}                                               from "../index";
  import {mapGetters}                                               from 'vuex';
  import {CATEGORIES_ALL_, CATEGORIES_LIST_, USER_LOGIN_FORM_SHOW} from "../../store/types";
  import {searchMixin}                                              from "@/components/mixins";
  import faTimes                                                    from '@fortawesome/fontawesome-free-solid/faTimes';
  import faSignOut
                                                                    from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
  import faUserCircle
                                                                    from '@fortawesome/fontawesome-free-solid/faUserCircle';
  import faAngleRight
                                                                    from '@fortawesome/fontawesome-free-solid/faAngleRight';

  export default {
    mixins: [searchMixin],
    components: {Paginate, Lang, CartPanel, LoginPanel, UserButton},
    data() {
      return {
        mode: 'dashboard',
        home_: vth.links.home,
        searchType: 'product',
        faTimes,
        faSignOut,
        faUserCircle,
        faAngleRight
      };
    },
    computed: {
      ...mapGetters({
        categories: CATEGORIES_LIST_,
        all: CATEGORIES_ALL_
      }),
      customer() {
        return this.$vthStore.state.customer;
      },
      goBack() {
        const self = this;
        return (self.mode === 'discover' || self.mode === 'cart') ? () => {
          self.mode = 'dashboard';
        } : null;
      },
      currentSearch() {
        return this.searchType === 'product' ?
          this.SEARCHED_PRODUCTS :
          this.SEARCHED_ARTICLES;
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
        this.$vthStore.commit(USER_LOGIN_FORM_SHOW, true);
      },
      signOut() {

      }
    }
  };
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
