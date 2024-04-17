<template>
  <div>
    <div class="container">
      <h1>Product List</h1>
      <button
        v-if="
          isAdminOrEmployee &&
          isLoggedIn &&
          (!this.$route.name !== 'page-admin' || !this.$route.name !== 'home')
        "
        @click="goToCreateProduct"
      >
        Add Product
      </button>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div v-else class="product-list">
        <div
          v-for="product in products"
          :key="product._id"
          class="product-item"
        >
          <router-link
            :to="{ name: 'product-detail', params: { id: product._id } }"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-details">
              <h2>{{ product.name }}</h2>
              <p class="price">Price: {{ product.priceNew }}</p>
              <p class="discount">
                Discount: {{ product.discountPercentage }}%
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from "../services/client/product.service";

export default {
  data() {
    return {
      products: [],
      errorMessage: "",
    };
  },
  computed: {
    isAdminOrEmployee() {
      const userPosition = localStorage.getItem("userRole");
      return userPosition === "admin" || userPosition === "employee";
    },
    isLoggedIn() {
      return this.$store.state.isAuthenticated;
    },
  },
  async mounted() {
    await this.getProducts();
    console.log(this.$route.name);
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
        name: "add-product",
      });
    },
  },
};
</script>

<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product-item {
  width: calc(25% - 20px); /* Số lượng mục sản phẩm trên mỗi hàng */
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative; /* Để có thể sử dụng position absolute cho hình ảnh */
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.product-item .product-image {
  width: 100%; /* Chiều rộng của hình ảnh sản phẩm */
  height: 0; /* Đặt chiều cao ban đầu của hình ảnh thành 0 */
  padding-top: 133.33%; /* Tính toán chiều cao dựa trên tỷ lệ 3:4 (4 / 3 * 100) */
  overflow: hidden;
  position: relative;
}

.product-item .product-image img {
  position: absolute; /* Vị trí tuyệt đối để hình ảnh chiếm toàn bộ không gian của container */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Hiển thị hình ảnh mà không bị biến dạng */
}

.product-item .product-details {
  padding: 10px;
}

.product-item .product-details h2 {
  font-size: 16px;
  margin-top: 10px;
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