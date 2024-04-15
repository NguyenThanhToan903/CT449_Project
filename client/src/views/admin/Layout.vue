<template>
  <div id="app">
    <HeaderAdmin />
    <router-view />
  </div>
</template>

<script>
import HeaderAdmin from "../../components/Header.vue";
import AuthService from "@/services/admin/account.service";
export default {
  name: "admin-Layout",
  components: {
    HeaderAdmin,
  },
  // computed: {
  //   // isLogin() {
  //   //   return this.$store.;
  //   // },
  // },
  mounted() {
    this.checkAuthentication();
  },

  methods: {
    async checkAuthentication() {
      try {
        const userData = await AuthService.checkAuthentication();
        if (userData) {
          // Xác thực thành công, lưu thông tin người dùng vào store
          // this.$store.commit("SET_USER", userData);
          console.log("User: " + userData);
          console.log("hello", this.$store.state.user);
        } else {
          // Xác thực không thành công, xử lý tùy thuộc vào yêu cầu của bạn
          // Ví dụ: chuyển hướng đến trang đăng nhập
          // this.$router.push({ name: "login" });
          console.log("User: " + userData);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Xử lý lỗi tùy theo yêu cầu của bạn
      }
    },
  },
};
</script>

<style>
.background-class {
  height: 100vh;
  width: 100vw;
}
</style>
