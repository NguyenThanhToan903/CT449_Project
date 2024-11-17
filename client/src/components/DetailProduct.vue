<template>
  <div>
    <div class="detailBox">
      <div v-if="product" class="detail-box1">
        <img :src="product.image" alt="Product Image" />
      </div>
      <div v-if="product" class="detail-box2">
        <div class="box-detail">
          <h3 v-if="product" class="bookDetail-title">{{ product.title }}</h3>
          <h4>Tác giả: {{ product.author }}</h4>
          <div class="box2 des">Mô tả: {{ product.description }}</div>
          <div class="box2 price">Giá: {{ product.price }} đ</div>
          <div class="box2 discount">
            Giảm giá:
            <span v-if="product.discountPercentage !== 0">{{
              product.discountPercentage
            }}</span>
            <span v-else>0</span>
            %
          </div>
          <div class="box2 stock">Còn lại: {{ product.stock }}</div>
          <div class="btn-group">
            <p class="edit" v-if="isAdmin" @click="editProduct">Chỉnh sửa</p>
            <button
              type="button"
              class="borrow"
              v-if="
                status !== 'pending' &&
                status !== 'borrowing' &&
                status !== 'returned' &&
                !isBorrowing &&
                !isAdmin &&
                product.stock
              "
              @click="handleBorrowClick"
            >
              Mượn ngay
            </button>

            <p class="stock" v-if="product.stock === 0">Đã hết</p>
            <p
              type="button"
              class="pending"
              v-else-if="status === 'pending' && !isAdmin && status !== '0'"
            >
              Đang xử lý
            </p>
            <p class="borrowing" v-if="status === 'borrowing' && !isAdmin">
              Đã mượn
            </p>

            <p
              type="button"
              class="delete-button"
              v-if="isAdmin"
              @click="deleteProduct"
            >
              Xóa
            </p>
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
      @data="status = $event"
      @close="showModal = false"
      @bookBorrowed="bookBorrowedHandler"
      :product="product"
      :user="user.data"
    />
  </div>
</template>

<script>
import ProductService from "@/services/admin/product.service";
import ProductClient from "@/services/client/product.service";
import User from "@/services/client/accoun.service";
import ProductItem from "./ProductItem.vue";
import BorrowModal from "./BorrowModal.vue";

export default {
  data() {
    return {
      user: null,
      product: null,
      status: "",
      errorMessage: "",
      showModal: false,
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
      try {
        const dataUser = localStorage.getItem("user");
        if (dataUser) {
          console.log(dataUser);
          // this.user = await User.findByEmail(email);
          this.user = JSON.parse(dataUser);

          console.log("[GetUser-detail]", this.user);
        } else {
          throw new Error("No user email found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    async getProduct() {
      try {
        const productId = this.$route.params.id;
        if (productId) {
          console.log(productId);
          this.product = await ProductService.getProductById(productId);
          const dataUser = localStorage.getItem("user");
          if (dataUser) {
            this.user = JSON.parse(dataUser);
            console.log("[GetUser-detail]", this.user);
          }
          console.log("[DETAIL BORROW - getproduct]", this.product._id);
          console.log("[DETAIL BORROW - getuser]", this.user.data._id);
          const borrowStatus = await ProductClient.checkBorrow(
            this.product._id,
            { _id: this.user.data._id }
          );
          console.log("[GetProduct-detail]", borrowStatus);
          if (borrowStatus.message == "YES") {
            this.status = "0";
          } else {
            this.status = borrowStatus.message;
          }
        } else {
          throw new Error("Product ID not found in route parameters");
        }
      } catch (error) {
        this.errorMessage = "Failed to fetch product. Please try again later.";
        console.error("Error fetching product data:", error.message);
      }
    },

    async checkBorrowStatus() {
      try {
        console.log("User ID CheckBook" + this.user);
        if (this.product && this.user && this.user.data) {
          console.log("[DETAIL BORROW - ]" + this.product);
          console.log(this.user._id);
          const borrowStatus = await ProductClient.checkBorrow(
            this.product._id,
            this.user._id
          );
          console.log(
            "[DETAIL BORROW - checkBorrowStatus]",
            this.product,
            this.user,
            borrowStatus
          );
        } else {
          console.warn(
            "Product or user data is not available for borrow status check"
          );
        }
      } catch (error) {
        console.error("Error checking borrow status:", error);
      }
    },

    async deleteProduct() {
      try {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
          await ProductService.deleteProduct(this.product._id);
          alert("Sản phẩm đã được xóa thành công!");
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại sau.");
      }
    },

    handleBorrowClick() {
      console.log("handleBorrowClick: " + this.$store.getters.isAuthenticated);
      if (!this.$store.getters.isAuthenticated) {
        console.log("[Detail]" + this.$store.getters.isAuthenticated);
        const currentUrl = this.$route.fullPath;
        this.$router.push({
          name: "login",
          query: { redirect: currentUrl },
        });
      } else {
        console.log(this.product);
        // this.product.stock -= 1;
        this.showModal = true;
      }
    },

    editProduct() {
      this.$router.push({
        name: "product-edit",
        params: { id: this.product._id },
      });
    },

    changeQuantity() {
      if (this.product && this.product.stock > 0) {
        this.product.stock -= 1;
      } else {
        console.warn(
          "Unable to change quantity. Product stock is insufficient or undefined."
        );
      }
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
  beforeMount() {},

  mounted() {
    this.getUser();
    this.getProduct();
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
  box-shadow: 0 0 10px #adbc9f;
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
  width: 100px;
  border-radius: 5px;
}

p.stock {
  background-color: #f46056;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 4px;
  border-radius: 5px;
}

.pending,
.borrow,
.edit,
p.stock,
.delete-button,
.borrowing {
  background-color: #f46056;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
  padding: 4px 8px;
  margin-right: 20px;
  border-radius: 5px;
}

.pending,
.borrow,
.edit {
  cursor: pointer;
}

.edit {
  background-color: #436850;
}

.borrow {
  background-color: #4caf50;
}
.borrowing {
  background-color: #3a705d;
}
.product-page.product-list-detail {
  min-height: 600px;
  position: relative;
}

.delete-button:hover {
  background-color: rgb(221, 107, 107);
  color: white;
}
</style>
