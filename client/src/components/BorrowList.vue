<template>
  <div class="borrowed-products-container">
    <h2>Danh sách sản phẩm đã mượn</h2>
    <select
      v-model="selectedStatus"
      @change="fetchBorrowedProducts(selectedStatus)"
    >
      <option default value="all">Tất cả</option>
      <option value="pending">Chờ xác nhận</option>
      <option value="borrow">Đã mượn</option>
      <option value="return">Đã trả</option>
    </select>
    <ul class="borrowed-products-list">
      <div
        v-for="borrowedItem in borrowedProducts"
        :key="borrowedItem._id"
        class="borrowed-item"
      >
        <li>
          <router-link :to="'/product/' + borrowedItem.bookId" class="book-info"
            >{{ borrowedItem.bookName }} -
            {{ borrowedItem.bookAuthor }}</router-link
          >
          <router-link :to="'/user'" class="borrowed-by"
            >Mượn bởi: {{ borrowedItem.userName }}</router-link
          >
          <p class="status">Trạng thái: {{ borrowedItem.status }}</p>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import Product from "../services/admin/product.service";
import User from "../services/client/accoun.service";

export default {
  data() {
    return {
      borrowedProducts: [],
      selectedStatus: "all",
    };
  },
  created() {
    this.fetchBorrowedProducts("all");
  },
  methods: {
    async fetchBorrowedProducts(status) {
      try {
        const data = {
          type: status,
        };
        const response = await Product.getBorrow(data);
        for (const borrowedItem of response) {
          const user = await User.findById(borrowedItem.userId);
          borrowedItem.userName = user.last_name + " " + user.first_name;
          const book = await Product.getProductById(borrowedItem.bookId);
          borrowedItem.bookName = book.title;
          borrowedItem.bookAuthor = book.author;
        }
        this.borrowedProducts = response;
      } catch (error) {
        console.error("Error fetching borrowed products:", error);
      }
    },
  },
};
</script>

<style scoped>
.borrowed-products-container {
  max-width: 600px;
  margin: 0 auto;
  height: calc(100vh - 80px);
}

.borrowed-products-list {
  list-style-type: none;
  padding: 0;
}

.borrowed-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.book-info {
  font-weight: bold;
  text-decoration: none;
}

.borrowed-by,
.status {
  color: #666;
  text-decoration: none;
}
</style>
