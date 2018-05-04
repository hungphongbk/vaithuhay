import {Middleware} from "./classes";
import store from '../store/index';
import {USER_LOGGED_IN_, USER_LOGIN_FORM_SHOW_} from "../store/types";
import {ModalManager} from "@/plugins/index";
import {SYSTEM_MODAL_OK} from "@/types";

const auth = new Middleware();
auth.use(async next => {
  if (!store.getters[USER_LOGGED_IN_]) {
    await ModalManager('Thông báo', 'Bạn phải đăng nhập để thực hiện chức năng này', [
      {label: 'OK', type: SYSTEM_MODAL_OK}
    ]);
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
