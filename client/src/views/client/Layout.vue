<template>
  <div>
    <Header />
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
};
</script>

<style></style>
