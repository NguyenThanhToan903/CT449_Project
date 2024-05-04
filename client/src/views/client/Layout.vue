<template>
  <div class="main-page">
    <Header class="header" />
    <div class="container">
      <!-- <InputSearch class="input-search" @search="updateSearchQuery" /> -->
      <router-view />
    </div>
    <Footer
      class="footer-layout"
      v-if="this.$route.name !== 'login' && this.$route.name !== 'register'"
    />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "LayoutClient",
  components: {
    Header,
    Footer,
  },
  // data() {
  //   return {
  //     searchQuery: "",
  //   };
  // },
  // methods: {
  //   updateSearchQuery(query) {
  //     this.searchQuery = query;
  //   },
  // },
};
</script>

<style scoped>
.main-page {
  background-color: #adbc9f;
}
.container {
  padding-top: 20px;
  margin-top: 76px;
  position: relative;
  padding-bottom: 70px;
}
.container:has(.user-profile) {
  min-height: 100vh;
}

.container:has(.form-login) {
  min-height: 100vh;
}
.header {
  position: fixed;
  top: 0;
  z-index: 999;
}
.footer-layout {
  bottom: 0;
}
</style>
