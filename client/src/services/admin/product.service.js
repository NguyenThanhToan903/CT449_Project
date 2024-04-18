import apiService from "../api.service";

class ProductService {
  constructor(baseUrl = "/admin-products") {
    this.products = apiService(baseUrl);
  }

  async getAllProducts() {
    try {
      const response = await this.products.get("/");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }

  async getProductById(productId) {
    try {
      const response = await this.products.get(`/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching product with ID ${productId}`);
    }
  }

  async addProduct(productData) {
    try {
      const response = await this.products.post("/create-product", productData);
      return response.data;
    } catch (error) {
      throw new Error("Error adding product");
    }
  }

  async updateProduct(productId, productData) {
    try {
      const response = await this.products.put(`/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating product with ID ${productId}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await this.products.delete(`/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting product with ID ${productId}`);
    }
  }

  async getBorrow(data) {
    try {
      const response = await this.products.post(`/getBorrow`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch borrow: ${error.message}`);
    }
  }

  async;
}

export default new ProductService();
