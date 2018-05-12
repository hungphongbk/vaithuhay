import http from "@/plugins/http";
export const ProductFavoriteAPI = {
    fetchAll: () => http.get(SERVER_URL + 'products/favorites', true),
    fetch: productId => http.get(SERVER_URL + 'products/' + productId + '/favorite', true),
    toggle: productId => http.post(SERVER_URL + 'products/' + productId + '/favorite', {}, true),
};
export const CustomerAPI = {
    login: email => http.post(SERVER_URL + 'u/login', { email }),
    update: body => http.post(SERVER_URL + 'u/update', body),
    address: {
        delete: id => http.del(SERVER_URL + 'u/address/' + id),
        update: (address) => http.put(SERVER_URL + 'u/address/' + address.id, address),
    },
};
//# sourceMappingURL=api.js.map