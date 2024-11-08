<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-main">
        <h2>Xác nhận mượn sách</h2>
        <p>Bạn có chắc chắn muốn mượn sách này?</p>
      </div>
      <div class="modal-buttons">
        <button @click="borrowBook">Mượn</button>
        <button @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ProductService from "@/services/client/product.service";
export default {
  name: "BorrowModal",
  props: {
    product: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async borrowBook() {
      if (!this.user) {
        const currentUrl = this.$route.fullPath;
        this.$router.push({ name: "login", query: { redirect: currentUrl } });
        this.closeModal();
      } else {
        try {
          const data = {
            email: this.user.email,
            // date: "7 ngày",
          };
          console.log(this.product._id, data);
          await ProductService.borrowProduct(this.product._id, data);
          console.log("Mượn sách thành công!");

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đã gửi yêu cầu thành công!",
            showConfirmButton: false,
            timer: 1500,
          });

          this.$router.push({
            name: `product-detail`,
            params: { id: this.product._id },
            query: { message: "pending" },
          });
          this.closeModal();
        } catch (error) {
          console.error("Lỗi khi mượn sách:", error.message);
        }
      }
    },
    closeModal() {
      this.$emit("close");
      this.$emit("bookBorrowed", {
        state: "pending",
      });
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 40%;
  height: 30%;
  color: #12372a;
  font-family: Helvetica;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-top: 0;
}

.modal p {
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  align-items: center;
}

.modal-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  background-color: #38b453;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modal-buttons button:hover {
  background-color: #45a049;
}

.modal-buttons button:focus {
  outline: none;
}

.modal-buttons button:last-child {
  margin-left: 30px;
  background-color: #ec804a;
}
</style>
