<template>
  <div>
    <div class="pagination-main">
      <p
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="goToPage(pageNumber)"
        :class="{
          active: pageNumber === currentPage,
        }"
      >
        {{ pageNumber }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToPage(pageNumber) {
      this.$emit("page-changed", pageNumber);
    },
  },
};
</script>

<style scoped>
.pagination-main {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination-main p {
  margin-right: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-main p:hover {
  background-color: #f0f0f0;
}

.pagination-main p.active,
.pagination-main p.current {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
</style>
