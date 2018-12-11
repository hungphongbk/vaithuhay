import Mobile from "./m/collection__SortSelector";
import Desktop from "./d/collection__SortSelector";

export default {
  functional: true,
  render(h, { parent, data, children }) {
    if (parent.$mq.phone) return h(Mobile, data, children);
    return h(Desktop, data, children);
  }
};
