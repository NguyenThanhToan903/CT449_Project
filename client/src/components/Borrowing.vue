<template>
  <div class="borrowed-books-container">
    <h2>Danh sách sách đã mượn</h2>
    <select v-model="selectedStatus" @change="filterBorrowedBooks">
      <option value="all">Tất cả</option>
      <option value="pending">Chờ xác nhận</option>
      <option value="borrowing">Đang mượn</option>
      <option value="cancelled">Đã hủy</option>
      <option value="returned">Đã mượn</option>
    </select>
    <ul class="borrowed-books-list">
      <li
        v-for="book in filteredBooks"
        :key="book._id"
        class="borrowed-book-item"
        :class="getStatusClass(book.status)"
      >
        <div class="book-details">
          <p>
            <strong>Tên sách:</strong> <span>{{ book.title }}</span>
          </p>
          <p>
            <strong>Tác giả:</strong> <span>{{ book.author }}</span>
          </p>
          <p>
            <strong>Trạng thái:</strong>
            <span v-if="book.status === 'pending'">Chờ xác nhận</span>
            <span v-else-if="book.status === 'borrowing'">Đang mượn</span>
            <span v-else-if="book.status === 'cancelled'">Đã hủy</span>
            <span v-else-if="book.status === 'returned'">Đã mượn</span>
          </p>
          <!-- <p><strong>Ngày mượn:</strong> {{ book.borrowedAt }}</p>
          <p><strong>Ngày trả:</strong> {{ formatDate(book.returnBy) }}</p> -->
        </div>
        <div>
          <button
            @click="cancelBorrow(book.bookId, book.userId)"
            v-if="book.status === 'pending'"
            class="cancel-button"
          >
            Hủy
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ProductService from "@/services/client/product.service";

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
  async created() {
    await this.getUser();
    await this.refreshBorrowedBooks();
  },
  methods: {
    async getUser() {
      const dataUser = localStorage.getItem("user");
      if (dataUser) {
        this.user = JSON.parse(dataUser);
      }
    },
    toProduct(direct) {
      this.$router.push({ name: `product-detail`, params: { id: direct } });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vn");
    },
    filterBorrowedBooks() {
      if (this.selectedStatus === "all") {
        this.filteredBooks = this.borrowedBooks;
      } else {
        this.filteredBooks = this.borrowedBooks.filter(
          (book) => book.status === this.selectedStatus
        );
      }
    },
    getStatusClass(status) {
      switch (status) {
        case "pending":
          return "status-pending";
        case "borrowing":
          return "status-borrowing";
        case "cancelled":
          return "status-cancelled";
        case "return":
          return "status-return";
        default:
          return "";
      }
    },
    async cancelBorrow(bookId, userId) {
      await ProductService.cancelBorrow(bookId, { userId: userId });
      await this.refreshBorrowedBooks();
    },
    async refreshBorrowedBooks() {
      const userId = this.user?.data._id;
      if (userId) {
        const books = await ProductService.getBorrowedByUserId(userId);
        for (const bookItem of books) {
          const book = await ProductService.getProductById(bookItem.bookId);
          bookItem.title = book.title;
          bookItem.author = book.author;
        }
        this.borrowedBooks = books;
        this.filterBorrowedBooks();
        this.isLoaded = true;
      }
    },
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

.status-pending {
  border-left: 5px solid #ffc107;
}

.status-borrowing {
  border-left: 5px solid #28a745;
}

.status-cancelled {
  border-left: 5px solid #dc3545;
}

.status-deleted {
  border-left: 5px solid #6c757d;
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
