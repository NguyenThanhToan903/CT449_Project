<template>
  <div v-if="$route.name === 'home'" class="search-container">
    <div class="input-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Nhập từ khóa tìm kiếm"
        class="search-input"
        @input="emitSearchQuery"
      />
      <div class="input-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
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

.input-container {
  position: relative;
}

.search-input {
  width: 220px;
  border: none;
  height: 32px;
  position: relative;
  outline: none;
  background-color: #fffff900;
}

.input-line {
  position: absolute;
  content: "";
  left: 0;
  width: 0%;
  height: 4px;
  z-index: 1;
  background-color: #12372a;
  transition: width 0.5s ease;
}

.input-container:hover .input-line {
  width: 95%;
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
