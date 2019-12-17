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
    <v-card-actions>
      <v-text-field  flat clearable solo append-icon="send" label="Escreva sua mensagem aqui.">
        <v-icon slot="append-icon">send</v-icon>
        <v-icon slot="append-icon" class="mx-2">photo</v-icon>
        <v-icon slot="append-icon">face</v-icon>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("moduloTicket");
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
    nome: ''
  }),
  computed: {
     ...mapState(['umTicket','numeroTicket'])
  },

  methods: {
      ...mapActions(['buscarOTicket'])
  },
  async created() {
     this.nome =  JSON.parse(localStorage.getItem("token")).nome
    if(this.number !== undefined)
    await this.buscarOTicket(this.number)
  }
}
</script>
