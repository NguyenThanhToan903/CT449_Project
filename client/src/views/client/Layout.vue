<template>
  <div>
    <Header class="header" />
    <div class="container">
      <InputSearch class="input-search" @search="updateSearchQuery" />
      <router-view :searchQuery="searchQuery" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import InputSearch from "@/components/InputSearch.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "LayoutClient",
  components: {
    Header,
    InputSearch,
    Footer,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 80vh;
  padding-top: 20px;
  margin-top: 80px;
}

.header {
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>
