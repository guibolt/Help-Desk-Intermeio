<template>
<<<<<<< HEAD
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <h1 v-if="!umTicket " class="white--text text-center font-weight-light display-2 mt-10">
            Selecione um ticket no Dashboard para visualizar
            <v-btn class="primary mt-5" @click="$router.push('/')">Voltar</v-btn>
          </h1>

          <v-card v-else tile height="400" width="500" class="ml-10">
            <v-toolbar color="primary" dark flat>
              <v-row align="center" justify="center">
=======

    <v-content>
      <v-container
        class="fill-height "
        fluid >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
              <h1  v-if="!umTicket" class="white--text text-center font-weight-light display-2 mt-10">Selecione um ticket no Dashboard para visualizar
                  <v-btn class="primary mt-5"   @click="$router.push('/')">
                    Voltar
                  </v-btn>

              </h1>

            <v-card 
              v-else
            tile
            height="500"
            width="500"
            class="ml-10"
          
            >
              <v-toolbar
                color="primary"
                dark
                flat
              >
               <v-row
          align="center"
            justify="center"
        >
>>>>>>> Rafael
                <v-toolbar-title class="text-center headline">
                  <v-icon color="white" size="40">forum</v-icon>Ticket Numero:
                  <v-chip color="green">{{ umTicket.numeroTicket }}</v-chip>
                </v-toolbar-title>
<<<<<<< HEAD
              </v-row>
            </v-toolbar>
            <v-card-text class="title">
              <v-chip color="primary" large>Titulo</v-chip>
              {{umTicket.titulo}}
            </v-card-text>
            <v-card-text class="title">
              <v-chip color="primary" large>Mensagem</v-chip>
              {{umTicket.mensagem}}
            </v-card-text>
            <v-card-text class="title">
              <v-chip color="primary" large>Data de Cadastro</v-chip>

              {{umTicket.dataCadastro}}
            </v-card-text>
            <v-card-text class="title">Status: {{umTicket.dataCadastro}}</v-card-text>

            <h2 class="text-center white--text">Chat</h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
=======
               </v-row>
              </v-toolbar>
                <v-card-text class="title" >
                  <v-chip color="primary" large >

                  Titulo
                  </v-chip>
                  {{umTicket.titulo}}
                  </v-card-text>
                <v-card-text class="title" >
                   <v-chip color="primary" large >
                      Mensagem
                     </v-chip>
                 {{umTicket.mensagem}}
                  </v-card-text>
                <v-card-text class="title" >
                    <v-chip color="primary" large >
                       Data de Cadastro
                    </v-chip>

                  {{umTicket.dataCadastro}}

                </v-card-text>
                <v-card-text class="title" >
                  Status: {{umTicket.dataCadastro}}
                  </v-card-text>
              
              <v-card-actions>
                <v-btn @click="mostrarChat = !mostrarChat">Chat</v-btn>
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
              <v-toolbar-title> <h4>{{umTicket.titulo}}</h4></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon slot="activator" @click="mostrarChat= false">
                <v-icon color="text--secondary" >close</v-icon>
              </v-btn>
              </v-card-title>
                <Chat :number="umTicket.numeroTicket"/>
                </v-card>
            </v-dialog>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
>>>>>>> Rafael
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("moduloTicket");
import Chat from '../chat/ChatWindow.vue'


export default {
<<<<<<< HEAD
  computed: {
    ...mapState(["umTicket", "numeroTicket"])
  },

  methods: {
    ...mapActions(["buscarOTicket"])
  },
  async created() {
    if (this.numeroTicket !== undefined)
      await this.buscarOTicket(this.numeroTicket);
=======
  data: () => ({
  mostrarChat: false,
  }),
  computed:{
    ...mapState(['umTicket','numeroTicket'])
  },
  methods:{
  ...mapActions(['buscarOTicket'])
},
   components: {
    Chat
  },

async created(){
  let number = this.numeroTicket
    if(number !== undefined){
  await this.buscarOTicket(number)
>>>>>>> Rafael
  }
};
</script>
