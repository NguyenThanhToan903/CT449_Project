<template>
  <div class="container-fluid bg-color">
    <div class="header-main row justify-content-center">
      <div class="col-md-10">
        <div class="navbar navbar-expand navbar-dark">
          <div class="logo">
            <router-link :to="{ name: 'home' }">BBook</router-link>
          </div>
          <div class="navbar-nav" :class="{ Admin: userRole === 'admin' }">
            <p class="navbar-item" @click="navigateTo('home')">Trang chủ</p>

            <p
              class="navbar-item"
              v-if="isLoggedIn && user.role == 'client'"
              @click="navigateTo('borrowing')"
            >
              Sách đã mượn
            </p>

            <p
              class="navbar-item"
              v-if="isLoggedIn && user.role == 'admin'"
              @click="navigateTo('add-product')"
            >
              Thêm sách
            </p>
            <p
              class="navbar-item"
              v-if="isLoggedIn && user.role == 'admin'"
              @click="navigateTo('admin-products')"
            >
              Quản lý mượn
            </p>
            <p
              class="navbar-item"
              v-if="isLoggedIn && user.role == 'admin'"
              @click="navigateTo('user-list')"
            >
              Người dùng
            </p>
          </div>
          <div v-if="userRole !== 'admin' && isLoggedIn">
            <p @click="profile(user.id)" class="user-item">Tài khoản</p>
          </div>
          <div v-if="!isLoggedIn" class="user-auth">
            <p v-if="$route.name !== 'register'">
              <router-link
                :to="{ name: 'register' }"
                class="navbar-link navbar-nav"
              >
                Đăng ký
              </router-link>
            </p>
            <p v-if="$route.name !== 'login'">
              <router-link
                :to="{ name: 'login' }"
                class="navbar-link navbar-nav"
              >
                Đăng nhập
              </router-link>
            </p>
          </div>
          <div v-else>
            <div class="logout" @click="logout">Đăng xuất</div>
          </div>
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
      user: {
        id: null,
        profile: null,
        role: null,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userRole() {
      this.user.role = this.$store.getters.currentUserRole;
      return localStorage.getItem("userRole");
    },
  },

  mounted() {
    this.checkAuthentication();
    this.getUser();
  },

  methods: {
    async profile(id) {
      if (id) {
        this.$router.push({
          name: "user-detail",
          params: { id: id },
        });
      } else {
        console.error("Không tìm thấy ID của người dùng");
      }
    },
    async getUser() {
      const email = localStorage.getItem("userEmail");

      if (email) {
        this.user.profile = await AccountService.findByEmail(email);
        this.user.id = this.user.profile.data._id;

        console.log("[HEADER]", this.user.profile.data._id);
      } else {
        console.error("Không tìm thấy email người dùng trong localStorage");
      }
    },

    async logout() {
      try {
        if (this.userRole === "admin") {
          await AdminService.logout();
        } else {
          await AccountService.logout();
        }
        this.$store.dispatch("logout");
        localStorage.clear();
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    async checkAuthentication() {
      const email = localStorage.getItem("userEmail");
      const role = localStorage.getItem("userRole");
      if (email && role) {
        const user = await AccountService.findByEmail(email);
        if (user.message === "User not found") {
          this.$store.commit("SET_USER", user);
        }
      }
    },
    navigateTo(page) {
      const isUser = localStorage.getItem("userEmail");
      console.log("[HEADER]" + isUser);
      if (!isUser) {
        console.log("tRUE");
        this.$router.push({ name: "login" });
      } else {
        console.log(page);
        this.$router.push({ name: page });
      }
    },
  },
};
</script>

<style scoped>
/* CSS Styles for Header */
.bg-color {
  background-color: #12372a;
}
p {
  padding: 0;
  margin: 0;
}

.header-main {
  width: 1200px;
  margin: auto;
}

.navbar {
  justify-content: center;
  display: flex; /* Đảm bảo navbar có khả năng hiển thị theo hàng */
  align-items: center; /* Căn chỉnh theo chiều dọc nếu cần */
}

.navbar-nav {
  min-width: 600px;
}

.navbar-link.navbar-nav,
.logout,
.user-item {
  min-width: 100px;
}

.navbar-nav,
.user-auth {
  margin-right: auto;
  margin-left: 8%;
  display: flex;
}

.navbar-item,
.logout,
.user-item,
.navbar-link {
  padding-top: 10px;
  margin: 0 20px;
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
.navbar-link::before,
.user-auth::before {
  content: "";
  position: absolute;
  bottom: -21px;
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
  margin-right: auto; /* Đẩy logo sang bên trái */
}
</style>
