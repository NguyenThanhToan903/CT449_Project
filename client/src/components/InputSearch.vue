<template>
  <div v-if="isLoggedIn && isHome" class="search-container" :class="{}">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Nhập từ khóa tìm kiếm"
      class="search-input"
      @input="emitSearchQuery"
    />

    <p class="search-button">Tìm kiếm</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      is: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isAuthenticated;
    },
    isHome() {
      return this.$route.name === "home";
    },
  },
  methods: {
    emitSearchQuery() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: flex-end;
  justify-content: end;
  margin-bottom: 20px;
}

.search-input {
  width: 220px;
  border: none;
  height: 32px;
  position: relative;
}

.search-input::before {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 0%;
  height: 4px;
  background-color: #90d26d;
  transition: width 0.3s ease;
}

.search-input:focus::before {
  width: 100%;
}

.search-button {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  padding: 0;
  bottom: -10px;
  text-decoration: none;
  color: #12372a;
  font-weight: 450;
  font-size: 32px;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
