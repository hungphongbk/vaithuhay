import Vue from "vue";
import LoadingComponent from "@/fragments/app__Loading";
import store from "@/store";
import { ensureResponsiveAvailable } from "@/utils/ensureResponsiveAvailable";

const wrap = entry => () => ({
    component: ensureResponsiveAvailable.then(() =>
      store.state.mq.phone
        ? import(/* webpackChunkName: "mobile" */ "@/components/m/mobile-menu-wrapper.vue").then(
            () => import(/* webpackChunkName: "page-[request]" */ `./${entry}`)
          )
        : import(/* webpackChunkName: "page-[request]" */ `./${entry}`)
    ),
    loading: LoadingComponent,
    delay: 200
  }),
  Index = wrap("index-page"),
  Collection = wrap("collection"),
  Blog = wrap("blog"),
  Article = wrap("article"),
  PageVaithuhay = wrap("about-us"),
  Product = wrap("product");

const Pages = { Index, Collection, Blog, Article, PageVaithuhay, Product };
// Object.values(Pages).forEach(pageComponent => {
//   console.log(Object.getPrototypeOf(pageComponent));
// })

const component = () => {
  switch (window.vth.template) {
    case "index":
      return Pages.Index;
    case "collection":
      return Pages.Collection;
    case "blog":
      return Pages.Blog;
    case "article":
      return Pages.Article;
    case "page-vaithuhay":
      return Pages.PageVaithuhay;
    case "product":
      return Pages.Product;
  }
};
//
// Vue.component('page-content', () => ({
//   component: component(),
//   loading
// }));

Vue.component("page-content", component());
