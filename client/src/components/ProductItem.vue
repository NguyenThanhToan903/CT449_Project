<template>
  <div class="container">
    <h1>Product List</h1>
    <button v-if="isAdminOrEmployee" @click="goToCreateProduct">
      Add Product
    </button>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div v-else class="product-list">
      <div v-for="product in products" :key="product._id" class="product-item">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-details">
          <h2>{{ product.name }}</h2>
          <p class="price">Price: {{ product.price }}</p>
          <p class="discount">Discount: {{ product.discountPercentage }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import dịch vụ lấy dữ liệu sản phẩm
import productService from "../services/admin/product.service";

export default {
  data() {
    return {
      products: [], // Mảng chứa danh sách sản phẩm
      errorMessage: "", // Thông báo lỗi nếu có
    };
  },
  computed: {
    // Kiểm tra xem người dùng có thuộc tính position là "admin" hoặc "nhân viên" không
    isAdminOrEmployee() {
      const userPosition = localStorage.getItem("userPosition"); // Giả sử thông tin quyền được lưu trong localStorage
      return userPosition === "admin" || userPosition === "employee";
    },
  },
  async mounted() {
    await this.getProducts();
  },

  methods: {
    async getProducts() {
      try {
        this.products = await productService.getAllProducts();
      } catch (error) {
        this.errorMessage = "Failed to fetch products. Please try again later.";
        console.error("Error fetching products:", error.message);
      }
    },
    goToCreateProduct() {
      this.$router.push({
        name: "login-admin",
      });
    },
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-item {
  width: calc(33.33% - 20px); /* Phần trăm chiều rộng của mỗi sản phẩm */
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-item .product-image {
  width: 100px; /* Chiều rộng của hình ảnh sản phẩm */
  height: 100px; /* Chiều cao của hình ảnh sản phẩm */
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
}

.product-item .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-item .product-details {
  flex-grow: 1;
  padding: 10px;
}

.product-item .product-details h2 {
  font-size: 16px;
  margin-bottom: 5px;
}

.product-item .product-details .price {
  font-weight: bold;
  color: #ee4d2d;
}

.product-item .product-details .discount {
  color: #888;
}
</style>
