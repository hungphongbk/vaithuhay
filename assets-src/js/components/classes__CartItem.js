export default class CartItem {
  image;
  line_price;
  line_price_orginal;

  constructor(specs) {
    Object.assign(this, specs);
  }

  get thumbnail() {
    return this.image.replace("http:/", "https:/");
  }

  get discountPercentage() {
    return 100 - Math.round((this.line_price * 100) / this.line_price_orginal);
  }
}
