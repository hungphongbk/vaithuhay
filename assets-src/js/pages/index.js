import Vue from "vue";
import LoadingComponent from "@/fragments/app__Loading";

const Index = () => ({
    component: import(/* webpackChunkName: "index" */ "./index-page.js"),
    loading: LoadingComponent,
    delay: 200
  }),
  Collection = () =>
    import(/* webpackChunkName: "collection" */ "./collection.vue"),
  Blog = () => import(/* webpackChunkName: "blog" */ "./blog.vue"),
  Article = () => import(/* webpackChunkName: "article" */ "./article.vue"),
  PageVaithuhay = () =>
    import(/* webpackChunkName: "about-us" */ "./about-us.vue"),
  Product = () => import(/* webpackChunkName: "product" */ "./product.vue");

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
