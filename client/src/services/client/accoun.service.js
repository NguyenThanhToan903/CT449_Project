import apiService from "../api.service";

class AccountService {
  constructor(baseUrl = "/user") {
    this.User = apiService(baseUrl);
  }

  async register(data) {
    return (await this.User.post("/register", data)).data;
  }
  async login(data) {
    return (await this.User.post("/login", data)).data;
  }
  async logout(data) {
    return (await this.User.post("/logout", data)).data;
  }
  async checkAuthentication(data) {
    return (await this.User.get("/check-authentication", data)).data;
  }

  async findByEmail(email) {
    try {
      const response = await this.User.get(`/find-by-email/${email}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  }
}

export default new AccountService();
