<template>
  <div>
    <Header />
    <SideBar />
    <router-view />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  name: "PageClient",
  components: {
    Header,
    SideBar,
  },
};
</script>

<style></style>
