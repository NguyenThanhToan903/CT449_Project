<template>
  <div>
    <div class="detailBox">
      <div v-if="product" class="detail-box1">
        <img :src="product.image" alt="Product Image" />
      </div>
      <div v-if="product" class="detail-box2">
        <div class="box-detail">
          <h3 v-if="product" class="bookDetail-title">{{ product.title }}</h3>
          <div class="box2 des">Mô tả: {{ product.description }}</div>
          <div class="box2 price">Giá: {{ product.price }} đ</div>
          <div class="box2 discount">
            Giảm giá: {{ product.discountPercentage }}%
          </div>
          <div class="box2 stock">Còn lại: {{ product.stock }}</div>
          <div class="btn-group">
            <button class="btn button-edit" v-if="isAdmin" @click="editProduct">
              Chỉnh sửa
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="status === '' && !isBorrowing && !isAdmin"
              @click="handleBorrowClick"
            >
              Mượn ngay
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-else-if="(status === 'pending' || isBorrowing) && !isAdmin"
            >
              Đang xử lý
            </button>
            <p v-else-if="!isAdmin">Đã mượn</p>
            <button
              type="button"
              class="btn btn-success ms-1"
              v-if="product.stock > 0 && !isAdmin"
            >
              Mua
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Không có thông tin sản phẩm.</p>
      </div>
    </div>
    <ProductItem class="product-list-detail" />
    <BorrowModal
      v-if="showModal"
      @close="showModal = false"
      @bookBorrowed="bookBorrowedHandler"
      :product="product"
      :user="user.data"
    />
  </div>
</template>

<script>
import ProductService from "@/services/admin/product.service";
import User from "@/services/client/accoun.service";
import ProductItem from "./ProductItem.vue";
import BorrowModal from "./BorrowModal.vue";

export default {
  data() {
    return {
      product: null,
      errorMessage: "",
      showModal: false,
      status: "",
      user: null,
      isBorrowing: false,
    };
  },
  components: {
    ProductItem,
    BorrowModal,
  },
  computed: {
    isAdmin() {
      return localStorage.getItem("userRole") === "admin";
    },
  },
  methods: {
    async getUser() {
      const email = localStorage.getItem("email");
      this.user = await User.findByEmail(email);
    },
    async getCheck() {
      const message = this.$route.query.message;
      if (message === "pending") {
        this.status = message;
      } else this.status = "";
    },
    async getProduct() {
      try {
        this.product = await ProductService.getProductById(
          this.$route.params.id
        );
        await this.getCheck();
      } catch (error) {
        this.errorMessage = "Failed to fetch product. Please try again later.";
        console.error("Error fetching product:", error.message);
      }
    },
    handleBorrowClick() {
      if (
        this.user &&
        this.user.data &&
        this.user.data.message === "User not found"
      ) {
        const currentUrl = this.$route.fullPath;
        this.$router.push({
          name: "login",
          query: { redirect: currentUrl },
        });
      } else {
        this.showModal = true;
      }
    },
    editProduct() {
      this.$router.push({
        name: "product-edit",
        params: { id: this.product._id },
      });
    },
    bookBorrowedHandler() {
      this.isBorrowing = true;
    },
  },
  watch: {
    "$route.params.id": function (newId, oldId) {
      if (newId !== oldId) {
        this.getProduct();
      }
    },
  },
  mounted() {
    this.getProduct();
    this.getUser();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.detail-box2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
}

.bookDetail-title {
  font-size: 42px;
  font-family: Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  position: relative;
  color: #12372a;
}

.bookDetail-title::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #adbc9f;
  z-index: 1;
}

.detailBox {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #fffeee;
  padding: 10px;
}

.detail-box1 {
}

.detail-box1 img {
}

.box-detail {
  padding-left: 30px;
}

.box2 {
  margin-top: 20px;
  font-family: "Work Sans", sans-serif;
}

.btn-group {
  margin-top: 20px;
}

.product-list-detail {
  margin-top: 30px;
}

.btn {
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.button-edit {
  background-color: #436850;
}

.btn-success {
  background-color: #4caf50;
}

.btn-success:hover {
  background-color: #45a049;
}

.btn-success:active {
  background-color: #45a049;
}

.btn-ms-1 {
  background-color: #f44336;
}

.btn-ms-1:hover {
  background-color: #da190b;
}

.btn-ms-1:active {
  background-color: #da190b;
}
</style>
