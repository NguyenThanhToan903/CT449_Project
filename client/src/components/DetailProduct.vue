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
                !isBorrowing &&
                !isAdmin &&
                product.stock
              "
              @click="handleBorrowClick"
            >
              Mượn ngay
            </button>
            <!--  -->

            <p class="stock" v-if="product.stock === 0">Đã hết</p>
            <p
              type="button"
              class="pending"
              v-else-if="
                (status === 'pending' || isBorrowing) &&
                !isAdmin &&
                status !== 'borrowing' &&
                status !== '0'
              "
            >
              Đang xử lý
            </p>
            <p class="borrowing" v-if="status === 'borrowing' && !isAdmin">
              Đã mượn
            </p>

            <button
              type="button"
              class="delete"
              v-if="isAdmin"
              @click="deleteProduct"
            >
              Xóa
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
import ProductClient from "@/services/client/product.service";
import User from "@/services/client/accoun.service";
import ProductItem from "./ProductItem.vue";
import BorrowModal from "./BorrowModal.vue";

export default {
  data() {
    return {
      product: null,
      errorMessage: "",
      showModal: false,
      status: "0",
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
      console.log(this.user.data._id);
    },
    async getProduct() {
      try {
        this.product = await ProductService.getProductById(
          this.$route.params.id
        );
        await this.getUser();
        if (this.product.status === "pending") this.status = "pending";
        else if (this.product.status === "borrowing") this.status = "borrowing";
        else this.status = "0";

        const borrowStatus = await ProductClient.checkBorrowStatus(
          this.product._id,
          this.user.data._id
        );
        if (borrowStatus && borrowStatus.borrowed) {
          if (borrowStatus.borrowed === "cancelled") this.status = "0";
          else if (borrowStatus.borrowed === "returned") this.status = "0";
          else this.status = borrowStatus.borrowed;
        }
      } catch (error) {
        this.errorMessage = "Failed to fetch product. Please try again later.";
        console.error("Error fetching product:", error.message);
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
    handleBorrowClick(data) {
      if (
        !this.user ||
        !this.user.data ||
        this.user.data.message === "User not found"
      ) {
        const currentUrl = this.$route.fullPath;
        this.$router.push({
          name: "login",
          query: { redirect: currentUrl },
        });
      } else {
        console.log();
        this.product.stock = data.quatity;
        this.showModal = true;
      }
    },
    editProduct() {
      this.$router.push({
        name: "product-edit",
        params: { id: this.product._id },
      });
    },
    changeQuatity() {
      this.product.stock = this.product.stock - 1;
    },
    bookBorrowedHandler() {
      this.isBorrowing = true;
      this.status = "pending";
    },
  },
  watch: {
    "$route.params.id": function (newId, oldId) {
      if (newId !== oldId) {
        this.getProduct();
        // if (borrowStatus && borrowStatus.borrowed) {
        //   this.isBorrowing = true;
        //   this.status = borrowStatus.borrowed;
        // }
      }
    },
    // "$route.query.message": function (newMessage, oldMessage) {
    //   if (newMessage !== oldMessage) {
    //   }
    // },
  },
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
</style>
