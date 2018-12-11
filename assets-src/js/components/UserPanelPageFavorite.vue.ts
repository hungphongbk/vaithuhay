import Component from "vue-class-component";
import Vue from "vue";
import { Action, Getter } from "vuex-class";
import { USER_FAVORITES, USER_TOGGLE_FAVORITE } from "../store/types";
import faTimesCircle from "@fortawesome/fontawesome-free-solid/faTimesCircle";
import faHeart from "@fortawesome/fontawesome-free-solid/faHeart";
import { FlashMessageHub } from "./index";
import ProductItem from "./products";

@Component({
  components: { FlashMessageHub, ProductItem },
  data: () => ({
    faTimesCircle,
    faHeart
  })
})
export default class UserPanelPageFavorite extends Vue {
  @Getter(USER_FAVORITES) favorites: Array<any>;
  @Action(USER_TOGGLE_FAVORITE) favoriteToggle: Promise<any>;
}

export {
  default as PageFavoriteIcon
} from "@fortawesome/fontawesome-free-solid/faHeart";
