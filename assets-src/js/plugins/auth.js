import {Middleware} from "./classes";
import store from '../store/index';
import {USER_LOGGED_IN_, USER_LOGIN_FORM_SHOW_} from "../store/types";

const auth = new Middleware();
auth.use(next => {
  if (!store.getters[USER_LOGGED_IN_]) {
    store.commit(USER_LOGIN_FORM_SHOW_, true);
  } else next();
});

export default auth;

const authWithoutWarning = new Middleware();
authWithoutWarning.use(next => {
  console.log('oh ye');
  if (store.getters[USER_LOGGED_IN_])
    next();
});

export {authWithoutWarning};
