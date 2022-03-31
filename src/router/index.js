import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/Login.vue";
import ManageUser from "@/views/ManageUser";
import ManageProvider from "@/views/ManageProvider";
import Dashboard from "@/views/Dashboard.vue";
import ManageUserCreate from "@/views/ManageUserCreate";
import ManageProviderCreate from "@/views/ManageProviderCreate";
Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { isSecured: false },
    component: Dashboard,
  },
  {
    path: "/ManageUser",
    name: "ManageUser",
    component: ManageUser,
  },
  {
    path: "/ManageUserCreate",
    name: "ManageUserCreate",
    component: ManageUserCreate,
  },
  {
    path: "/ManageProvider",
    name: "ManageProvider",
    component: ManageProvider,
  },
  {
    path: "/ManageProviderCrate",
    name: "ManageProviderCrate",
    component: ManageProviderCreate,
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
