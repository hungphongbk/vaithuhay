<style lang="scss" module>
@import "../../sass/inc/inc";

$icon-size: 32px;
$user-padding-vertical: (($navbar-height - $icon-size)/2);

.user {
  position: relative;
  padding: {
    top: $user-padding-vertical;
    bottom: $user-padding-vertical;
  }
  > span {
    display: inline-block;
    height: $icon-size;
    width: $icon-size;
    cursor: pointer;
    background: url(../../img/user.png) {
      size: cover;
      repeat: no-repeat;
    }
    filter: grayscale(100%) opacity(50%);
  }
  @at-root .loggedIn span {
    filter: unset;
  }
}

:global .navbar-nav > li > a {
  &:local.user {
    padding: {
      top: $user-padding-vertical - 4px !important;
      bottom: $user-padding-vertical - 4px !important;
    }
  }
}
</style>
<template lang="pug">
  a(:class="{[$style.user]: true, [$style.loggedIn]: loggedIn}")
    span(@click="$emit('click')")
    slot
</template>
<script>
export default {
  computed: {
    loggedIn() {
      console.log(this.$vthStore.state);
      return this.$vthStore.state.customer.id;
    }
  }
};
</script>
