import Vue from "vue";
import navMenu from "./nav-menu.vue";
import PageFooter from "./footer.vue";
import Thumbnail from "./thumbnail.vue";
import SocialSharer from "./social-sharer.vue";
import AsyncButton from "./async-button.vue";
import Modal from "./modal.vue";
import Btn from "./app__Button";
import "./products";

const DateTimePicker = () =>
  import(/* webpackChunkName:"date-time-picker" */ "./app__DateTimePicker");

Object.entries({
  navMenu,
  PageFooter,
  Thumbnail,
  SocialSharer,
  AsyncButton,
  Modal,
  Btn
}).forEach(([name, component]) => {
  Vue.component(name, component);
});

export { default as ItemLoop } from "./item-loop";
export { default as IndexSection } from "./index__Section.vue";
export { default as Paginate } from "./paginate.vue";
export { default as OverlaySelector } from "./overlay-selector.vue";
export { default as AddToCartWrapper } from "./add-to-cart-wrapper.vue";
export { default as PageSlider } from "./page__SliderSection.vue";
export { default as ProductRating } from "./product__Rating.vue";
export { default as UserButton } from "./app__UserButton";
export { default as OrderTracking } from "./order-tracking";
export { default as Offline } from "v-offline";
export { default as FlashMessageHub } from "./app__FlashMessageHub";
export { DateTimePicker };
export const Event = new Vue();
