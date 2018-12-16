import store from "../store/index";
import { CART_LIST_ } from "../store/types";

const $ = jQuery;

export const ProductItem_ = p =>
  p.attached
    ? p
    : {
        attached: true,
        ...p,
        /**
         * @return {number}
         */
        get priceRaw() {
          return Number(p.price.current.replace(/[^0-9\.-]+/g, ""));
        },
        /**
         * @return {number}
         */
        get priceOldRaw() {
          return p.price.old
            ? Number(p.price.old.replace(/[^0-9\.-]+/g, ""))
            : this.priceRaw;
        },
        get sale() {
          const { priceRaw, priceOldRaw } = this;
          return Math.round(((priceOldRaw - priceRaw) / priceOldRaw) * 100);
        },
        get isSale() {
          return this.sale > 0;
        },
        get inCart() {
          return (
            store.getters[CART_LIST_].findIndex(
              cartProduct => cartProduct.product_id === p.id
            ) >= 0
          );
        }
      };

export { default as WholeSale } from "./classes__WholeSale";
export { default as CartItem } from "./classes__CartItem";
