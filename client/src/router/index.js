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
        name: "register-client",
        component: () => import("@/views/client/Register.vue"),
      },
      {
        path: "/login",
        name: "login-client",
        component: () => import("@/views/client/Login.vue"),
      },
      {
        path: "/product/:id",
        name: "product-detail",
        component: () => import("@/components/DetailProduct.vue"),
      },
      {
        path: "/helo",
        name: "hello",
        component: () => import("@/components/Borrowing.vue"),
        beforeEnter: (to, from, next) => {
          if (!store.state.isAuthenticated) {
            next({ name: "login-client" });
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
        path: "",
        name: "admin-products",
        component: () => import("@/views/admin/BorrowList.vue"),
      },
      {
        path: "/page-admin/add-product", // Thay đổi path
        name: "add-product",
        component: () => import("@/views/AddProducts.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuthenticated) {
        next({ name: "login-client" });
      } else {
        next();
      }
    },
  },
];

const routes = [...ClientRoutes, ...AdminRoutes];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
