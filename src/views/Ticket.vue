<template>
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
            height="400"
            width="1000"
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
                <v-toolbar-title class="text-center body-1">
                  <v-icon color="white" size="32" class="mr-5 ">forum</v-icon>  <strong>TICKET :</strong>  {{umTicket.titulo}}
                </v-toolbar-title>

               </v-row>
              </v-toolbar>
               
                    <v-row class="mt-5 mb-5" align="center"
                         
                        >
                    <strong class="ml-10 mr-5 ">Número de identificação:</strong>
                    
                    <ins >{{ umTicket.numeroTicket }}</ins>
                    
                    </v-row>
             
                    <v-row class="mt-5 mb-5" align="center"
                        
                        >
                    <strong class="ml-10 mr-5">Mensagem:</strong>
                    
                   <ins>{{umTicket.mensagem}}</ins>
                    
                    </v-row>

                    <v-row class="mt-5 mb-5" align="center"
                        
                        >
                    <strong class="ml-10 mr-5">Data de Cadastro:</strong>
                    
                   {{umTicket.dataCadastro}}
                    
                    </v-row>

                    <v-row class="mt-5 mb-5" align="center"
                       
                        >
                    <strong class="ml-10 mr-5">Status:</strong>
                    
                   {{umTicket.status}}
                    
                    </v-row>
                    <v-row class="mt-5 mb-5" align="center"
                        
                        >
                    <strong class="ml-10 mr-5">Tipos de Status:</strong>
                        1 = Aberto, 3 = Andamento
                    
                    </v-row>
              
              <v-card-actions v-if="umTicket.status === 3">
                 <v-btn block color="primary"  dark @click="mostrarChat = !mostrarChat">Chat</v-btn>
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
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("moduloTicket");
import Chat from '../chat/ChatWindow.vue'


export default {

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

  }
}
}
</script>
