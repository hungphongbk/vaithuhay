<style lang="scss" scoped>
@import "../../sass/inc/inc";

.option {
  font-weight: 700;
}
</style>
<template lang="pug">
  div.product-variants
    div(v-for="(opt,index) in opts")
      p.option {{options_[index]}}:&nbsp;
        span.text-theme-red(v-if="optHasThumbnail[index]") {{value.title}}
      items(:type="optHasThumbnail[index]?'image':'text'", :items="optLists[index]", v-model="opts[index]")
      br
    //p.option {{options_[1]}}:&nbsp;
      span.text-theme-red(v-if="optHasThumbnail[1]") {{value.title}}
    //items(:type="optHasThumbnail2?'image':'text'", :items="optList2", v-model="opts[1]")
</template>
<script>
import unzip from "lodash/unzip";
import uniq from "lodash/uniqBy";
import Items from "./product__Variants-Multiple-Items";

const $ = jQuery,
  mapVariant = variant =>
    variant.title.split(/\s\/\s/).map(title => ({
      title,
      image: variant.image
    }));

export default {
  components: { Items },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    options_: {
      type: Array,
      default: () => []
    },
    value: null
  },
  data() {
    //init separated lists (2) from options and variants
    const { options_ } = this,
      opts = mapVariant(this.list[0]);
    return {
      opts,
      optHasThumbnail: options_.map(i => i === "Kiểu dáng")
    };
  },
  computed: {
    optLength() {
      return this.options_.length;
    },
    optLists() {
      const { opts } = this;
      return opts.map((opt, index) => {
        const anotherOpts = opts.filter(i => i !== opt);

        //split this.list into multiple lists depends on variant options
        //1. take items from this.list which "variant option tuple" available to current option
        //    compare by title (item title must contain option title)
        //2. refine, then unzip it and pick sublist that associated with current option
        //3. Don't forget to unique-ify result by title (prevent duplication)
        const subList = unzip(
          this.list
            .filter(({ title }) =>
              anotherOpts.reduce(
                (rs, optVal) => rs && title.includes(optVal.title),
                true
              )
            )
            .map(mapVariant)
        )[index];
        return uniq(subList, i => i.title);
      });
    },
    selected() {
      const { list, opts } = this;
      return list.find(
        ({ title }) =>
          opts.reduce((rs, opt) => rs && title.includes(opt.title), true)
        //title.includes(opt1.title) && title.includes(opt2.title)
      );
    }
  },
  watch: {
    selected(value) {
      this.$emit("input", value);
    }
  },
  mounted() {
    this.$emit("input", this.list[0]);
  }
};
</script>
