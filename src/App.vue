<template>
 <v-app style="
    background: #8e9eab;
     ">
    <v-content>
      <AppBar v-if="$route.path !== '/login'" />
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
export default {
  name: 'App',
  components: {
    AppBar
  },
    created(){
      if (localStorage.getItem("token"))
       this.$router.push("/login");
  }
};
</script>
