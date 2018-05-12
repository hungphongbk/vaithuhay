import Component                                                               from 'vue-class-component';
import Vue                                                                     from 'vue';
import faTimesCircle
                                                                               from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import faHeart
                                                                               from '@fortawesome/fontawesome-free-solid/faHeart';
import faSave
                                                                               from '@fortawesome/fontawesome-free-regular/faSave';
import {USER_ACTION_UPDATE, USER_MUTATION_LOGIN_, USER_MUTATION_NAVIGATE_PAGE} from "@/store/types";
import {DateTimePicker, FlashMessageHub}                                       from '@/components';

@Component({
  components: {
    FlashMessageHub,
    DateTimePicker
  },
  data() {
    return {
      faTimesCircle,
      faHeart,
      faSave,
    };
  },
})
export default class UserPanelPageFavorite extends Vue {
  name: string = '';
  birthday = null;
  gender: number = null;

  get customer() {
    return this.$vthStore.state.customer;
  }

  get wholeInfo() {
    const {name, gender, birthday} = this,
      first_name = name.split(' ').slice(0, -1).join(' '),
      last_name = name.split(' ').slice(-1).join(' ');
    return {
      first_name,
      last_name,
      gender,
      birthday,
    };
  }

  fetch() {
    this.name = this.customer.name;
    this.gender = this.customer.gender;
    this.birthday = this.customer.birthday;
  }

  async update() {
    await this.$vthStore.dispatch(USER_ACTION_UPDATE, this.wholeInfo);
    this.fetch();
  }

  goToPageAddress() {
    this.$vthStore.commit(USER_MUTATION_NAVIGATE_PAGE, 2);
  }

  mounted() {
    this.fetch();
    this.$vthStore.subscribe(mutation => {
      if (mutation.type === USER_MUTATION_LOGIN_) {
        this.fetch();
      }
    });
  }
}

export {default as PageUserInfoIcon} from '@fortawesome/fontawesome-free-solid/faUser';
