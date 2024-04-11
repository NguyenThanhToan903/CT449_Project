import apiService from "../api.service";

class AccountService {
  constructor(baseUrl = "/admin") {
    this.contact = apiService(baseUrl);
  }

  async register(data) {
    return (await this.contact.post("/register", data)).data;
  }
}

export default new AccountService();
