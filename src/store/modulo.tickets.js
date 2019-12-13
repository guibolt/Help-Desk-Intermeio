import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

export const moduloTicket = {
  namespaced: true,
  state: {
    carregando: false,
    statusCadastro: null,
    mensagem: null,
    LstTicketsAberto: null,
    LstTicketsAndamento: null,
    LstTicketsConcluido: null,
    paginacaoGeral: null,
    totalAbertos: null,
    totalFechados: null,
    totalAndamento: null,
  },
  mutations: {
    loading: state => state.carregando = true,
    cadastroFalha: (state, data) => {
      state.statusCadastro = data.status;
      state.carregando = false;
      state.mensagem = data.resultado
  },
    cadastroSucesso: (state, data) => {
      state.statusCadastro = data.status
      state.LstTicketsAberto.push(data)
      state.carregando = false;
      state.mensagem = data.resultado
    }, 
    buscaTickets: (state, { status, dados }) => {
      switch (status) {
          case "aberto":
              state.LstTicketsAberto = dados.resultado
              break;
          case "andamento":
              state.LstTicketsAndamento = dados.resultado
              break;
          case "concluido":
              state.LstTicketsConcluido = dados.resultado
              break;
      }
      state.carregando = false;
    },
    buscarNumeros: ( state, {dados}) => {
      state.totalAbertos = dados.abertos;
      state.totalFechados = dados.fechados;
      state.totalAndamento = dados.andamentos;
       state.carregando = false;
     
    },
    setarPaginacao : (state, dados) => state.paginacaoGeral = dados.paginacao.totalPaginas
  }, 
  actions: {
    
    async criarTicket({commit},umTicket){
      commit('loading')
      await apiClient.post('/Tickets', umTicket, {
        headers: { 'autorToken': JSON.parse(localStorage.getItem("token")).tokenUsuario }
      }
      ).then(resp => {
    
        if (resp.data.status === false)
          return commit("cadastroFalha", resp.data);

        console.log("resposta", resp.data);
        commit("cadastroSucesso",resp.data);
      }).catch(error => {
        console.log("Falha Requisicao", error);
        
        commit("cadastroFalha", error.message);
      });
    },
    async buscar({ commit }, { status, numeroPagina, quantidadePagina }) {
      commit('loading')
      if (numeroPagina === undefined) numeroPagina = 1;
      if (quantidadePagina === undefined) quantidadePagina = 10;

      await apiClient.get(`/Tickets/Todos/${status}?numeroPagina=${numeroPagina}&quantidadePagina=${quantidadePagina}`,{
        headers: { 'autorToken': JSON.parse(localStorage.getItem("token")).tokenUsuario }
      }
      )
          .then(resp => {
              const dados = resp.data
              return commit('buscaTicket', { status, dados })
          })
          .catch(error => {
              commit('cadastroFalha', error.message)
          })
    }, 
    async buscarQtd({commit}){
      commit('loading')
    
      //uscar quantidade de tickets em aberto
     let abertos = await apiClient.get('/Tickets/Todos/aberto?numeroPagina=1&quantidadePagina=10',{
      headers: { 'autorToken': JSON.parse(localStorage.getItem("token")).tokenUsuario }
    })
    commit('buscaTickets',{ status: 'aberto', dados: abertos.data})
     console.log('aberto', abertos.data.paginacao.totalDeRegistros)
    commit('setarPaginacao',abertos.data)
   
      //buscar quantidade de tickets em andamento
      let andamentos =   await apiClient.get('/Tickets/Todos/andamento?numeroPagina=1&quantidadePagina=10',{
        headers: { 'autorToken': JSON.parse(localStorage.getItem("token")).tokenUsuario }
      })
      console.log('andamentos', andamentos.data.paginacao.totalDeRegistros)
      commit('buscaTickets',{ status: 'andamento', dados: andamentos.data})
      
      
      //buscar quantidade de tickets concluido
      let fechados =  await apiClient.get('/Tickets/Todos/concluido?numeroPagina=1&quantidadePagina=10',{
        headers: { 'autorToken': JSON.parse(localStorage.getItem("token")).tokenUsuario }
      })
      console.log('fechados', fechados.data.paginacao.totalDeRegistros)
      commit('buscaTickets',{ status: 'concluido', dados: fechados.data})
  

      const dados = {
        abertos: abertos.data.paginacao.totalDeRegistros,
        andamentos: andamentos.data.paginacao.totalDeRegistros,
        fechados: fechados.data.paginacao.totalDeRegistros
      }

      commit('buscarNumeros', {dados})

    }
    
  }
}