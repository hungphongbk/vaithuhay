<style lang="scss" scoped>
  @import "../../sass/inc/inc";

  .fa {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
    background: linear-gradient(to right, #000 0, #000 49.9%, #eee 50%);
    margin-right: .3em;
    .rating.large & {
      font-size: 2rem;
    }
    .rating.clickable & {
    }
  }
</style>
<template lang="pug">
  .rating(:class="{clickable}", style="display:none")
    span.fa.fa-star(v-for="i in 5", :style="styles[i-1]", @click="clickable && vote(i)")
</template>
<script>
  import range from 'lodash/range';

  export default {
    model: {
      prop: 'rating'
    },
    props: {
      rating: {
        type: Object,
        required: true
      },
      color: {
        type: String,
        default: '#fc0'
      },
      backgroundColor: {
        type: String,
        default: '#ddd'
      },
      clickable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      points() {
        const {vote5, vote4, vote3, vote2, vote1} = this.rating,
          pts = (vote5 * 5 + vote4 * 4 + vote3 * 3 + vote2 * 2 + vote1) * 10.0;
        return Math.round(pts / (vote5 + vote4 + vote3 + vote2 + vote1)) / 10;
      },
      styles() {
        const {points, color, backgroundColor} = this,
          low = Math.floor(points),
          high = Math.ceil(points);
        return range(5).map(i => ({
          background: (() => {
            if (i + 1 < low) {
              return color;
            } else if (i + 1 < high) {
              const percentage = Math.round((points - low) * 1000) / 10;
              return `linear-gradient(to right, ${color} 0, ${color} ${percentage - 0.001}%, ${backgroundColor} ${percentage}%)`;
            } else return backgroundColor;
          })()
        }));
      }
    },
    methods: {
      vote(i) {

      }
    }
  };
</script>
