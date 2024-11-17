<template>
  <div class="product-page">
    <InputSearch class="input-search" @search="updateSearchQuery" />
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div v-else class="product-list">
      <div
        v-for="product in paginatedProducts"
        :key="product._id"
        class="product-item"
        @click="check(product._id)"
      >
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-details">
          <h2>{{ product.title }}</h2>
          <p class="author">Author: {{ product.author }}</p>
          <p class="price">Price: {{ product.priceNew }}</p>
          <p class="discount">Discount: {{ product.discountPercentage }}%</p>
        </div>
      </div>
    </div>
    <Pagination
      class="paginationPage"
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-changed="changePage"
    />
  </div>
</template>

<script>
import productService from "../services/client/product.service";
import InputSearch from "@/components/InputSearch.vue";
import User from "../services/client/accoun.service";
import Pagination from "./Pagination.vue";
export default {
  name: "productItem",
  components: {
    Pagination,
    InputSearch,
  },
  data() {
    return {
      products: [],
      errorMessage: "",
      user: "",
      currentPage: 1,
      productsPerPage: 8,
      searchQuery: "",
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
    totalPages() {
      if (this.$route.name === "product-detail") this.productsPerPage = 4;
      return Math.ceil(this.filteredProducts.length / this.productsPerPage);
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;
      return this.activeProducts.slice(startIndex, endIndex);
    },
    filteredProducts() {
      if (!this.searchQuery) return this.products;
      const query = this.searchQuery.toLowerCase();
      return this.products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    },
    activeProducts() {
      return this.products.filter((product) => !product.deleted);
    },
  },
  async mounted() {
    await this.getProducts();
    await this.getUser();
  },
  beforeMount() {
    // this.check();
  },
  watch: {
    searchQuery(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$router.push({ name: "home" });
        this.currentPage = 1;
        this.getProducts();
      }
    },
    currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getProducts();
      }
    },
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query;
      this.getProducts();
    },
    async getProducts() {
      try {
        const allProducts = await productService.getAllProducts();
        this.products = allProducts.filter(
          (product) =>
            !product.deleted &&
            (product.title
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
              product.author
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()))
        );
      } catch (error) {
        this.errorMessage = "Failed to fetch products. Please try again later.";
      }
    },
    async getUser() {
      const email = localStorage.getItem("email");
      this.user = await User.findByEmail(email);
    },
    changePage(page) {
      this.currentPage = page;
    },
    async check(id) {
      await this.getUser();
      const book = await productService.getProductById(id);
      const { message } = await productService.checkBorrow(
        book._id,
        this.user.data
      );
      console.log(message);
      console.log("message: " + message);
      this.$router.push({
        name: `product-detail`,
        params: { id: book._id },
      });
      this.$emit("productStatus");
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
.product-page {
  position: relative;
}
.product-list {
  margin-bottom: 60px;
  display: flex;
  flex-wrap: wrap;
}
.product-item {
  width: calc(25% - 20px);
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;

  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  flex-direction: column;
  display: flex;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.product-item .product-image {
  width: 100%; /* Giảm kích thước xuống 75% */
  height: 240px;
  max-height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-item .product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.paginationPage {
  position: relative;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
