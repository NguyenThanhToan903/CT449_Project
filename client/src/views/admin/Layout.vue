<template>
  <Header />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    Header,
    SideBar,
  },
};
</script>

<style scoped>
Header {
  width: 100%;
  background-color: #fff;
}
</style>
