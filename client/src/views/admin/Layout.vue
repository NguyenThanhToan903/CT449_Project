<template>
  <Header />
  <div class="container">
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
</style>
