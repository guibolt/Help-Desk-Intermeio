import Vue from "vue";
import Vuex from "vuex";

import { login } from "./modulo.login"

import { moduloTicket} from './modulo.tickets'
import { moduloResposta } from './modulo.resposta'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    moduloTicket,
    moduloResposta
  }
});
