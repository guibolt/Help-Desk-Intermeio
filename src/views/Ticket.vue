<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <h1 v-if="!umTicket" class="white--text text-center font-weight-light display-2 mt-10">
            Selecione um ticket no Dashboard para visualizar
            <v-btn class="primary mt-5" @click="$router.push('/')">Voltar</v-btn>
          </h1>

          <v-card v-else tile height="370" width="1000" class="ml-10">
            <v-toolbar color="primary" dark flat>
              <v-row align="center" justify="center">
                <v-toolbar-title class="text-center body-1">
                  <v-icon color="white" size="32" class="mr-5">forum</v-icon>
                  <strong>TICKET :</strong>
                  {{umTicket.titulo}}
                </v-toolbar-title>
              </v-row>
            </v-toolbar>

            <v-row class="mt-5 mb-5" align="center">
              <strong class="ml-10 mr-5">Número de identificação:</strong>

              <ins>{{ umTicket.numeroTicket }}</ins>
            </v-row>

            <v-row class="mt-5 mb-5" align="center">
              <strong class="ml-10 mr-5">Mensagem:</strong>

              <ins>{{umTicket.mensagem}}</ins>
            </v-row>

            <v-row class="mt-5 mb-5" align="center">
              <strong class="ml-10 mr-5">Data de Cadastro:</strong>

              {{umTicket.dataCadastro}}
            </v-row>

            <v-row class="mt-5 mb-5" align="center">
              <strong class="ml-10 mr-5">Status:</strong>

              {{setaStatusTicket(umTicket)}}
            </v-row>

            <v-row v-if="umTicket.status === 4" class="mt-5 mb-5" align="center">
              <strong class="ml-10 mr-5">Avaliação:</strong>

              <v-rating
                v-model="umTicket.avaliacao"
                background-color="purple lighten-3"
                color="purple"
                small
              ></v-rating>
            </v-row>

            <v-card-actions
              v-show="umTicket.status === 1 | umTicket.status === 2 | umTicket.status === 3 "
            >
              <v-btn block outlined color="primary" dark @click="mostrarChat = !mostrarChat">Chat</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn block outlined color="secondary" dark @click="dialog = !dialog ">Concluir ticket</v-btn>
            </v-card-actions>

             <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }"></template>
    <v-card>
      <v-card-title>
        <v-col justify="center" align="center">
          <h2 class="display-1 blue-grey lighten-5 primary--text mb-5">
            Classifique o atendimento
          </h2>
             <v-rating
        v-model="avaliacao"
        background-color="primary"  
        half-increments
        hover
        size="40"
        class="mb-5"
        ></v-rating>
        <v-btn icon
        @click="finalizarTicket()"
        large
        >
          Salvar e Concluir ticket
          <v-icon size="30"
          right="">
              save
          </v-icon>
        </v-btn>
        </v-col>
      </v-card-title>


      
      
  
    </v-card>
  </v-dialog>

       

  
                    <v-row class="mt-5 mb-5" align="center"
                         
                        >
                    <strong class="ml-10 mr-5 ">Número de identificação:</strong>
                    
                    <ins >{{ umTicket.numeroTicket }}</ins>
                    
                    </v-row>
             
                    <v-row class="mt-5 mb-5" align="center"
                        
                        >
                    <strong class="ml-10 mr-5">Mensagem:</strong>
                    
                  {{umTicket.mensagem}}
                    
                    </v-row>

                    <v-row class="mt-5 mb-5" align="center"
                        
                        >
                    <strong class="ml-10 mr-5">Data de Cadastro:</strong>
                    
                   {{umTicket.dataCadastro}}
                    
                    </v-row>

                    <v-row class="mt-5 mb-5" align="center"
                       
                        >
                    <strong class="ml-10 mr-5">Status:</strong>
                    
                   {{setaStatusTicket(umTicket)}}
                    
                    </v-row>


                    <v-row v-if="umTicket.status === 4" class="mt-5 mb-5" align="center"
                       
                        >
                    <strong class="ml-10 mr-5">Avaliação:</strong>
                    
                    <v-rating
                        v-model="umTicket.avaliacao"
                        background-color="purple lighten-3"
                        color="purple"
                        small
                      ></v-rating>
                    
                    </v-row>



              <v-card-actions v-show="umTicket.status === 1 | umTicket.status === 2 | umTicket.status === 3 ">
                 <v-btn block outlined color="primary"  dark @click="mostrarChat = !mostrarChat">Chat</v-btn>
              </v-card-actions> 
                <v-dialog 
              class="mx-auto pa-6 transition-swing"
              v-model="mostrarChat"
              persistent
              max-width="700"
              @click.stop="mostrarChat = true"
            >
              <template v-slot:activator="{ on }"></template>
              <v-card>
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-title>
                    <h4>{{umTicket.titulo}}</h4>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon slot="activator" @click="mostrarChat= false">
                    <v-icon color="text--secondary">close</v-icon>
                  </v-btn>
                </v-card-title>
                <Chat :number="umTicket.numeroTicket" />
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("moduloTicket");
import Chat from "../components/ChatWindow.vue";

export default {
  data: () => ({
    mostrarChat: false,
    avaliacao: 0,
    dialog: false
  }),
  computed: {
    ...mapState(["umTicket", "numeroTicket","mensagem"])
  },
  methods: {
    ...mapActions(["buscarOTicket","concluirTicket"]),
    setaStatusTicket(ticket) {
      switch (ticket.status) {
        case 1:
          console.log("Aberto!", ticket.status);
          return "Aberto";
        case 2 && 3:
          return "Em andamento";
        case 4:
          return "Concluído";
      }
    },
    async finalizarTicket(){

      let avalicao = {
       avaliacao: this.avaliacao,
        ticketId: this.umTicket.id
      }
      console.log("obj", avalicao)
      await this.concluirTicket(avalicao)
      this.$toast.success("Ticket finalizado com sucesso!", "Sucesso", {
            position: "topRight"
          });

     this.$router.push('/')     
    }
  },
  components: {
    Chat
  },
  async created() {
    if (this.numeroTicket !== undefined) {
      await this.buscarOTicket(this.numeroTicket);
    }
  }
};
</script>
