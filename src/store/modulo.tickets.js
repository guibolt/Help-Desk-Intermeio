import axios from "axios";


const apiClient = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    'autorToken': JSON.parse(localStorage.getItem('token')).tokenUsuario
  }
});

export const moduloTicket = {
  namespaced: true,
  state: {
    carregando: false,
    falhaCadastro: null,
    sucessoCadastro: null,
    LstTicketsAberto: [],
    LstTicketsAndamento: [],
    LstTicketsConcluido: [],
},
mutations: {
  loading: state => state.carregando = true,
  cadastroFalha: (state, resultado) => {
    state.falhaCadastro = resultado;
    state.carregando = false;
},
  cadastroSucesso: (state, resultado) => {
    state.sucessoCadastro = resultado
    state.LstTicketsAberto.push(resultado)
    state.carregando = false;
  }, 
 },
 actions: {
   async criarTicket({commit},umTicket){
    commit('loading')
    await apiClient.post('/Tickets', umTicket).then(resp => {
  
      if (resp.data.status === false)
        return commit("cadastroFalha", response.data.resultado);

      console.log("resposta", resp.data);
      commit("cadastroSucesso", pessoa);
    })
    .catch(error => {
      console.log("Falha", error);

      commit("cadastroFalha", error.message);
    });
   }
 }
}