import { createWebHistory, createRouter } from "vue-router";
import LayoutClient from "@/views/client/Layout.vue";
import LayoutAdmin from "@/views/admin/Layout.vue"; // Thêm layout cho admin
import store from "@/store"; // Import Vuex Store
const ClientRoutes = [
  {
    path: "/",
    component: LayoutClient,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/components/ProductItem.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/views/client/Register.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/client/Login.vue"),
      },
      {
        path: "/product/:id",
        name: "product-detail",
        component: () => import("@/components/DetailProduct.vue"),
      },
      {
        path: "/profile/:id",
        name: "user-detail",
        component: () => import("@/components/User.vue"),
      },
      {
        path: "/borrowing",
        name: "borrowing",
        component: () => import("@/components/Borrowing.vue"),
        beforeMount: (to, from, next) => {
          if (!store.getters.isAuthenticated) {
            next({ name: "login" });
          } else {
            next();
          }
        },
      },
    ],
  },
];

const AdminRoutes = [
  {
    path: "/page-admin",
    component: LayoutAdmin,
    children: [
      {
        path: "/borrow",
        name: "admin-products",
        component: () => import("@/components/BorrowList.vue"),
      },
      {
        path: "/add-product",
        name: "add-product",
        component: () => import("@/components/AddProducts.vue"),
        beforeEnter: (to, from, next) => {
          if (!store.getters.isAuthenticated) {
            next({ name: "login" });
          } else {
            next();
          }
        },
      },
      {
        path: "/user-list",
        name: "user-list",
        component: () => import("@/components/UserList.vue"),
      },
      {
        path: "/edit/:id",
        name: "product-edit",
        component: () => import("@/components/EditProduct.vue"),
        beforeEnter: (to, from, next) => {
          if (!store.getters.isAuthenticated) {
            next({ name: "login" });
          } else {
            next();
          }
        },
      },
      {
        path: "/:catchAll(.*)",
        redirect: "/notfound",
      },
      {
        path: "/notfound",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
];

const routes = [...ClientRoutes, ...AdminRoutes];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
