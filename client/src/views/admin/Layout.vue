<template>
  <Header class="header" />
  <div class="container-admin">
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style scoped>
Header {
  width: 100%;
  background-color: #fff;
}
.container-admin {
  padding-top: 20px;
  margin-top: 76px;
  position: relative;
}

.header {
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>
