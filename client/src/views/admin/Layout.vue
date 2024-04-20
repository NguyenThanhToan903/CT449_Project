<template>
  <Header />
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <SideBar />
      </div>
      <div class="col-md-10">
        <router-view></router-view>
      </div>
    </div>
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
