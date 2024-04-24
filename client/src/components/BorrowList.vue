<template>
  <div class="borrowed-products-container">
    <h2>Danh sách sách yêu cầu</h2>
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
        class="borrowed-list-item"
      >
        <li class="borrowed-item">
          <p :to="'/product/' + borrowedItem.bookId" class="book-info">
            {{ borrowedItem.bookName }} - {{ borrowedItem.bookAuthor }}
          </p>
          <p :to="'/user'" class="borrowed-by">
            Mượn bởi: {{ borrowedItem.userName }}
          </p>
          <p class="status" v-if="borrowedItem.status === 'pending'">
            Trạng thái: chờ xác nhận
          </p>
          <p class="status" v-else-if="borrowedItem.status === 'borrowing'">
            Trạng thái: Đang mượn
          </p>
          <p class="status" v-else-if="borrowedItem.status === 'returned'">
            Trạng thái: Đã trả
          </p>
          <p class="status" v-else-if="borrowedItem.status === 'canceled'">
            Trạng thái: Đã hủy
          </p>
          <button
            v-if="borrowedItem.status === 'pending'"
            @click="confirmBorrow(borrowedItem.bookId, borrowedItem.userId)"
            class="confirm-button"
          >
            Xác nhận
          </button>
          <button
            v-if="borrowedItem.status === 'borrowing'"
            @click="returnBook(borrowedItem.bookId, borrowedItem.userId)"
            class="confirm-button"
          >
            Đã trả
          </button>
          <button
            @click="deleteDisplay(borrowedItem.bookId, borrowedItem.userId)"
            class="confirm-button"
          >
            Xóa
          </button>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import Product from "../services/admin/product.service";
import ProductClient from "../services/client/product.service";
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
    async confirmBorrow(bookId, userId) {
      try {
        const data = {
          bookId: bookId,
          userId: userId,
          status: "borrowing",
        };
        await Product.confirmBorrow(data);
        const bookIndex = this.borrowedProducts.findIndex(
          (book) => book.bookId === bookId
        );
        console.log("borrowedProducts", this.borrowedProducts);
        console.log("borrowedProducts", bookIndex);
        if (bookIndex !== -1) {
          this.borrowedProducts[bookIndex].status = "borrowed";
          await this.fetchBorrowedProducts(this.selectedStatus);
        }
      } catch (error) {
        console.error("Error confirming borrow:", error);
      }
    },
    async returnBook(bookId, userId) {
      try {
        const data = {
          bookId: bookId,
          userId: userId,
        };
        await ProductClient.returnBook(data);
        const bookIndex = this.borrowedProducts.findIndex(
          (book) => book.bookId === bookId
        );
        console.log("borrowedProducts", this.borrowedProducts);
        console.log("borrowedProducts", bookIndex);
        if (bookIndex !== -1) {
          this.borrowedProducts[bookIndex].status = "returned";
          await this.fetchBorrowedProducts(this.selectedStatus);
        }
      } catch (error) {
        console.error("Error confirming borrow:", error);
      }
    },

    async deleteDisplay(bookId, userId) {
      try {
        await ProductClient.deleteBorrow(bookId, {
          userId: userId,
          status: "returned",
        });
        const bookIndex = this.borrowedProducts.findIndex(
          (book) => book.bookId === bookId
        );
        console.log("borrowedProducts", this.borrowedProducts);
        console.log("borrowedProducts", bookIndex);
        if (bookIndex !== -1) {
          this.borrowedProducts[bookIndex].status = "0";
          await this.fetchBorrowedProducts(this.selectedStatus);
        }
      } catch (error) {
        console.error("Error confirming borrow:", error);
      }
    },

    async fetchBorrowedProducts(status) {
      try {
        const data = {
          type: status,
        };
        const response = await Product.getBorrow(data);
        const filterResponse = response.filter((book) => book.status !== "0");

        for (const borrowedItem of filterResponse) {
          const user = await User.findById(borrowedItem.userId);
          borrowedItem.userName = user.last_name + " " + user.first_name;
          const book = await Product.getProductById(borrowedItem.bookId);
          borrowedItem.bookName = book.title;
          borrowedItem.bookAuthor = book.author;
          borrowedItem.deleted = book.deleted;
        }
        this.borrowedProducts = filterResponse.filter(
          (book) => book.deleted === false
        );
        console.log(filterResponse);
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
.borrowed-products-container {
  max-width: 800px;
  margin: 0 auto;
}

.borrowed-products-container h2 {
  color: #1a7857;
}

.borrowed-products-list {
  list-style-type: none;
  margin: 0;
  margin-top: 10px;
  padding: 0;
}

.borrowed-list-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.book-info,
.borrowed-by,
.status {
  display: block;
  font-weight: bold;
  text-decoration: none;
}
.book-info {
  padding: 0;
  padding-top: 5px;
  font-size: 32px;
  color: #323a37;
}
.book-info:hover {
  cursor: pointer;
  color: #323a37c8;
}

.borrowed-by {
  padding: 0;
  padding-top: 5px;
  font-size: 24px;
  color: #ff8324;
}

.borrowed-by:hover {
  cursor: pointer;
  color: #ff8324c8;
}

.status {
  color: #4579c7;
  text-decoration: none;
}
</style>
