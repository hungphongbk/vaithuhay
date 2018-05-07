<style lang="scss" module>
  @import "../../../sass/inc/inc";

  .container {
    font-size: $font-size-base*0.86;
  }

  .sidebar {
    li {
      display: flex;
      > *:first-child {
        flex-basis: 3.5rem;
      }
      @at-root &.menu-item {
        align-items: center;
        padding: {
          top: 1rem;
          bottom: 1rem;
        }
        cursor: pointer;
        border-radius: .4rem;
        margin-top: .4rem;
        border: 1px solid rgba(#000, 0);
        &:hover, &.selected {
          background: rgba(#000, .07);
        }

        &.selected {
          border-color: rgba(#000, .12);
        }
      }
    }
  }

  .content {
    height: 55vh;
    max-height: 55vh;
    overflow: scroll;
  }
</style>
<template lang="pug">
  .row(:class="$style.container")
    .col-sm-4
      ul(:class="$style.sidebar")
        li
          div
          div
            h5 {{userName}}
        li(v-for="(page,index) in pages", :class="{ [$style.menuItem]:true, [$style.selected]:index===selected }", @click="selected = index")
          fa-icon(:icon="page.icon", size="lg")
          span {{page.title}}
    .col-sm-8
      div(:class="$style.content")
        component(:is="pages[selected].component")
</template>
<script>
  import PageFavorite, {PageFavoriteIcon} from '../UserPanelPageFavorite';
  import PageUserInfo, {PageUserInfoIcon} from "../UserPanelPageUserInfo";
  import PageAddresses, {PageAddressesIcon} from "js/components/UserPanelPageAddresses.vue";
  import i18n from '../../plugins/i18n';
  import {mapState} from 'vuex';

  export default {
    components: {},
    data: () => ({
      selected: 0,
      pages: [
        {
          component: PageUserInfo,
          get title() {
            return {
              en: 'User Information',
              vi: 'Thông tin cá nhân',
            }[i18n.locale];
          },
          icon: PageUserInfoIcon
        },
        {
          component: PageFavorite,
          get title() {
            return {
              en: 'Product Favorites',
              vi: 'Sản phẩm yêu thích',
            }[i18n.locale];
          },
          icon: PageFavoriteIcon
        },
        {
          component: PageAddresses,
          get title() {
            return {
              en: 'Addresses',
              vi: 'Địa chỉ giao hàng',
            }[i18n.locale];
          },
          icon: PageAddressesIcon
        },
      ]
    }),
    computed: {
      ...mapState({
        userName: state => state.customer.name
      })
    }
  };
</script>
