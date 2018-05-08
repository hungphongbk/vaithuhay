import Component from 'vue-class-component';
import Vue from 'vue';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import {FlashMessageHub} from './index';
import {USER_ACTION_UPDATE} from "../store/types";

@Component({
  components: {FlashMessageHub},
  data() {
    return {
      faTimesCircle,
      faHeart,
      dateTimeOption: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F',
        },
        color: {
          header: '#ccc',
          headerText: '#f00',
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel',
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true, // as true as default
      },
    };
  },
})
export default class UserPanelPageFavorite extends Vue {
  name: string = '';
  birthDay = {
    time: '',
  };
  gender: number = null;

  get customer(){
    return this.$vthStore.state.customer;
  }
  get wholeInfo() {
    const {name, gender} = this,
      first_name = name.split(' ').slice(0, -1).join(' '),
      last_name = name.split(' ').slice(-1).join(' ');
    return {
      first_name,
      last_name,
      gender,
    };
  }

  fetch() {
    this.name = this.customer.name;
    this.gender = this.customer.gender;
  }

  async update() {
    await this.$vthStore.dispatch(USER_ACTION_UPDATE, this.wholeInfo);
    this.fetch();
  }

  mounted() {
    this.fetch();
  }
}

export {default as PageUserInfoIcon} from '@fortawesome/fontawesome-free-solid/faUser';
