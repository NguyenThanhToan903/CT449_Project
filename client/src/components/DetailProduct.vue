<template>
  <div class="container">
    <div class="detailBox">
      <div v-if="product" class="detail-box1">
        <img :src="product.image" alt="Product Image" />
      </div>
      <div v-if="product" class="detail-box2">
        <div class="box-detail">
          <h3 class="box2 title">{{ product.title }}</h3>
          <div class="box2 des">Mô tả: {{ product.description }}</div>
          <div class="box2 price">Giá: {{ product.price }} đ</div>
          <div class="box2 discount">
            Giảm giá: {{ product.discountPercentage }}%
          </div>
          <div class="box2 sold">Đã Mượn: {{ product.sold }}</div>
          <div class="box2 stock">Còn lại: {{ product.stock }}</div>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-success"
              v-if="product.stock > 0"
            >
              Mượn ngay
            </button>
            <button
              type="button"
              class="btn btn-success ms-1"
              v-if="product.stock > 0"
            >
              Mua
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Không có thông tin sản phẩm.</p>
      </div>
    </div>
    <ProductItem />
  </div>
</template>

<script>
import ProductService from "@/services/admin/product.service";
import ProductItem from "./ProductItem.vue";

export default {
  data() {
    return {
      product: null,
      errorMessage: "",
    };
  },
  components: {
    ProductItem,
  },
  methods: {
    async getProduct() {
      try {
        this.product = await ProductService.getProductById(
          this.$route.params.id
        );
        console.log(this.product);
      } catch (error) {
        this.errorMessage = "Failed to fetch product. Please try again later.";
        console.error("Error fetching product:", error.message);
      }
    },
  },
  watch: {
    "$route.params.id": function (newId, oldId) {
      if (newId !== oldId) {
        this.getProduct();
      }
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.detailBox {
  border: 2px solid #0a6f8c;
  border-radius: 10px;
  display: flex;
  padding: 30px;
}

.detail-box1 {
  width: 400px;
  margin-right: 30px;
}

.detail-box1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.detail-box2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box2 {
  margin-bottom: 20px;
}

.btn-group {
  margin-top: 20px;
}
</style>
