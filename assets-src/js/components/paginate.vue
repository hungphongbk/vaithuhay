<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .btn {
    margin-right: .3em;
    display: inline-block;
  }

  .disabled {
    opacity: .5;
  }

  @include responsive('xs-max') {
    .btn {
      font-size: 13px;
      padding: 5px 10px;
    }
    .indicator {
      margin-top: 1rem;
    }
  }
</style>
<template lang="pug">
  div(v-if="for_")
    slot(:list="paginated_")
    .indicator(style="text-align: center")
      .btn.btn-white.prev.no-text(:class="{'disabled': !canPrev_}", @click="prev_")
        i.fa.fa-chevron-left
      .btn.btn-white.no-text.index(v-for="page in pages_", :class="{'disabled': page!==currentPage_}", @click="goTo_(page)") {{page+1}}
      .btn.btn-white.next.no-text(:class="{'disabled': !canNext_}", @click="next_")
        i.fa.fa-chevron-right
</template>
<script>
  import range from 'lodash/range'

  export default {
    props: {
      for_: Array,
      perPage: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        current: 0
      }
    },
    computed: {
      currentPage_() {
        return Math.ceil(this.current / this.perPage)
      },
      pages_() {
        let {for_, perPage, currentPage_} = this,
          numberOfPages = Math.ceil(for_.length / perPage),
          lastPage = numberOfPages - 1,
          [offsetFirst, offsetLast] = [currentPage_ - 2, currentPage_ + 2];
        //move range to head if under-ranged
        if (offsetFirst < 0) {
          offsetLast += (-offsetFirst);
          offsetFirst = 0;
        }
        //move range to tail if over-ranged
        if (offsetLast >= lastPage) {
          offsetFirst -= (offsetLast - lastPage);
          offsetLast = lastPage;
          if (offsetFirst < 0) offsetFirst = 0;
        }
        return range(offsetFirst, offsetLast + 1)
      },
      canPrev_() {
        const {current, perPage} = this;
        return current - perPage >= 0;
      },
      canNext_() {
        const {current, perPage, for_} = this;
        return current + perPage < for_.length - 1;
      },
      paginated_() {
        const {current, perPage, for_} = this;
        return for_.slice(current, current + perPage)
      }
    },
    watch: {
      current(val) {
        this.$emit('navigated', {current: val})
      }
    },
    methods: {
      prev_() {
        if (this.canPrev_)
          this.current -= this.perPage;
      },
      next_() {
        if (this.canNext_)
          this.current += this.perPage;
      },
      goTo_(index) {
        this.current = this.perPage * index;
      }
    }
  }
</script>
