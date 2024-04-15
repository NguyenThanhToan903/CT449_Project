<template>
  <div>
    <Header />
    hello
    <router-view />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  name: "PageClient",
  components: {
    Header,
  },
  // created() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     this.$store.commit("login");
  //   }
  // },
};
</script>

<style></style>
