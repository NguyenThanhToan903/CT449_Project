<template>
  <div class="edit-product">
    <div class="edit-container">
      <h2 class="edit-header">Chỉnh sửa sách</h2>
      <form @submit.prevent="editProduct" class="form">
        <div class="edit-main">
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
                <label for="quantity">Số lượng:</label>
                <input
                  id="quantity"
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
              <!-- <form @submit.prevent="editProduct" class="form"> -->
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
                <label for="thumbnail">Ảnh bìa (url):</label>
                <input
                  id="thumbnail"
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
          <button type="submit" class="add-btn">Lưu</button>
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
    const productId = router.currentRoute.value.params.id;
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

    const getProductDetails = async () => {
      try {
        const response = await ProductService.getProductById(productId);
        Object.assign(product, response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const editProduct = async () => {
      try {
        const response = await ProductService.editProduct(productId, product);
        console.log("Product edited:", response);
        router.push({ name: "product-detail", params: { id: productId } });
      } catch (error) {
        console.error("Error editing product:", error);
      }
    };
    getProductDetails();
    return {
      product,
      editProduct,
    };
  },
};
</script>

<style scoped>
.edit-product {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0px auto;
}

.edit-container {
  margin-top: 50px;
  padding: 20px;
}
.edit-header {
  text-transform: uppercase;
  font-size: 32px;
  font-family: Helvetica, sans-serif;
  margin-bottom: 5px;
  color: #436850;
}
.edit-main {
  padding: 10px;
  margin-top: 20px;
  border-radius: 2px;
  background-color: #fffeee;
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
  margin-bottom: 20px;
  margin-top: 10px;
}

label {
  display: block;
  color: #436850;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.input-item {
  width: 400px !important;
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

/* Ẩn mũi tên lên xuống trên input number */
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
.left-right-section {
  display: flex;
  padding: 10px;
  margin-top: 20px;
  border-radius: 2px;
  justify-content: space-between;
}
</style>
