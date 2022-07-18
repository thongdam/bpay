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
import ManageRegister from "@/views/ManageRegister";
import ManagePermission from "@/views/ManagePermission";
import ManageFeeCreate from "@/views/ManageFeeCreate";
import ManageAutodebit from "@/views/ManageAutodebit";
import ManageBill from "@/views/ManageBill";
import ManageRegisterCreate from "@/views/ManageRegisterCreate";
import ManageFeeTransaction from "@/views/ManageFeeTransaction";
import ManageProviderCrateBill from "@/views/ManageProviderCreateBill";
import ManageProviderBill from "@/views/ManageProviderBill";
import ManageProviderEditBill  from "@/views/ManageProviderEditBill";
import CheckUploadData from "@/views/CheckUploadData";
import WaterCheckList from "@/views/WaterCheckList";
import ClosEndOfYear from "@/views/ClosEndOfYear";
import api from "@/services/api";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

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
    meta: { isSecured: true },
    component: Dashboard,
  },
  {
    path: "/ManageUser",
    name: "ManageUser",
    component: ManageUser,
    meta: { isSecured: true },
  },
  {
    path: "/ManageUserCreate",
    name: "ManageUserCreate",
    component: ManageUserCreate,
    meta: { isSecured: true },
  },
  {
    path: "/ManageProvider",
    name: "ManageProvider",
    component: ManageProvider,
    meta: { isSecured: true },
  },
  {
    path: "/ManageProviderCrate",
    name: "ManageProviderCrate",
    component: ManageProviderCreate,
    meta: { isSecured: true },
  },
  {
    path: "/ManageProviderBill",
    name: "ManageProviderBill",
    component: ManageProviderBill,
    meta: { isSecured: true },
  },
  {
    path: "/ManageProviderCrateBill",
    name: "ManageProviderCrateBill",
    component: ManageProviderCrateBill,
    meta: { isSecured: true },
  },
  {
    path: "/ManageProviderEdit/:id",
    name: "ManageProviderEdit",
    component: ManageProviderEdit,
    meta: { isSecured: true },
  },
  {
    path: "/ManageFee",
    name: "ManageFee",
    component: ManageFee,
    meta: { isSecured: true },
  },
  {
    path: "/ManageRegister",
    name: "ManageRegister",
    component: ManageRegister,
    meta: { isSecured: true },
  },
  {
    path: "/ManageRegisterCreate",
    name: "ManageRegisterCreate",
    component: ManageRegisterCreate,
    meta: { isSecured: true },
  },
  {
    path: "/ManageFeeCreate",
    name: "ManageFeeCreate",
    component: ManageFeeCreate,
    meta: { isSecured: true },
  },
  {
    path: "/ManageAutodebit",
    name: "ManageAutodebit",
    component: ManageAutodebit,
    meta: { isSecured: true },
  },
  {
    path: "/ManageBill",
    name: "ManageBill",
    component: ManageBill,
    meta: { isSecured: true },
  },
  {
    path: "/ManageFeeTransaction",
    name: "ManageFeeTransaction",
    component: ManageFeeTransaction,
    meta: { isSecured: true },
  },
  {
    path: "/ManageProviderEditBill/:id",
    name: "ManageProviderEditBill",
    component: ManageProviderEditBill ,
    meta: { isSecured: true },
  },
  {
    path: "/CheckUploadData",
    name: "CheckUploadData",
    component: CheckUploadData ,
    meta: { isSecured: true },
  },
  {
    path: "/WaterCheckList",
    name: "WaterCheckList",
    component: WaterCheckList ,
    meta: { isSecured: true },
  },
  {
    path: "/ManagePermission/:id",
    name: "ManagePermission",
    component: ManagePermission ,
    meta: { isSecured: true },
  },
  {
    path: "/ClosEndOfYear",
    name: "ClosEndOfYear",
    component: ClosEndOfYear ,
    meta: { isSecured: true },
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
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
// Router guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => (record.meta.isSecured ? true : false))) {
    // secure route
    if (api.isLoggedIn()) {
      next();
    } else {
      next("/login");
    }
  } else {
    // unsecure route
    next();
  }
});

export default router;
