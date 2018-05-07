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
    };
  },
})
export default class UserPanelPageFavorite extends Vue {
  name: string = '';

  get wholeInfo() {
    const {name} = this,
      first_name = name.split(' ').slice(0, -1).join(' '),
      last_name = name.split(' ').slice(-1).join(' ');
    return {
      first_name,
      last_name,
    };
  }

  fetch() {
    this.name = this.$store.state.customer.name;
  }

  async update() {
    await this.$store.dispatch(USER_ACTION_UPDATE, this.wholeInfo);
    this.fetch();
  }

  mounted() {
    this.fetch();
  }
}

export {default as PageUserInfoIcon} from '@fortawesome/fontawesome-free-solid/faUser';
