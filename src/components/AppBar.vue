<template>
  <div>
    <v-app-bar color="primary"  dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn @click="$router.push('/')" text>
      <v-toolbar-title text app class="text-uppercase" >
      <span class="font-weight-light">
        Help-Desk
      </span>
      <span>
        Intermeio
      </span>
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

    <v-navigation-drawer v-model="drawer" absolute bottom temporary color="secondary"
    :mini-variant.sync="mini"
    >
      <v-list nav dense >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="white">account_circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content >
            <v-list-item-title class="white--text">{{userName}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content >
           <v-btn icon
           @click="mini = !mini"
           >
             <v-icon color="white">
               chevron_left
             </v-icon>
           </v-btn>
          </v-list-item-content>

        </v-list-item>

        <v-divider></v-divider>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
           router :to="item.url"

          >
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

const { mapActions, mapState } = createNamespacedHelpers("login");

export default {
  data: () => ({
    userName: "Joao",
    drawer: false,
    mini: false,
    icon: undefined,
    items: [
      {
        title: "Home",
        icon: "dashboard",
        url: "/home"
      },
      {
        title: "Alunos e Professores",
        icon: "people",
        url: "/pessoas"
      },
      {
        title: "Criar Ticket",
        icon: "create",
        url : ""
      }
    ]
  }),
  methods: {
    ...mapActions({
      fazerLogout: "logout"
    }),
    ValidaERedireciona(item) {
      if (item.url === this.$route.path) this.drawer = !this.drawer;
      else this.$router.push(item.url);
    },
    logout() {
      this.fazerLogout().then(this.$router.push("/login"));
    },
     modificaMini(){

  }
  }

 
};
</script>
