<template>
  <v-app style="
    background: #8e9eab;
     ">
    <v-content>
      <AppBar :Itens="itensDrawer" v-if="$route.path !== '/login' " />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
export default {
  name: "App",
  components: {
    AppBar
  },
  data:()=>({
    itensDrawer: undefined
  })
  // created() {
  //   if ( localStorage.getItem("token")) 
  //      this.$router.push("/");
  // }
}
</script>
