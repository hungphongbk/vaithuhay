export const CATEGORIES_LIST_ = 'categories/list';
export const CATEGORIES_ALL_ = 'categories/all';
export const CATEGORY_ONSALE_ = 'categories/sale';

export const PRODUCTS_LIST_ = 'products/list';
export const PRODUCTS_FETCH_ = 'products/fetch';
export const PRODUCTS_SORT_ = 'products/sortBy';

export const CART_LIST_ = 'cart/list';
export const CART_COUNT_ = 'cart/count';
export const CART_TOTAL_ = 'cart/total';
export const CART_FETCH_ = 'cart/fetch';
export const CART_HAS_PRODUCT_ = 'cart/has-product';
export const CART_ADD_ = 'cart/add';
export const CART_REMOVE_ = 'cart/remove';
export const PROMO_LIST_ = 'promo/list';

//region Module: Customer
export const USER_LOGGED_IN = 'user/logged-in';
export const USER_LOGIN_FORM_SHOW = 'user/login-form-show';
export const USER_MUTATION_LOGIN = 'user/login';
export const USER_LOGIN_FAILED_ = 'user/login-failed';
export const USER_IS_LOGGING_IN = 'user/is-logging-in';
export const USER_IS_LOGGED_IN = 'user/is-logged-in';
export const USER_LOYALTY = 'user/loyalty';
export const USER_FAVORITES = 'user/favorites';
export const USER_TOGGLE_FAVORITE = 'user/toggle-favorite';
export const USER_MUTATION_UPDATE = 'user/update';
export const USER_ACTION_UPDATE = 'user/update';
export const USER_GETTER_CURRENT_PAGE = 'user/current-page';
export const USER_MUTATION_INIT_PAGES = 'user/init-pages';
export const USER_MUTATION_NAVIGATE_PAGE = 'user/navigate-page';
//endregion

export const PRODUCT_MUTATION_FAVORITE_ADD = 'product/add-favorite';
export const PRODUCT_MUTATION_FAVORITE_REMOVE = 'product/remove-favorite';
export const PRODUCT_ACTION_FAVORITE_FETCH = 'product/toggle-fetch';
export const PRODUCT_ACTION_FAVORITE_TOGGLE = 'product/toggle-favorite';

//region Module: Flash
export const FLASH_CONTEXT_SUCCESS = 'success';
export const FLASH_CONTEXT_ALERT = 'alert';
export const FLASH_CONTEXT_ERROR = 'error';
export type FlashMessageContext = 'success' | 'alert' | 'error'
export const FLASH_MUTATION_PUSH_MESSAGE = 'flash/push';
export const FLASH_MUTATION_POP_MESSAGE = 'flash/pop';
export const FLASH_ACTION_PUSH_MESSAGE = 'flash/push';
export const FLASH_ACTION_POP_MESSAGE = 'flash/pop';
//endregion

//region Module: Customer.Address
export const CUSTOMER_ADDRESS_MUTATION_DELETE = 'user/address/delete';
export const CUSTOMER_ADDRESS_MUTATION_UPDATE = 'user/address/update';
export const CUSTOMER_ADDRESS_ACTION_DELETE = 'user/address/delete';
export const CUSTOMER_ADDRESS_ACTION_UPDATE = 'user/address/update';
//endregion
