import Vue from "vue";
import Vuex from "vuex";

import { login } from "./modulo.login"
import { moduloTicket} from './ModuloTicket/modulo.tickets'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    moduloTicket
  }
});
