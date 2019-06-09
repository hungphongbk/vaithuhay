import faFacebook from "@fortawesome/fontawesome-free-brands/faFacebookF";
import faGoogle from "@fortawesome/fontawesome-free-brands/faGoogle";
import AppLoginWrapper from "@/components/app__LoginWrapper";
import { USER_IS_LOGGING_IN } from "@/store/types";

const firebasePromise = () =>
  import(/* webpackChunkName: "firebase" */ "@/plugins/firebase");

export default {
  components: {
    AppLoginWrapper
  },
  data:()=>({
    customer: {
      email: "",
      password: ""
    },
    faFacebook,
    faGoogle
  }),
  methods: {
    facebookLogin() {
      this.$vthStore.commit(USER_IS_LOGGING_IN);
      FB.login(
        async ({ authResponse }) => {
          console.log(authResponse);
          if (authResponse) {
            const [email, password] = atob(
              await $.post(
                "https://server.vaithuhay.com/b/social/auth/facebook",
                { access_token: authResponse.accessToken }
              )
            ).split(":");
            this.$refs.form.login(email, password);
          }
        },
        { scope: "email" }
      );
    },
    async googleLogin() {
      this.$vthStore.commit(USER_IS_LOGGING_IN);
      const { default: firebase } = await firebasePromise(),
        provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      firebase.auth().languageCode = "vi";
      provider.setCustomParameters({
        login_hint: "user@example.com"
      });

      //begin login
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result.user);
    }
  }
  // beforeCreate() {
  //   $.cachedScript('https://apis.google.com/js/client.js');
  // }
};
