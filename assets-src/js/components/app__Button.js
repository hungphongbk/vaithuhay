export default {
  functional: true,
  render(h, {props, data, children}) {
    const Tag = props.tag;
    console.log(data);
    const content = props.icon ? (<fa-icon icon={props.icon} size="lg" class="mr-3" />) : null,
      oldClass = data.staticClass;
    data.staticClass = oldClass.split(' ').concat(['btn']).join(' ');
    return h(Tag, data, [content, ...children]);
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    icon: {
      type: Object
    }
  }
};
