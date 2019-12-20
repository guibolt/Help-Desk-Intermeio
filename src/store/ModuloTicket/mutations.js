const  initialState = {
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

export default {
  loading: state => (state.carregando = true),
  loadingNumbers: state => (state.carregandoNumeros = true),
  carregandoPosse: state => (state.carregandoPosse = true),
  carregandoTicket: state => state.carregandoUnicoTicket = true,
  cadastroFalha: (state, data) => {
    state.statusCadastro = data.status;
    state.carregando = false;
    state.mensagem = data.resultado;
  },
  cadastroSucesso: (state, data) => {
    state.statusCadastro = data.status;
    state.LstTicketsAberto.push(data);
    state.carregando = false;
    state.mensagem = data.resultado;
  },
  buscaTickets: (state, { status, dados }) => {
    switch (status) {
      case "aberto":
        state.LstTicketsAberto = dados.resultado;
        break;
      case "andamento":
        state.LstTicketsAndamento = dados.resultado;
        break;
      case "concluido":
        state.LstTicketsConcluido = dados.resultado;
        break;
    }
    state.carregando = false;
  },
  tomarPosseTicket: (state, { dados }) => {
    state.statusReq = dados.status;
    state.mensagem = dados.mensagem;
  },
  buscarUmTicket: (state, ticket) => {
    state.umTicket = ticket
    state.carregandoTicket = false
  },
  setarNumeroTicket: (state, numeroTicket) =>
    (state.numeroTicket = numeroTicket),
  setaTotalAbertos: (state, numeroAbertos) =>
    (state.totalAbertos = numeroAbertos ? numeroAbertos : 0),
  setaTotalAndamento: (state, numeroAndamento) =>
    (state.totalAndamento = numeroAndamento ? numeroAndamento : 0),
  setaTotalFechados: (state, numeroFechados) => {
    state.totalFechados = numeroFechados ? numeroFechados : 0;
    state.carregandoNumeros = false;
  },
  setaPaginacaoAbertos: (state, numeroAbertos) =>
    (state.paginacaoAbertos = numeroAbertos ? numeroAbertos : 0),
  setaPaginacaoFechados: (state, numeroFechados) =>
    (state.paginacaoConcluido = numeroFechados ? numeroFechados : 0),
  setaPaginacaoAndamentos: (state, numeroAndamentos) =>
    (state.setaPaginacaoAndamentos = numeroAndamentos ? numeroAndamentos : 0),
  resetStore(state) {
    console.log("Execuntando!");
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  }
};
