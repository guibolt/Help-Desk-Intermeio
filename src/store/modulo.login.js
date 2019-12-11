import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { stat } from "fs";

Vue.use(Vuex);

const baseURL = process.env.VUE_APP_URL;

const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const login = {
  namespaced: true,
  state: {
    ErrorLogin: null,
    ErroCadastro: null,
    SucessoLogin: false,
    nome: "",
    tipo: "",
    email: "",
    ACarregar: false
  },

  mutations: {
    //essa área eu declaro meus commit's e oque eles vão receber...
    Carregado: state => (state.ACarregar = true),
    FalhaLogar: (state, MensagemErro) => {
      state.ProcessouLogin = false;
      state.ErrorLogin = MensagemErro;
      state.SucessoLogin = false;
      state.nome = "";
      state.tipo = "";
    },
    SucessoAoLogar: (state, resultado, status) => {
      if (resultado != null && status != false) {
        state.nome = resultado.nome;
        state.tipo = resultado.tipo;
        state.SucessoLogin = status;
      }
    },
    usuario: (state, DadosCadastro) => {
      state.nome = DadosCadastro.nome;
      state.email = DadosCadastro.email;
      state.ACarregar = false;
      state.ErroCadastro = null;
    },
    ErroCadastro: (state, MensagemErro) => {
      state.ErroCadastro = MensagemErro;
      state.nome = "";
      state.email = "";
      state.ACarregar = false;
    }
  },
  actions: {
    async Logar({ commit }, DadosLogin) {
      //aqui declaro que o primeiro commit vai ser de InicioLogin aonde o estou processando o login....
      commit("Carregando");
      await apiClient
        .post("/Usuarios/Autenticas", {
          //Dados login eu recebo lá na minha Login.Vue.
          ...DadosLogin
        })
        .then(resposta => {
          let resultado = resposta.data.resultado;

          console.log("Resultado do Login", resultado);

          if (resposta.data.status == false)
            return commit("FalhaLogar", resultado);
          //se o status do login for true eu declaro que a falha ao logar recebe null e mando os dados pro meu commit sucesso ao logar..
          commit("FalhaLogar", null);

          commit("SucessoAoLogar", resultado, resposta.data.status);

          localStorage.setItem("token", JSON.stringify(resultado));
        })
        .catch(erro => {
          //só cai no bloco catch se não conseguir se comunicar com a API...
          commit("FalhaLogar", [erro.message]);
        });
    },
    async Cadastrar({ commit }, DadosCadastro) {
      //carregando requisição ...
      commit("Carregando");
      await apiClient
        .post("/Usuarios", {
          //enviando dados do cadastro
          ...DadosCadastro
        })
        .then(resposta => {
          let resultado = resposta.data.resultado;
          if (resposta.data.status == false)
            return commit("ErroCadastro", resultado);

          commit("usuario", resultado);
        })
        .catch(erro => {
          commit("ErroCadastro", erro.message);
        });
    }
  }
};
