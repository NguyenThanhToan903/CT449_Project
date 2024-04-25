<template>
  <div class="borrowed-books-container">
    <h2>Danh sách sách đã mượn</h2>
    <select v-model="selectedStatus" @change="filterBorrowedBooks">
      <option value="all">Tất cả</option>
      <option value="pending">Chờ xác nhận</option>
      <option value="borrowing">Đang mượn</option>
      <option value="returned">Đã trả</option>
      <option value="cancelled">Đã hủy</option>
    </select>
    <ul class="borrowed-books-list">
      <li
        v-for="book in filteredBooks"
        :key="book._id"
        class="borrowed-book-item"
      >
        <div class="book-details">
          <p @click="toProduct(book.bookId)">
            <strong>Tên sách:</strong> {{ book.title }}
          </p>
          <p @click="toProduct(book.bookId)">
            <strong>Tác giả:</strong> {{ book.author }}
          </p>
          <p @click="toProduct(book.bookId)">
            <strong>Trạng thái:</strong>
            <span v-if="book.status === 'pending'">Chờ xác nhận</span>
            <span v-else-if="book.status === 'returned'">Đã trả</span>
            <span v-else-if="book.status === 'cancelled'">Đã hủy</span>
            <span v-else-if="book.status === 'borrowing'">Đang mượn</span>
          </p>
          <p><strong>Ngày mượn:</strong> {{ formatDate(book.borrowedAt) }}</p>
          <p><strong>Ngày trả:</strong> {{ formatDate(book.returnBy) }}</p>
        </div>
        <div>
          <button
            @click="cancelBorrow(book.bookId, book.userId)"
            v-if="book.status === 'pending'"
            class="cancel-button"
          >
            Hủy
          </button>
          <button
            v-if="book.status === 'cancelled' || book.status === 'returned'"
            class="cancel-button"
            @click="deleteBorrowed(book.bookId, book.userId)"
          >
            Xóa
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ProductService from "@/services/client/product.service";
import User from "@/services/client/accoun.service";

export default {
  data() {
    return {
      borrowedBooks: [],
      filteredBooks: [],
      selectedStatus: "all",
      user: null,
      isLoaded: false,
    };
  },
  methods: {
    async getUser() {
      const email = localStorage.getItem("email");
      this.user = await User.findByEmail(email);
    },
    toProduct(direct) {
      this.$router.push({ name: `product-detail`, params: { id: direct } });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vn");
    },
    filterBorrowedBooks() {
      let sortedBooks;
      if (this.selectedStatus === "all") {
        sortedBooks = this.borrowedBooks.filter(
          (book) => book.status !== "0" && book.status !== "returned"
        );
      } else {
        sortedBooks = this.borrowedBooks.filter(
          (book) =>
            book.status === this.selectedStatus &&
            book.status !== "0" &&
            book.status !== "returned"
        );
      }
      sortedBooks.sort((a, b) => {
        const statusPriority = {
          pending: 1,
          cancelled: 2,
          borrowing: 3,
          returned: 4,
        };
        return statusPriority[a.status] - statusPriority[b.status];
      });
      this.filteredBooks = sortedBooks;
    },
    async cancelBorrow(bookId, userId) {
      await ProductService.cancelBorrow(bookId, { userId: userId });
      await this.refreshBorrowedBooks();
    },
    async deleteBorrowed(bookId, userId) {
      await ProductService.deleteBorrow(bookId, {
        userId: userId,
        status: "cancelled",
      });
      await this.refreshBorrowedBooks();
    },
    async refreshBorrowedBooks() {
      const userId = this.user.data._id;
      const books = await ProductService.getBorrowedByUserId(userId);
      for (const bookItem of books) {
        const book = await ProductService.getProductById(bookItem.bookId);
        bookItem.title = book.title;
        bookItem.author = book.author;
        bookItem.status = bookItem.status;
      }
      this.borrowedBooks = books;
      this.isLoaded = true;
      this.filterBorrowedBooks();
    },
  },
  async mounted() {
    const isUser = await localStorage.getItem("email");
    if (!isUser) this.$router.push({ name: "login" });
    await this.getUser();
    if (this.user.data.message === "User not found") {
      this.$router.push({ name: "login" });
    }
    await this.refreshBorrowedBooks();
  },
};
</script>

<style scoped>
.borrowed-books-container {
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
}

.borrowed-books-container h2 {
  color: #1a7857;
}
.borrowed-books-list {
  list-style-type: none;
  padding: 0;
}

.borrowed-book-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}

.borrowed-book-item .book-details {
  flex-grow: 1;
}

.borrowed-book-item p {
  margin: 5px 0;
}

.borrowed-book-item p strong {
  font-weight: bold;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c82333;
}

select {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 3px;
}
.book-details span {
  margin-left: 5px;
}
</style>
