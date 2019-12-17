import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_URL
});

export default  {
  async criarTicket({ commit }, umTicket) {
    commit("loading");
    await apiClient
      .post("/Tickets", umTicket, {
        headers: {
          autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
        }
      })
      .then(resp => {
        if (resp.data.status === false)
          return commit("cadastroFalha", resp.data);

        console.log("resposta", resp.data);
        commit("cadastroSucesso", resp.data);
      })
      .catch(error => {
        console.log("Falha Requisicao", error);

        commit("cadastroFalha", error.message);
      });
  },
  async buscaPaginada(
    { commit },
    { status, numeroPagina, quantidadePagina }
  ) {
    commit("loading");
    if (numeroPagina === undefined) numeroPagina = 1;
    if (quantidadePagina === undefined) quantidadePagina = 10;

    await apiClient
      .get(
        `/Tickets/Todos/${status}?numeroPagina=${numeroPagina}&quantidadePagina=${quantidadePagina}`,
        {
          headers: {
            autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
          }
        }
      )
      .then(resp => {
        console.log("Requisicao realizada!");
        const dados = resp.data;
        console.log("Dados da res", dados);
        return commit("buscaTickets", { status, dados });
      })
      .catch(error => {
        commit("cadastroFalha", error.message);
      });
  },
  async buscarQtd({ commit }) {
    commit("loadingNumbers");


    //uscar quantidade de tickets em aberto
    let abertos = await apiClient.get(
      "/Tickets/Todos/aberto?numeroPagina=1&quantidadePagina=10",
      {
        headers: {
          autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
        }
      }
    )
    
    commit("buscaTickets", { status: "aberto", dados: abertos.data });
    console.log("aberto", abertos.data.paginacao.totalDeRegistros? abertos.data.paginacao.totalDeRegistros:0);

    //buscar quantidade de tickets em andamento
    let andamentos = await apiClient.get(
      "/Tickets/Todos/andamento?numeroPagina=1&quantidadePagina=10",
      {
        headers: {
          autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
        }
      }
    )

    console.log("andamentos", andamentos.data.paginacao.totalDeRegistros? andamentos.data.paginacao.totalDeRegistros:0);
    commit("buscaTickets", { status: "andamento", dados: andamentos.data });

    //buscar quantidade de tickets concluido
    let fechados = await apiClient.get(
      "/Tickets/Todos/concluido?numeroPagina=1&quantidadePagina=10",
      {
        headers: {
          autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
        }
      }
    );
    
    console.log("fechados", fechados.data.paginacao.totalDeRegistros? fechados.data.paginacao.totalDeRegistros:0);
    commit("buscaTickets", { status: "concluido", dados: fechados.data });

    const dados = {
      abertos: abertos.data.paginacao.totalDeRegistros? abertos.data.paginacao.totalDeRegistros:0 ,
      andamentos: andamentos.data.paginacao.totalDeRegistros? andamentos.data.paginacao.totalDeRegistros:0,
      fechados: fechados.data.paginacao.totalDeRegistros? fechados.data.paginacao.totalDeRegistros:0
    };
    commit("buscarNumeros", { dados });

    const totalPag = {
      totalPaginasA: abertos.data.paginacao.totalPaginas,
      totalPaginasC: fechados.data.paginacao.totalPaginas,
      totalPaginasAn: andamentos.data.paginacao.totalPaginas
    };
    commit("setarPaginacao", { totalPag });
  },
  async tomarPosse({ commit }, numeroTicket) {
    commit("carregandoPosse");

    await apiClient
      .post(`/Tickets/PegarTicket/${numeroTicket}`, null, {
        headers: {
          autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
        }
      })
      .then(resp => {
        console.log("Requisicao posse Realizada", resp.data);
        const dados = {
          mensagem: resp.data.resultado,
          status: resp.data.status
        };
        return commit("tomarPosseTicket", { dados });
      })
      .catch(error => {
        commit("cadastroFalha", error.message);
      });
  },
  async buscarOTicket({commit}, numeroTicket){
    await apiClient.get(`/Tickets/${numeroTicket}`,{
      headers: {
        autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
      }
    }).then(resp =>{
      console.log("Busca do ticket Realizada!:", resp.data)
    
        commit("buscarUmTicket",resp.data.resultado)
    }).catch(error => {
      commit("cadastroFalha", error.message);
    });
  }
}