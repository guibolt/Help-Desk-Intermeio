import  mutations from './mutations'
import actions from './actions'

export const moduloTicket = {
  namespaced: true,
  state: {
    carregando: false,
    carregandoNumeros: false,
    carregandoPosse: false,
    statusCadastro: null,
    statusReq: null,
    mensagem: null,
    LstTicketsAberto: [],
    LstTicketsAndamento: [],
    LstTicketsConcluido: [],
    paginacaoAbertos: null,
    paginacaoAndamento: null,
    paginacaoConcluido: null,
    totalAbertos: null,
    totalFechados: null,
    totalAndamento: null,
    umTicket: undefined,
    numeroTicket: undefined
  },
  mutations,
  actions
};
