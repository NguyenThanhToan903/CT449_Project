// import { Console, log } from "console";
import apiService from "../api.service";

class AccountService {
  constructor(baseUrl = "/admin") {
    this.Admin = apiService(baseUrl);
  }

  async register(data) {
    return (await this.Admin.post("/register", data)).data;
  }
  async login(data) {
    return (await this.Admin.post("/login", data)).data;
  }
  async logout(data) {
    return (await this.Admin.post("/logout", data)).data;
  }

  async checkEmailExists(email) {
    try {
      const response = await this.Admin.post(`/check-email`, { email });
      // console.log(response);
      return response;
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      throw error;
    }
  }
  async findByEmail(email) {
    try {
      const response = await this.Admin.get(`/find-by-email/${email}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  }
  async checkAuthentication(data) {
    return (await this.Admin.get("/check-authentication", data)).data;
  }
}

export default new AccountService();
