import Vue from 'vue'
import navMenu from "./nav-menu.vue"
import PageFooter from './footer.vue'
import Thumbnail from './thumbnail.vue'
import SocialSharer from './social-sharer.vue'
import AsyncButton from './async-button.vue'
import Modal from './modal.vue'
import './products'

Object.entries({
  navMenu,
  PageFooter,
  Thumbnail,
  SocialSharer,
  AsyncButton,
  Modal
}).forEach(([name, component]) => {
  Vue.component(name, component)
});

export {default as ItemLoop} from './item-loop'
export {default as IndexSection} from './index__Section.vue'
export {default as Paginate} from './paginate.vue'
export {default as OverlaySelector} from './overlay-selector.vue'
export {default as AddToCartWrapper} from './add-to-cart-wrapper.vue'
export {default as PageSlider} from './page__SliderSection.vue'
export {default as ProductRating} from './product__Rating.vue'
export {default as UserButton} from './app__UserButton'
export {default as OrderTracking} from './order-tracking'
export {default as Offline} from 'v-offline'
export const Event = new Vue()
