import apiService from "../api.service";

class ProductService {
  constructor(baseUrl = "/user/product") {
    this.products = apiService(baseUrl);
  }

  async checkBorrow(productId, data) {
    try {
      const response = await this.products.post(`/${productId}/check`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error borrowing product with ID ${productId}`);
    }
  }

  async borrowProduct(productId, data) {
    try {
      const response = await this.products.post(`/${productId}/borrow`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error borrowing product with ID ${productId}`);
    }
  }
  async getAllProducts() {
    try {
      const response = await this.products.get(`/`);
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
  async getBorrowedByUserId(userId) {
    const response = await this.products.get(`/borrowed/${userId}`);
    return response.data;
  }
  async cancelBorrow(bookId, data) {
    const response = await this.products.put(`/cancel/${bookId}`, data);
    return response.data;
  }
  async deleteBorrow(bookId, data) {
    const response = await this.products.put(`/deleteborrow/${bookId}`, data);
    return response.data;
  }

  async returnBook(data) {
    const response = await this.products.post(`/return`, data);
    return response.data;
  }
  async checkBorrowStatus(productId, userId) {
    try {
      console.log("checkBorrowStatus", productId, userId);
      const data = {
        userId: userId,
        bookId: productId,
      };

      const response = await this.products.post(`/check-borrow`, data);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error checking borrow status for product with ID ${productId}`
      );
    }
  }
}
export default new ProductService();
