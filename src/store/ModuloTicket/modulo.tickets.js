import  mutations from './mutations'
import actions from './actions'


const initialState = {
  carregando: false,
  carregandoNumeros: false,
  carregandoPosse: false,
  carregandoUnicoTicket: false,
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
}

export const moduloTicket = {
  namespaced: true,
  state: Object.assign({},initialState) ,
  mutations,
  actions
};
