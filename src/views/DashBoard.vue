<template>
  <v-container fluid>
    <h1 class="display-2 white--text text-center mt-5 font-weight-bold" >DashBoard</h1>
    <v-row align="center" justify="space-around" style="height: 300px;">
      <v-card class="mx-auto mb-5" width="350" shaped v-for="card in cards" :key="card.title">
        <v-card-text>
          <v-toolbar color="primary" dark>
            <v-col justify="center" align="center">
              <v-toolbar-title class="font-weight-light text-uppercase">{{card.title}}</v-toolbar-title>
            </v-col>
          </v-toolbar>

          <div class="mt-5 font-weight-bold subheading text-center">
            Atualmente há
            <v-progress-circular
              v-show="carregandoNumeros"
              indeterminate
              color="secondary"
              width="2"
            ></v-progress-circular>
            <v-avatar
              color="primary"
              class="white--text"
              size="20"
              v-show="!carregandoNumeros"
            >{{retornaQuantidade(card)}}</v-avatar>
            {{card.title}}
          </div>
          <v-btn icon class="font-weight-bold py-2" block @click="setaALista(card)">
            Visualizar
            <v-icon right>remove_red_eye</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-row>

    <h1
      class="white--text text-center font-weight-light display-2 mt-10"
      v-if="listaTickets.length === 0"
    >Selecione uma categoria para visualizar os tickets</h1>

    <v-row v-else justify="center" align="center">
      <h1
        class="subheading white--text text-center mt-5 font-weight-light text-uppercase"
        v-show="!validaArray"
      >
        Tickets
        <v-icon color="white" size="40">forum</v-icon>
      </h1>
    </v-row>
    <v-row justify="center" align="center" class="mt-5">
      <v-progress-circular v-show="carregando" indeterminate color="white" width="4" size="100"></v-progress-circular>

      <h1
        class="white--text text-center font-weight-light display-2 mt-10"
        v-if="validaArray"
      >{{listaTickets[0]}}</h1>

      <v-card
        flat
        v-for="ticket in listaTickets"
        :key="ticket.title"
        width="1600"
        class="mb-1"
        shaped
        v-show="!carregando"
        v-else
      >
        <v-layout row wrap class="pa-3 ticket">
          <v-flex xs12 md4>
            <div class="caption blue--text">Titulo do Ticket</div>
            <div>{{ ticket.titulo }}</div>
          </v-flex>
          <v-flex xs6 sm4 md4>
            <div class="caption blue--text">Descrição do Ticket</div>
            <div>{{ ticket.mensagem }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Criado em</div>
            <div>{{ ticket.dataCadastro }}</div>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <div class="caption blue--text">Número</div>
            <div class="right">

              <v-chip small color="secondary">{{ ticket.numeroTicket }}</v-chip>
              <v-btn
                class="ml-5"
                icon
                @click="pegarTicket(ticket.numeroTicket)"
                v-if="tipo === 'aberto' && tipoUsuario === 'ATENDENTE'"
              >
                <strong>Tomar Posse</strong>
                <v-icon right color="green">fiber_new</v-icon>
              </v-btn>
              <v-chip icon class="ml-5" v-else-if="tipo === 'andamento'" link color="primary" outlined="" @click="selecionarTicket(ticket.numeroTicket)">
                Responder
                <v-icon right>message</v-icon>
                
              </v-chip>
                 <v-chip  color="primary" outlined link
                  @click="selecionarTicket(ticket.numeroTicket)"
                  icon class="ml-5 mb-1 secondary--text" v-else>
                Visualizar
                <v-icon right>remove_red_eye</v-icon>
              </v-chip>
                 
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
      <v-pagination
        v-model="pagina"
        :length="paginacaoAtual"
        circle
        @input="buscaTickets"
        v-show="listaTickets.length >0 && !validaArray"
        color="primary "
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState, mapMutations } = createNamespacedHelpers("moduloTicket");

export default {

  data: () => ({
    pagina: 1,
    tipo: "",
    tipoUsuario: undefined,
    showTicket: true,
    cards: [
      { title: "TICKETS ABERTOS" },
      { title: "Tickets em andamento" },
      { title: "Tickets Concluídos" }
    ],
    listaTickets: [],
    paginacaoAtual: undefined,
    dialog: false
  }),
  computed: {
    ...mapState([
      "totalAbertos",
      "totalFechados",
      "totalAndamento",
      "carregando",
      "LstTicketsAberto",
      "LstTicketsAndamento",
      "LstTicketsConcluido",
      "paginacaoAbertos",
      "paginacaoAndamento",
      "paginacaoConcluido",
      "carregandoNumeros",
      "statusReq",
      "mensagem",
      "carregandoPosse"
    ]),
    validaArray() {
      switch (this.tipo) {
        case "aberto":
          return (
            this.listaTickets.length === 1 &&
            this.listaTickets[0] === "Você não tem tickets abertos no momento!"
          );

        case "andamento":
          return (
            this.listaTickets.length === 1 &&
            this.listaTickets[0] ===
              "Você não tem tickets andamentos no momento!"
          );
          break;

        case "concluido":
          return (
            this.listaTickets.length === 1 &&
            this.listaTickets[0] ===
              "Você não tem tickets concluidos no momento!"
          );
          break;
      }
    }
  },
  methods: {
    ...mapActions([
      "buscarQtd",
      "resetarStore",
      "buscaPaginada",
      "tomarPosse",
      "chamaReset"
    ]),
    retornaQuantidade(card) {
      switch (card.title) {
        case "TICKETS ABERTOS":
          return this.totalAbertos;
          
        case "Tickets em andamento":
          return this.totalAndamento;
  
        case "Tickets Concluídos":
          return this.totalFechados;
      }
    },
    setaALista(card) {
      switch (card.title) {
        case "TICKETS ABERTOS":
          this.tipo = "aberto";
          this.listaTickets = this.LstTicketsAberto;
          this.paginacaoAtual = this.paginacaoAbertos;
          break;

        case "Tickets em andamento":
          this.tipo = "andamento";
          this.listaTickets = this.LstTicketsAndamento;
          this.paginacaoAtual = this.paginacaoAndamento;
          break;

        case "Tickets Concluídos":
          this.tipo = "concluido";
          this.listaTickets = this.LstTicketsConcluido;
          this.paginacaoAtual = this.paginacaoConcluido;
          break;
      }
    },
    async buscaTickets(pagina) {
      await this.buscaPaginada({ status: this.tipo, numeroPagina: pagina });
      switch (this.tipo) {
        case "aberto":
          this.listaTickets = this.LstTicketsAberto;
          break;

        case "andamento":
          this.listaTickets = this.LstTicketsAndamento;
          break;

        case "concluido":
          this.listaTickets = this.LstTicketsConcluido;
          break;
      }
    },
    async pegarTicket(numeroTicket) {
      const toast = this.$toast;
      await this.tomarPosse(numeroTicket).then(() => {
        if (this.statusReq) {
          this.$toast.success(this.mensagem[0], "Sucesso", {
            position: "topRight"
          });
        } else {
          this.$toast.error(this.mensagem[0], "Erro", {
            position: "topRight"
          });
        }
      });
      await this.buscarQtd();
      await this.buscaTickets();
    },
    ...mapMutations(["setarNumeroTicket"]),
    selecionarTicket(numeroticket) {
      this.setarNumeroTicket(numeroticket);
      this.$router.push("/ticket");
    }
  },
  async created() {
    await this.buscarQtd();
    this.tipoUsuario = JSON.parse(localStorage.getItem("token")).tipo;
  },
  destroyed() {
    this.chamaReset();
  }
};

</script>

<style>
.ticket {
  border-left: 4px solid #1e88e5;
  border-right: 4px solid #1e88e5;
}
</style>