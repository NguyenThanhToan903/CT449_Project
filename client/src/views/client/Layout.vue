<template>
  <div>
    <Header />
    <div class="container">
      <InputSearch class="input-search" @search="updateSearchQuery" />
      <router-view :searchQuery="searchQuery" />
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import InputSearch from "@/components/InputSearch.vue";
export default {
  name: "LayoutClient",
  components: {
    Header,
    InputSearch,
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
  margin-top: 50px;
}
</style>
