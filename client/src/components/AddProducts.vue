<template>
  <div class="add-product">
    <div class="add-container">
      <h2 class="add-header">Thêm sách mới</h2>
      <form @submit.prevent="addNewProduct" class="form">
        <div class="add-main">
          <div class="left-right-section">
            <div class="left-section">
              <div class="form-group">
                <label for="title">Tên sách:</label>
                <input
                  id="title"
                  class="input-item"
                  type="text"
                  v-model="product.title"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="author">Tác giả:</label>
                <input
                  id="author"
                  class="input-item"
                  type="text"
                  v-model="product.author"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="price">Giá:</label>
                <input
                  id="price"
                  class="input-item"
                  type="number"
                  v-model="product.price"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="quatity">Số lượng:</label>
                <input
                  id="quatity"
                  class="input-item"
                  type="number"
                  v-model="product.stock"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="description">Mô tả:</label>
                <input
                  id="description"
                  class="input-item"
                  type="text"
                  v-model="product.description"
                  required
                />
                <div class="input-line"></div>
              </div>
              <!-- </form> -->
            </div>
            <div class="right-section">
              <!-- <form @submit.prevent="addNewProduct" class="form"> -->
              <div class="form-group">
                <label for="discount">Giảm giá %:</label>
                <input
                  id="discount"
                  class="input-item"
                  type="number"
                  v-model="product.discountPercentage"
                  :min="0"
                  :max="100"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="thumnail">Ảnh bìa (url):</label>
                <input
                  id="thumnail"
                  class="input-item"
                  type="text"
                  v-model="product.image"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="publish-year">Năm xuất bản:</label>
                <input
                  id="publish-year"
                  class="input-item"
                  type="number"
                  v-model="product.yearPublish"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="name-publish">Tên nhà xuất bản:</label>
                <input
                  id="name-publish"
                  class="input-item"
                  type="text"
                  v-model="product.namePublish"
                  required
                />
                <div class="input-line"></div>
              </div>
              <div class="form-group">
                <label for="address-publish">Địa chỉ nhà xuất bản:</label>
                <input
                  id="address-publish"
                  class="input-item"
                  type="text"
                  v-model="product.addressPublish"
                  required
                />
                <div class="input-line"></div>
              </div>
            </div>
          </div>
          <button type="submit" class="add-btn">Thêm</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import ProductService from "../services/admin/product.service";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const product = reactive({
      title: "",
      author: "",
      price: 0,
      stock: 0,
      description: " ",
      discountPercentage: 0,
      image: "",
      yearPublish: " ",
      namePublish: 0,
      addressPublish: " ",
    });

    //

    const addNewProduct = async () => {
      try {
        const response = await ProductService.addProduct(product);
        console.log("Product added:", response);
        router.push({ name: "home" });
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
.add-product {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0px auto;
}

.add-container {
  margin-top: 50px;
  padding: 20px;
}
.add-header {
  text-transform: uppercase;
  font-size: 32px;
  margin-bottom: 5px;
  font-family: Helvetica, sans-serif;
  color: #436850;
}
.add-main {
  padding-bottom: 20px;
  background-color: #fffeee;
}
.left-right-section {
  display: flex;
  padding: 10px;
  margin-top: 20px;
  border-radius: 2px;
  justify-content: space-between;
}
.left-section {
  width: 48%;
}

.right-section {
  width: 48%;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  position: relative;
  margin-bottom: 30px;
  margin-top: 10px;
}

.form-group span {
  position: absolute;
  margin-left: 30px;
  color: red;
  font-size: 10px;
}

label {
  display: block;
  color: #436850;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.input-item {
  width: 400px;
  border: none;
  height: 32px;
  margin-left: 20px;
  position: relative;
  outline: none;
  background-color: #fffff900;
}

.input-line {
  content: "";
  position: absolute;
  bottom: 0;
  left: 20px;
  width: 0;
  height: 2px;
  background-color: #12372a;
  transition: width 0.5s ease;
}

.input-item:hover + .input-line,
.input-item:focus-visible + .input-line {
  width: 400px;
}

.button-section {
  display: block;
  width: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.add-btn {
  display: flex;
  background-color: #436850;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
</style>
