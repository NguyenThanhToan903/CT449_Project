import { createWebHistory, createRouter } from "vue-router";
import LayoutAdmin from "@/views/admin/Layout.vue";
import LayoutClient from "@/views/client/Layout.vue";
import authService from "@/services/auth.service";

const ClientRoutes = [
  {
    path: "/",
    name: "client-Layout",
    component: LayoutClient,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/components/ProductItem.vue"),
      },
      {
        path: "/register",
        name: "register-client",
        component: () => import("@/views/client/Register.vue"),
      },
      {
        path: "/login",
        name: "login-client",
        component: () => import("@/views/client/Login.vue"),
      },
    ],
  },
];

const AdminRoutes = [
  {
    path: "/page-admin",
    name: "admin-Layout",
    component: LayoutAdmin,
    children: [
      {
        path: "",
        name: "admin-products",
        component: () => import("@/components/ProductItem.vue"),
      },
      // {
      //   path: "/login-account",
      //   name: "login-admin",
      //   component: () => import("@/views/admin/Login.vue"),
      // },
    ],
    // beforeEnter: (to, from, next) => {
    //   if (!authService.isLoggedIn()) {
    //     next("/page-admin/login-account");
    //   } else {
    //     next();
    //   }
    // },
  },
];

const routes = [...ClientRoutes, ...AdminRoutes];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
