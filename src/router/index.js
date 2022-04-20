import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/Login.vue";
import ManageUser from "@/views/ManageUser";
import ManageProvider from "@/views/ManageProvider";
import Dashboard from "@/views/Dashboard.vue";
import ManageUserCreate from "@/views/ManageUserCreate";
import ManageProviderCreate from "@/views/ManageProviderCreate";
import ManageProviderEdit from "@/views/ManageProviderEdit";
import ManageFee from "@/views/ManageFee";
import  ManageRegister from "@/views/ManageRegister";
import  ManagePermission from "@/views/ManagePermission";
import ManageFeeCreate from "@/views/ManageFeeCreate";
import ManageAutodebit from "@/views/ManageAutodebit";
import ManageBill from "@/views/ManageBill";
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
    path: "/ManageProviderEdit/:id",
    meta: { isSecured: true },
    name: "ManageProviderEdit",
    component: ManageProviderEdit
  },
  {
    path: "/ManageFee",
    name: "ManageFee",
    component: ManageFee
  },
  {
    path: "/ManageRegister",
    name: "ManageRegister",
    component: ManageRegister
  },
  {
    path: "/ManagePermission",
    name: "ManagePermission",
    component: ManagePermission
  },
  {
    path: "/ManageFeeCreate",
    name: "ManageFeeCreate",
    component: ManageFeeCreate
  },
  {
    path: "/ManageAutodebit",
    name: "ManageAutodebit",
    component: ManageAutodebit
  },
  {
    path: "/ManageBill",
    name: "ManageBill",
    component: ManageBill
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
