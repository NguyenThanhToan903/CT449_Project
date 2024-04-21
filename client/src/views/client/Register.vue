<template>
  <Form class="form-register" @submit.prevent="submit">
    <div class="register">
      <div class="register-authen">
        <h3>ĐĂNG KÝ</h3>

        <div class="register-page" action="">
          <div class="form-group">
            <label for="last_name">Họ</label>
            <input
              name="last_name"
              type="text"
              class="input-item"
              placeholder="Nhập họ"
              v-model="account.last_name"
            />
            <div class="input-line"></div>
          </div>
          <div class="form-group">
            <label for="first_name">Tên</label>
            <input
              name="first_name"
              type="text"
              class="input-item"
              placeholder="Nhập tên"
              v-model="account.first_name"
            />
            <div class="input-line"></div>
          </div>

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
            <label for="phone"> Số điện thoại </label>
            <input
              type="text"
              class="input-item"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              v-model="account.phone"
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

          <div class="form-group">
            <label for="password-confirm"> Mật khẩu lại</label>
            <input
              type="password"
              class="input-item"
              id="password-confirm"
              name="password-confirm"
              placeholder="password confirmation"
              v-model="account.password_confirm"
            />
            <div class="input-line"></div>
          </div>
        </div>

        <div class="form-group submit">
          <button @click="submit" type="submit" class="btn btn-register">
            Đăng ký
          </button>
        </div>
        <p class="login-link">
          Đã có tài khoản?
          <router-link :to="{ name: 'login' }">Đăng nhập.</router-link>
        </p>
      </div>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import AccountService from "@/services/client/accoun.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const account = reactive({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "z",
      sex: "nam",
      password: "",
      position: "client",
      password_confirm: "",
    });
    return {
      account,
      emailExists: false,
    };
  },

  methods: {
    async submit(e) {
      e.preventDefault();
      try {
        await AccountService.register(this.account);
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log("hello", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/margesh");

.form-register {
  background-color: #fffeee;
  border-radius: 2px;
  padding: 20px;
  width: 600px;
  margin: auto;
  margin-bottom: 50px;
  margin-top: 50px;
}

.register-authen h3 {
  position: relative;
  display: flex;
  width: 160px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  text-transform: uppercase;
  font-size: 32px;
  font-family: Helvetica, sans-serif;
  margin-bottom: 20px;
  color: #436850;
}

.register-authen h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #12372a;
}

.register-page {
  display: flex;
  flex-wrap: wrap;
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
}
.form-group .btn-register {
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

.btn-register:hover {
  background-color: #12372a;
}

.login-link {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 0;
  margin-right: 10px;
  color: #436850;
}
</style>
