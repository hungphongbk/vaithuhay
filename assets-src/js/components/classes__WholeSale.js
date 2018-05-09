import Vue from 'vue';

class Product {
  variants;

  constructor(product) {
    Object.assign(this, product, {
      __product: true,
      variantSelected: product.variants[0]
    });
  }

  get hasMultipleVariants() {
    return this.variants.length > 0;
  }
}

export default class WholeSale {
  unit;
  amount;
  applyToProduct;
  additionalProduct;
  type;

  constructor(id, rule, product = null) {
    Object.assign(this, rule, {__wholesale: false});
    this.id = id;
    this.product = product;
    this.giftAvatar = '';
    this.giftVariants = [];
    this.giftVariantOptions = [];
    this.additionalProductObj = null;
    Vue.nextTick(() => this.init());
  }

  get currentPrice() {
    if (!this.product) return "0";
    return this.product.variantSelected.price.current;
  }

  get discountPrice() {
    const number = Number(this.currentPrice.replace(/[^0-9\.-]+/g, ""));
    if (this.unit === 'percentage')
      return Math.round(number * (100 - this.amount) / 100) + '₫';
    else
      return (number - this.amount) + '₫';
  }

  get amount$() {
    if (this.unit === 'percentage')
      return Math.round(this.amount) + '%';
    else
      return Math.round(this.amount / 1000) + 'K';
  }

  get isBuyOneGetOne() {
    return this.type !== 'wholesale';
  }

  get isGift() {
    return this.isBuyOneGetOne && this.unit === 'gift';
  }

  init() {
    const self = this,
      promises = [];
    if (!self.product) {
      // Download product data
      promises.push($.get(vth.links.url(`products/${self.applyToProduct}?view=json`))
        .then(response => {
          const product = JSON.parse(response),
            {variants} = product;
          product.variantSelected = variants[0];
          Vue.set(self, 'product', product);
          Vue.set(self, 'variants', variants);
        }));
    }

    //Download gift product data, if has
    if (self.isBuyOneGetOne)
      promises.push($.get(vth.links.url(`products/${self.additionalProduct}?view=json`))
        .then(response => {
          const product = JSON.parse(response),
            {thumbnail, variants} = product;
          // Vue.set(self, 'giftAvatar', thumbnail)
          self.additionalProductObj = new Product(product);
          self.giftAvatar = thumbnail;
          self.giftVariants = variants;
        }));
    Promise.all(promises)
      .then(() => Vue.set(self, '__wholesale', true));
  }
}
