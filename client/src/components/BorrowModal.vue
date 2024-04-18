<template>
  <div class="modal" :class="{ show: showModal }">
    <div class="modal-content">
      <h2>Xác nhận mượn sách</h2>
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
    showModal: {
      type: Boolean,
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
  transition: opacity 0.3s ease;
  opacity: 0;
}

.modal.show {
  opacity: 1;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(-20px);
}

.modal.show .modal-content {
  opacity: 1;
  transform: translateY(0);
}

.modal-buttons {
  text-align: right;
  margin-top: 20px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
