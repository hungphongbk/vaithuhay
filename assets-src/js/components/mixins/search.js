import debounce from 'lodash/debounce'
import flatten from 'lodash/flatten'

export default {
  data() {
    return {
      keyword: '',
      kw: ''
    }
  },
  computed: {
    searchedProducts() {
      return this.searched.filter(({_type}) => _type === 'product')
    },
    searchedArticles() {
      return this.searched.filter(({_type}) => _type === 'article')
    }
  },
  asyncComputed: {
    async searched() {
      return flatten(await Promise.all([
        'product','article'
      ].map(
        link => $.get(`https://vaithuhay.com/search/?type=${link}&view=json&q=${this.kw}`)
          .then(raw => JSON.parse(raw).results)
      )));
    }
  },
  watch: {
    keyword: debounce(function (value) {
      this.kw = value;
    }, 200)
  }
}
