<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-btn @click="$router.push('/')" text>
        <v-toolbar-title text app class="text-uppercase">
          <span class="font-weight-light">Help-Desk </span>
          <span>Intermeio</span>
        </v-toolbar-title>
      </v-btn>

      <v-spacer></v-spacer>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-toolbar-items>
        <v-btn icon @click="logout">
          Sair
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="secondary"
      :mini-variant.sync="mini"
    >
      <v-list nav dense>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="white">person</v-icon>
          </v-list-item-avatar>


          <v-list-item-content >
            <v-list-item-title class="white--text subtitle-1">{{ userName }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-btn icon @click="mini = !mini">
              <v-icon color="white">chevron_left</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-flex class="mt-4 mb-3">
          <div class="white--text mb-5 ml-5 subtitle-1" v-if="!mini">
            <v-chip color="primary" class="ml-12">{{tipo}}</v-chip>
          </div>
          <div v-else>
            <v-avatar color="primary mb-3 ml-2">
              <span class="white--text headline" size="36">{{tipo[0]}}</span>
            </v-avatar>
          </div>
          <div v-if="tipo === 'CLIENTE'">
            <TicketForm   :titulo="retornaTexto" />
          </div>
        </v-flex>

        <v-divider></v-divider>

        <v-divider></v-divider>
        <v-list dense>
          <v-list-item v-for="item in Itens" :key="item.title" link router :to="item.url">
            <v-list-item-icon>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import TicketForm from "@/components/TicketForm.vue";

const { mapActions, mapState } = createNamespacedHelpers("login");

export default {

  components: {
    TicketForm
  },
  data: () => ({
    titulo: undefined,
    userName: "",
    drawer: false,
    mini: false,
    icon: undefined,
    Itens: undefined
  }),
  methods: {
    ...mapActions(["Deslogar"]),
    ValidaERedireciona(item) {
      if (item.url === this.$route.path) this.drawer = !this.drawer;
      else this.$router.push(item.url);
    },
    async logout() {
      await this.Deslogar();
      this.$router.push("/login");
    },
     setaItensDrawer(tipo){

     switch (tipo) {
        case "ATENDENTE":
          this.Itens =  [
        {
        title: "Dashboard",
        icon: "house",
        url: "/"
      },
       {
        title: "Ticket",
        icon: "view_list",
        url: "/ticket"
      },
      {
        title: "Chat",
        icon: "view_list",
        url: "/tickets"
      }
      ]
          break;

        case "CLIENTE":
        this.Itens = [
      {
        title: "Dashboard",
        icon: "house",
        url: "/"
      },
      {
        title: "Ticket",
        icon: "view_list",
        url: "/ticket"
      },
      {
        title: "Faq",
        icon: "question_answer",
        url: "/cliente"
      }

    ]

     break;

        case "ADM":
    
          break;
      }
  },    
     
},
 computed: {
    ...mapState(["nome", "tipo"]),
     retornaTexto(){
      return this.mini ? '': 'Novo Ticket'

       this.userName[0].toUpperCase() + this.userName.slice(1).toLowerCase()
    }, 

  },
   created() {
    this.userName = this.nome;
    this.setaItensDrawer(this.tipo)
   },
}
</script>
