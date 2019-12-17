export default   {
  loading: state => state.carregando = true,
  loadingNumbers: state => state.carregandoNumeros = true,
  carregandoPosse: state => state.carregandoPosse = true,
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
        if(dados === undefined)
        state.LstTicketsAberto = []

        state.LstTicketsAberto = dados.resultado;
        break;
      case "andamento":
        if(dados === undefined)
        state.LstTicketsAndamento = []

        state.LstTicketsAndamento = dados.resultado;
        break;
      case "concluido":
        if(dados === undefined)
        state.LstTicketsConcluido = []
        
        state.LstTicketsConcluido = dados.resultado;
        break;
    }
    state.carregando = false;
  },
  buscarNumeros: (state, { dados }) => {
    state.totalAbertos = dados.abertos  ? dados.abertos : 0
    state.totalFechados = dados.fechados ? dados.fechados : 0
    state.totalAndamento = dados.andamentos  ? dados.andamentos : 0
    state.carregandoNumeros = false;
  },
  setarPaginacao: (state, { totalPag }) => {
    state.paginacaoAbertos = totalPag.totalPaginasA;
    state.paginacaoAndamento = totalPag.totalPaginasAn;
    state.paginacaoConcluido = totalPag.totalPaginasC;
  },
  tomarPosseTicket: (state, { dados }) => {
    state.statusReq = dados.status;
    state.mensagem = dados.mensagem;
  },
  buscarUmTicket: (state, ticket) => state.umTicket = ticket
  ,
  setarNumeroTicket: (state,numeroTicket) => state.numeroTicket = numeroTicket,

}