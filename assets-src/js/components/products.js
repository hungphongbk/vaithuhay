//export {default as ProductItem1} from './post__PostItem1.vue'
import ProductItem1 from './post__PostItem1';
import ProductItem2 from './post__PostItem2';

const styles = [ProductItem1, ProductItem2];

export default {
  functional: true,
  render(h, {props, data, children}) {
    return h(styles[props.itemStyle - 1], data, children);
  },
  props: {
    itemStyle: {
      type: Number,
      default: 1
    }
  }
};
