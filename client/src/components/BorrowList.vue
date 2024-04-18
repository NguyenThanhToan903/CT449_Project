<template>
  <div>
    <h2>Danh sách sản phẩm đã mượn</h2>
    <select
      v-model="selectedStatus"
      @change="fetchBorrowedProducts(selectedStatus)"
    >
      <option default value="all">Tất cả</option>
      <option value="pending">Chờ x nhận</option>
      <option value="borrow">Đã mượn</option>
      <option value="return">Đã trả</option>
    </select>
    <ul>
      <li v-for="product in borrowedProducts" :key="product._id">
        {{ product.name }} - {{ product.author }}
      </li>
    </ul>
  </div>
</template>

<script>
import Product from "../services/admin/product.service";
export default {
  data() {
    return {
      borrowedProducts: [],
      selectedStatus: "all",
    };
  },
  mounted() {
    this.fetchBorrowedProducts("all");
  },
  methods: {
    async fetchBorrowedProducts(status) {
      try {
        const response = await Product.getBorrow(status);
        this.borrowedProducts = response;
      } catch (error) {
        console.error("Error fetching borrowed products:", error);
      }
    },
  },
};
</script>
