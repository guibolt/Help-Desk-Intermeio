<template>
  <v-card class="chat-room">
    <vue-perfect-scrollbar class="chat-room--scrollbar grey lighten-5">
      <v-card-text class="chat-room--list pa-3">
        <template v-for="(item, index) in umTicket.lstRespostas">
          <div :class="[item.usuario.nome === nome ? 'reverse' : '']" class="messaging-item layout row my-4" :key="index">
            <v-avatar class="indigo mx-1" size="40" color="primary">
              {{item.usuario.nome[0]}}
            </v-avatar>
            <div class="messaging--body layout column mx-2">
              <p :value="true" :class="[item.usuario.nome === nome ? 'primary white--text' : 'white']" class="pa-2">
                {{ item.mensagem }}
              </p>
              <div class="caption px-2 text--secondary">
                {{ item.dataCadastro.toLocaleString() }}
              </div>
            </div>
            <v-spacer></v-spacer>
          </div>
        </template>
      </v-card-text>
    </vue-perfect-scrollbar>
     <v-text-field v-model="resposta.mensagem" flat clearable outlined label="Escreva sua mensagem aqui." ></v-text-field>   
    <v-card-actions>   
      <v-spacer></v-spacer>
        <v-flex>
          <v-file-input id="result" show-size counter chips  label="Insira o Anexo"  v-model="arquivo"></v-file-input>
        </v-flex>
        <v-spacer></v-spacer>
      <v-btn @click="EnviarMensagem(umTicket.id)"><v-icon >send</v-icon></v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar"

export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    number: {
      type: Number,
      default: null
    }
  },
  data: ()=> ({
    mostraChat: true,
    arquivo: null,
    nome: '',
    resposta: {
      mensagem: null,
      ticketId: null,
      anexo: {
             nomeArquivo : null,
             Arquivo : null
      },
    }
  }),
  computed: {
   ...mapState('moduloTicket',['umTicket','numeroTicket'],'moduloResposta',['falhaEnviar'])
  },

  methods: {
  ...mapActions('moduloTicket',['buscarOTicket']),
  ...mapActions('moduloResposta',['Responder']),
    async EnviarMensagem(id) {

      
      this.resposta.anexo.nomeArquivo = this.arquivo.name
      // this.resposta.anexo.Arquivo = 
      this.resposta.ticketId = id

    

      await this.Responder({
        mensagem: this.resposta.mensagem,
        ticketId: this.resposta.ticketId ,
        anexo: this.resposta.anexo.nomeArquivo === null ? null : this.resposta.anexo 
      });

      if (this.falhaEnviar != null) {
        const toast = this.$toast;
        this.falhaEnviar.forEach(function(item, indice, array) {
          toast.error(item, "Erro", {
            position: "topRight",
            timeout: 6000
          });
        });
      }

      this.mensagem = "";
      await this.buscarOTicket(this.number);
    }
  },
  async created() {
     this.nome =  JSON.parse(localStorage.getItem("token")).nome
    if(this.number !== undefined){
    await this.buscarOTicket(this.number)
  }
}
}
</script>
