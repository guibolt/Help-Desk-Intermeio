import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/DashBoard.vue')
  },

  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/teste",
    name: "teste",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Teste.vue")
  },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  /*Configura as rotas que nao precisam de autorizacao*/
  const publicPages = ["/login"];

  //Verifica se a rota que o usuario quer precisa ou não de autorizacao
  const authRequired = !publicPages.includes(to.path);

  //Verificar se usuario esta logado no sistema
  const isLogado = JSON.parse(localStorage.getItem("token"));

  store.state.login.SucessoLogin = isLogado == null ? false : true;
  if (store.state.login.SucessoLogin)
    store.commit("login/SucessoAoLogar", isLogado);

  //Verifica se o usuario esta logado ou nao
  if (!store.state.login.SucessoLogin)
    if (authRequired && !store.state.login.SucessoLogin) return next("/login");

  next();
});

export default router;
