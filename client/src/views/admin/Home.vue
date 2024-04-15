<template>
  <div class="home">
    <div v-for="book in books" :key="book.id" class="book-item">
      <h2>{{ book.title }}</h2>
      <p>{{ book.author }}</p>
      <p>{{ book.description }}</p>
      <p>Price: {{ book.price }}</p>
    </div>
  </div>
</template>

<script>
import bookService from "@/services/BookService";

export default {
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        this.books = await bookService.getBooks();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>

<style>
/* Add your CSS styles here */
</style>
