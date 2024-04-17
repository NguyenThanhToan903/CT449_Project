<!-- <nav> -->
<!-- <template>
  <div class="navbar">
    <div class="logo">
      <a href="#">MyLogo</a>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Search..." />
      <button type="submit">Search</button>
    </div>
    <div class="user-auth">
      <div v-if="!isLoggedIn">
        <span v-if="this.$route.name !== 'register-client'">
          <router-link :to="{ name: 'register-client' }" class="nav-link"
            >Đăng ký</router-link
          >
        </span>
        <span
          v-if="
            this.$route.name !== 'login-client' &&
            this.$route.name !== 'register-client'
          "
          >|</span
        >
        <span v-if="this.$route.name !== 'login-client'">
          <router-link :to="{ name: 'login-client' }" class="nav-link"
            >Đăng nhập</router-link
          >
        </span>
      </div>
      <div v-else>
        <button @click="logout">Đăng xuất</button>
      </div>
    </div>
  </div>
</template> -->
<!-- </nav> -->

<template>
  <div class="navbar">
    <div class="logo">
      <router-link :to="{ name: 'home' }">MyLogo</router-link>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Search..." />
      <button type="submit">Search</button>
    </div>
    <div class="user-auth">
      <div v-if="!isLoggedIn">
        <span
          v-if="!$route.meta.requiresAuth || $route.name !== 'register-client'"
        >
          <router-link :to="{ name: 'register-client' }" class="nav-link"
            >Đăng ký</router-link
          >
        </span>
        <span v-if="$route.name !== 'login-client'">|</span>
        <span v-if="$route.name !== 'login-client'">
          <router-link :to="{ name: 'login-client' }" class="nav-link"
            >Đăng nhập</router-link
          >
        </span>
      </div>
      <div v-else>
        <button @click="logout">Đăng xuất</button>
      </div>
    </div>
  </div>
</template>
<script>
import AccountService from "@/services/client/accoun.service";
import AdminService from "@/services/admin/account.service";

export default {
  // name: "HeaderClient",
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
  },
  methods: {
    async logout() {
      try {
        if (this.userRole === "admin") {
          await AdminService.logout();
          localStorage.setItem("userRole", "");

          this.$store.commit("logout");
        } else {
          await AccountService.logout();
          localStorage.setItem("userRole", "");
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
        console.log("Authent", isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

/* Navbar styles */
.navbar {
  background-color: #333; /* Màu nền */
  color: #fff; /* Màu chữ */
  padding: 10px 20px;
  display: flex;
  white-space: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Chiều rộng 100% */
  min-height: 72px;
}

.nav-link {
  display: inline-block;
}

.logo {
  padding-left: 50px;
  margin-left: 100px;
  margin-right: 100px;
  /* flex: 1; */
  padding-right: 50px;
}

/*.search-bar {
  flex: 2;  Dãn ra càng nhiều càng tốt 
}
*/
.user-auth {
  flex: 1; /* Dãn ra càng nhiều càng tốt */
  text-align: right; /* Căn phải */
  width: 480px;
}

.logo a {
  text-decoration: none;
  color: #fff;
  font-size: 24px;
}

.search-bar input[type="text"] {
  padding: 5px;
  margin-right: 10px;
  width: 100%;
  width: 700px;
  /*border-radius: 3px;*/
  border: none;
}

.search-bar button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 50px;
  max-width: 160px;
  /*border-radius: 3px;*/
  cursor: pointer;
}

.user-auth a {
  color: #fff;
  text-decoration: none;
}
</style>
