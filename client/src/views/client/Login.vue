<template>
  <Form class="form-login" @submit.prevent="submit">
    <div class="login">
      <div class="login-authentication">
        <h3>Đăng nhập</h3>

        <div class="login-page" action="">
          <div class="form-group">
            <label for="email"> Email </label>
            <input
              name="email"
              type="email"
              class="input-item"
              placeholder="Nhập email"
              v-model="account.email"
            />
            <div class="input-line"></div>
          </div>

          <div class="form-group">
            <label for="password"> Mật khẩu </label>
            <input
              type="password"
              class="input-item"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              v-model="account.password"
            />
            <div class="input-line"></div>
          </div>
        </div>

        <div class="form-group submit">
          <button @click="submit" type="submit" class="btn btn-login">
            Đăng nhập
          </button>
        </div>
        <p class="register-link">
          Chưa có tài khoản?
          <router-link :to="{ name: 'register' }">Đăng ký.</router-link>
        </p>
      </div>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import AccountService from "@/services/client/accoun.service";
import AdminService from "@/services/admin/account.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const account = reactive({
      email: "",
      password: "",
    });
    return {
      account,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isAuthenticated;
    },
  },

  methods: {
    async submit(e) {
      e.preventDefault();
      const Admin = await AdminService.findByEmail(this.account.email);

      if (Admin.data.message === "Admin not found") {
        await AccountService.login(this.account);
        this.$store.commit("login", this.account.email);
        this.$store.commit("client");
        localStorage.setItem("email", this.account.email);
        localStorage.setItem("userRole", "client");
        const redirect = this.$route.query.redirect || { name: "home" };
        this.$router.push(redirect);
      } else {
        if (Admin.data.position === "admin") {
          await AdminService.login(this.account);
          this.$store.commit("login", this.account.email);
          this.$store.commit("admin");
          localStorage.setItem("email", this.account.email);
          localStorage.setItem("userRole", "admin");
          const redirect = this.$route.query.redirect || {
            name: "admin-products",
          };
          this.$router.push(redirect);
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/margesh");

.form-login {
  background-color: #fffeee;
  border-radius: 2px;
  padding: 20px;
  width: 600px;
  margin: 8% auto;
}

.login-authentication h3 {
  position: relative;
  display: flex;
  width: 34%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  text-transform: uppercase;
  font-size: 32px;
  font-family: Helvetica, sans-serif;
  margin-bottom: 20px;
  color: #436850;
}

.login-authentication h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #12372a;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.form-group label {
  display: block;
  color: #436850;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.input-item {
  width: calc(100% - 40px);
  border: none;
  height: 32px;
  margin-left: 20px;
  position: relative;
  outline: none !important;
  background-color: #fffff900;
}

.input-line {
  content: "";
  position: absolute;
  bottom: 0;
  left: 20px;
  width: 0;
  height: 2px;
  z-index: 1;
  background-color: #12372a;
  transition: width 0.5s ease;
}

.input-item:hover + .input-line,
.form-group:focus + .input-line {
  width: calc(100% - 40px);
}

.form-group.submit {
  display: flex;
  margin-bottom: 5px;
}
.form-group .btn-login {
  width: 50%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  color: #fbfada;
  background-color: #436850;
}

.btn-login:hover {
  background-color: #12372a;
}

.register-link {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 0;
  margin-right: 10px;
  color: #436850;
}
</style>
