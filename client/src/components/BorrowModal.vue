<!-- BorrowModal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Xác nhận mượn sách</h2>
      <p></p>
      <p>Bạn có chắc chắn muốn mượn sách này?</p>
      <div class="modal-buttons">
        <button @click="borrowBook">Đã Mượn</button>
        <button @click="borrowBook">Mượn</button>
        <button @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/client/product.service";
export default {
  name: "BorrowModal",

  props: {
    product: {
      type: null,
      required: true,
    },
    user: {
      type: null,
      required: true,
    },
  },

  methods: {
    async borrowBook() {
      if (!this.user) {
        const currentUrl = this.$route.fullPath; // Lưu trữ URL hiện tại
        this.$router.push({ name: "login", query: { redirect: currentUrl } });
        this.closeModal();
      } else {
        try {
          const data = {
            email: this.user.email,
            date: "7 ngày",
          };
          await ProductService.borrowProduct(this.product._id, data);
          console.log("Mượn sách thành công!");
          this.closeModal();
        } catch (error) {
          console.error("Lỗi khi mượn sách:", error.message);
        }
      }
    },
    closeModal() {
      // Đóng modal
      this.$emit("close");
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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.modal-buttons {
  text-align: right;
  margin-top: 20px;
}

button {
  margin-left: 10px;
}
</style>
