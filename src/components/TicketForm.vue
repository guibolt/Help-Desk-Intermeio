<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" block v-on="on">
        <v-icon>add</v-icon>
        {{titulo}}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-col justify="center" align="center">
          <h2 class="display-1 blue-grey lighten-5 primary--text">
            <strong>Adcionar Novo Ticket</strong>
          </h2>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Titulo"
            color="secondary"
            v-model="ticket.titulo"
            prepend-icon="folder"
            :rules="regrasTitulo"
          ></v-text-field>
          <v-text-field
            label="Mensagem"
            color="secondary"
            v-model="ticket.mensagem"
            prepend-icon="message"
            :rules="regrasInfo"
          ></v-text-field>

          <v-btn
            @click="adicionarTicket"
            text
            block
            class="primary mx-0 mt-3"
            :loading="carregando"
          >Adicionar!</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("moduloTicket");

export default {
  props:{
    titulo: String
  },
  data: () => ({
    ticket: {
      titulo: "",
      mensagem: ""
    },
    regrasTitulo: [v => (v && v.length >= 5) || "Tamanho mínimo é 5"],
    regrasInfo: [v => (v && v.length >= 10) || "Tamanho mínimo é 10"],
    dialog: false
  }),
  computed: {
    ...mapState([
      "carregando",
      "falhaCadastro",
      "sucessoCadastro",
      "mensagem",
      "statusCadastro"
    ])
  },
  methods: {
    ...mapActions(["criarTicket","buscarQtd"]),

    async adicionarTicket() {
      await this.criarTicket({
        titulo: this.ticket.titulo,
        mensagem: this.ticket.mensagem
      }).then(() => {
        if (this.statusCadastro) {
          this.$toast.success(`${this.mensagem}`, "Sucesso", {
            position: "topRight"
          });
          this.dialog = false;
          this.$refs.form.reset();
          this.buscarQtd()
        } else {
          this.$toast.error(`${this.mensagem}`, "Erro", {
            position: "topRight"
          });
        }
      });
    }
  }
};
</script>
