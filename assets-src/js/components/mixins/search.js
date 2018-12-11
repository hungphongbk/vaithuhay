import debounce from "lodash/debounce";
import flatten from "lodash/flatten";

export default {
  data() {
    return {
      keyword: "",
      kw: "",
      searching: false
    };
  },
  computed: {
    SEARCHED_PRODUCTS() {
      return this.searched.filter(({ _type }) => _type === "product");
    },
    SEARCHED_ARTICLES() {
      return this.searched.filter(({ _type }) => _type === "article");
    }
  },
  asyncComputed: {
    async searched() {
      this.searching = true;
      return flatten(
        await Promise.all(
          ["product", "article"].map(link =>
            $.get(
              `https://vaithuhay.com/search/?type=${link}&view=json&q=${
                this.kw
              }`
            ).then(raw => {
              this.searching = false;
              return JSON.parse(raw).results;
            })
          )
        )
      );
    }
  },
  watch: {
    keyword: debounce(function(value) {
      this.kw = value;
    }, 200)
  }
};
