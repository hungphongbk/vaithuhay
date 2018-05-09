import http from "@/plugins/http";
export var ProductFavoriteAPI = {
    fetchAll: function () { return http.get(SERVER_URL + 'products/favorites', true); },
    fetch: function (productId) { return http.get(SERVER_URL + 'products/' + productId + '/favorite', true); },
    toggle: function (productId) { return http.post(SERVER_URL + 'products/' + productId + '/favorite', {}, true); }
};
export var CustomerAPI = {
    login: function (email) { return http.post(SERVER_URL + 'u/login', { email: email }); },
    update: function (body) { return http.post(SERVER_URL + 'u/update', body); },
    address: {
        delete: function (id) { return http.del(SERVER_URL + 'u/address/' + id); }
    }
};
//# sourceMappingURL=api.js.map