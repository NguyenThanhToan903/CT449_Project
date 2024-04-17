<template>
  <div class="container">
    <h2>Add New Book</h2>
    <form @submit.prevent="addNewProduct" class="form">
      <div class="form-group">
        <label>Title:</label>
        <input type="text" v-model="product.title" required />
      </div>
      <div class="form-group">
        <label>Author:</label>
        <input type="text" v-model="product.author" required />
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="number" v-model="product.price" required />
      </div>
      <div class="form-group">
        <label>Stock:</label>
        <input type="number" v-model="product.stock" required />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <input type="text" v-model="product.description" required />
      </div>
      <div class="form-group">
        <label>Discount Percentage:</label>
        <input type="number" v-model="product.discountPercentage" required />
      </div>
      <div class="form-group">
        <label>Image URL:</label>
        <input type="text" v-model="product.image" required />
      </div>
      <div class="form-group">
        <label>Year Published:</label>
        <input type="number" v-model="product.yearPublish" required />
      </div>
      <div class="form-group">
        <label>Publishing House Name:</label>
        <input type="text" v-model="product.namePublish" required />
      </div>
      <div class="form-group">
        <label>Publishing House Address:</label>
        <input type="text" v-model="product.addressPublish" required />
      </div>
      <button type="submit" class="btn">Add Book</button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import ProductService from "../services/admin/product.service";

export default {
  setup() {
    const product = reactive({
      title: "",
      author: "",
      price: "",
      stock: "",
      description: "",
      discountPercentage: "",
      image: "",
      yearPublish: "",
      namePublish: "",
      addressPublish: "",
    });

    const addNewProduct = async () => {
      try {
        const response = await ProductService.addProduct(product);
        console.log("Product added:", response);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

    return {
      product,
      addNewProduct,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
