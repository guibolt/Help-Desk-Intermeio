import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_URL
});

export const moduloResposta ={
    namespaced: true,
    state: {
        enviando: false,
        falhaEnviar: null,
        carregando: false
    },
    mutations: {
        carregar: state => state.carregando = true,
        PostarResposta: (state, resultado) => {
            state.carregando = false,
            state.falhaEnviar = false 
        }, 
         cadastroFalha: (state, resultado) => {
            state.falhaEnviar = resultado;
            state.carregando = false;
        },
    },
    actions : {
        async Responder({commit}, Dados) {
            commit('carregar')
            await apiClient.post("/Respostas", Dados , {
                headers: {
                  autorToken: JSON.parse(localStorage.getItem("token")).tokenUsuario
                }
              }).then(res => {
                  console.log("Resposta => ",res)

                  if(res.data.status === false)
                    return commit('cadastroFalha', res.data.resultado)

                return commit('PostarResposta', res.data.resultado)
              }).catch(error => {
                console.log("Erro Resposta => ", error)

                commit('cadastroFalha', error.message)
              });
              
        }
    }
}