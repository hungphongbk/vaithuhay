const Desktop = () => import(/* webpackChunkName: "desktop" */ './d/order-tracking.vue'),
  Mobile = () => import(/* webpackChunkName: "mobile" */ './m/order-tracking.vue');

export default {
  name: 'OrderTracking',
  functional: true,
  render(h, {parent, data}) {
    const {$store} = parent,
      component = $store.state.mq.desktop ? Desktop : Mobile;
    return h(component, data);
  }
}
