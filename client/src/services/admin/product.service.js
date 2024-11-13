import { data } from "jquery";
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

  async editProduct(productId, productData) {
    try {
      const response = await this.products.put(`/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error editing product with ID ${productId}: ${error.message}`
      );
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

  async checkStatusPidUid(productId, userId) {
    try {
      const response = await this.products.get("/checkstatuspiduid", {
        productId,
        userId,
      });

      response.data;
    } catch (error) {
      throw new Error(`Error checkStatusPidUid: ${data}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await this.products.post(`/deleteborrow`, {
        id: productId,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting product with ID ${productId}`);
    }
  }

  async getBorrow(data) {
    //client
    try {
      const response = await this.products.post(`/getBorrow`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch borrow: ${error.message}`);
    }
  }

  async confirmBorrow(data) {
    //admin
    try {
      const response = await this.products.post(`/confirm-borrow`, data);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error confirming borrow for product with ID ${data.bookId}: ${error.message}`
      );
    }
  }

  async;
}

export default new ProductService();
