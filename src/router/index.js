import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/Login.vue";
import About from "../views/About.vue";
import ManageUser from "../views/ManageUser";
import ManageProvider from "../views/ManageProvider"
Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/manageuser",
    name: "manageuser",
    component: ManageUser,
  },
  {
    path: "/manageprovider",
    name: "manageprovider",
    component: ManageProvider,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login",
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
