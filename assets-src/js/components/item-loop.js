import SlickLoop from './item-loop__Slick.vue';
// import CarouselLoop from './item-loop__Carousel.vue'

export default {
  functional: true,
  render(h, {props: {slider}, data, children}) {
    // if (slider === 'slick')
    return h(SlickLoop, data, children);
    // else
    //   return h(CarouselLoop, data, children)
  },
  props: {
    slider: {
      type: String,
      default: 'slick'
    }
  }
};
