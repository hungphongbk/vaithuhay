import qs from 'query-string';
import store from '../store/index';
import {USER_LOGGED_IN_} from "@/store/types";

const $ = jQuery;
const mix = (_url, _query) => {
  const {url, query} = qs.parseUrl(_url),
    newQuery = Object.assign({}, query, _query);
  return url + ((newQuery === {}) ? '' : ('?' + qs.stringify(newQuery)));
};

function getUserId() {
  if (!store.getters[USER_LOGGED_IN_]) return null;
  return store.state.customer.id;
}

export default {
  get(url, auth = false): Promise<any> {
    const newUrl = mix(url, auth ? {userId: getUserId()} : {});
    return $.get(newUrl);
  },
  post(url, data = {}, auth = false): Promise<any> {
    const newData = Object.assign({}, data, auth ? {userId: getUserId()} : {});
    // return $.post(url, newData);
    return $.ajax({
      method: 'POST',
      url,
      data: newData,
      xhrFields: {
        withCredentials: true
      }
    });
  }
};
