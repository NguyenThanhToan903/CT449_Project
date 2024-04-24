<template>
  <div>
    <Header class="header" />
    <div class="container">
      <!-- <InputSearch class="input-search" @search="updateSearchQuery" /> -->
      <router-view :searchQuery="searchQuery" />
    </div>
    <Footer
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
.container {
  padding-top: 20px;
  margin-top: 76px;
  position: relative;
}

.container:has(.form-login) {
  min-height: 1080px;
}
.header {
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>
