import http from "@/plugins/http";

export const ProductFavoriteAPI = {
  fetchAll: () => http.get(SERVER_URL + 'products/favorites', true),
  fetch: productId => http.get(SERVER_URL + 'products/' + productId + '/favorite', true),
  toggle: productId => http.post(SERVER_URL + 'products/' + productId + '/favorite', {}, true)
};
