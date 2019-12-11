import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
import Vuelidate from "vuelidate";

Vue.prototype.$http = Axios;
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';
Vue.use(VueIziToast)
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
