<template>
  <div class="container-fluid bg-color">
    <div class="header-main row justify-content-center">
      <div class="col-md-10">
        <div class="navbar navbar-expand navbar-dark">
          <div class="logo">
            <router-link
              v-if="userRole === 'admin'"
              :to="{ name: 'admin-products' }"
              >BBook</router-link
            >
            <router-link v-else :to="{ name: 'home' }">BBook</router-link>
          </div>
          <div class="navbar-nav">
            <p class="navbar-item" @click="navigateToBorrowedBooks('home')">
              Trang chủ
            </p>

            <p
              class="navbar-item"
              v-if="
                userRole !== 'admin' &&
                $route.name !== 'login' &&
                $route.name !== 'register'
              "
              @click="navigateToBorrowedBooks('borrowing')"
            >
              Sách đã mượn
            </p>

            <p
              class="navbar-item"
              @click="navigateToBorrowedBooks('add-product')"
              v-if="
                userRole === 'admin' &&
                $route.name !== 'add-product' &&
                isLoggedIn &&
                $route.name !== 'login' &&
                $route.name !== 'register'
              "
            >
              Thêm sách
            </p>
          </div>
          <div v-if="userRole !== 'admin' && isLoggedIn">
            <p @click="profile(user.data._id)" class="user-item">Tài khoản</p>
          </div>
          <!-- <div> -->
          <div v-if="!isLoggedIn" class="user-auth">
            <span v-if="$route.name !== 'register'">
              <router-link :to="{ name: 'register' }" class="navbar-link"
                >Đăng ký</router-link
              >
            </span>
            <span v-if="$route.name !== 'login'">
              <router-link :to="{ name: 'login' }" class="navbar-link"
                >Đăng nhập</router-link
              >
            </span>
          </div>
          <div v-else>
            <div class="logout" @click="logout">Đăng xuất</div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountService from "@/services/client/accoun.service";
import AdminService from "@/services/admin/account.service";

export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isAuthenticated;
    },
    userRole() {
      return localStorage.getItem("userRole");
    },
  },
  mounted() {
    this.checkAuthentication();
    this.getUser();
  },
  methods: {
    async profile(id) {
      this.$router.push({
        name: "user-detail",
        params: { id: id },
      });
    },
    async getUser() {
      const email = localStorage.getItem("email");
      this.user = await AccountService.findByEmail(email);
      console.log("hello user", this.user);
    },
    async logout() {
      try {
        if (this.userRole === "admin") {
          await AdminService.logout();
          localStorage.removeItem("userRole");
          localStorage.removeItem("email");
          this.$store.commit("logout");
        } else {
          await AccountService.logout();
          localStorage.removeItem("userRole");
          localStorage.removeItem("email");
          this.$store.commit("logout");
        }
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    async checkAuthentication() {
      try {
        let isAuthenticated;
        if (this.userRole === "admin") {
          isAuthenticated = await AdminService.checkAuthentication();
          if (isAuthenticated.authenticated) {
            this.$store.commit("login");
          } else {
            this.$store.commit("logout");
          }
        } else {
          isAuthenticated = await AccountService.checkAuthentication();
          if (isAuthenticated.authenticated) {
            this.$store.commit("login");
            this.$store.commit("client");
          } else {
            this.$store.commit("client");
            this.$store.commit("logout");
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    },

    navigateToBorrowedBooks(direct) {
      this.$router.push({ name: `${direct}` });
    },
  },
};
</script>

<style scoped>
.bg-color {
  background-color: #12372a;
}

.header-main {
  width: 90%;
  margin: auto;
}

.navbar {
  justify-content: center;
}

.navbar-nav {
  margin-right: auto;
  margin-left: 8%;
  display: flex;
}

.navbar-item,
.logout,
.user-item,
.navbar-link {
  padding-top: 10px;
  margin: 0px;
  margin-right: 40px;
  text-decoration: none;
  color: #fbfada;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-style: normal;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
}

.navbar-item::before,
.logout::before,
.user-item::before,
.navbar-link::before {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 0%;
  height: 4px;
  background-color: #90d26d;
  transition: width 0.3s ease;
}

.logout::before {
  background-color: #d28f6d !important;
}

.user-item::before {
  background-color: #59d5e0 !important;
}

.navbar-item:hover::before,
.logout:hover::before,
.user-item:hover::before,
.navbar-link:hover::before {
  width: 100%;
}
.navbar-item:hover {
  color: #90d26d;
}

.logout:hover {
  color: #d28f6d;
}
.user-item:hover {
  color: #59d5e0;
}

.navbar-link:hover {
  color: #90d26d;
}

.logo a {
  color: #fbfada;
  font-size: 40px;
  font-family: "Rubik Mono One", monospace;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
}

.search-bar {
  width: 40%;
  margin-right: 20%;
}

.search-bar input {
  width: 80%;
}

.user-auth {
  display: flex;
  margin-right: 5%;
}

.user-item {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.navbar-link {
  bottom: -8px;
}

.user-item span {
  margin-right: 10px;
}
</style>
