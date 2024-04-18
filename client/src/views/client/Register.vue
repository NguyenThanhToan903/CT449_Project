<template>
  <Form class="form-register" @submit.prevent="submit">
    <div class="container register">
      <div class="register-authen">
        <h3>ĐĂNG KÝ</h3>

        <div class="register-page" action="">
          <div class="form-group">
            <label for="first_name">Họ và tên</label>
            <Field
              name="first_name"
              type="text"
              class="form-control"
              placeholder="Nhập tên"
              v-model="account.first_name"
            />
          </div>
          <div class="form-group">
            <label for="last_name">Họ</label>
            <Field
              name="last_name"
              type="text"
              class="form-control"
              placeholder="Nhập họ"
              v-model="account.last_name"
            />
          </div>
          <div class="form-group">
            <label for="email"> Email </label>
            <Field
              name="email"
              type="email"
              class="form-control"
              placeholder="Nhập email"
              v-model="account.email"
            />
          </div>

          <div class="form-group">
            <label for="phone"> Số điện thoại </label>
            <Field
              type="text"
              class="form-control"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              v-model="account.phone"
            />
          </div>
          <div class="form-group">
            <label for="password"> Mật khẩu </label>
            <Field
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              v-model="account.password"
            />
          </div>

          <div class="form-group">
            <label for="password-confirm"> Mật khẩu lại</label>
            <Field
              type="password"
              class="form-control"
              id="password-confirm"
              name="password-confirm"
              placeholder="password confirmation"
              v-model="account.password_confirm"
            />
          </div>
          <!-- <div class="form-group">
            <label for="position"> Positon </label>
            <Field
              type="text"
              class="form-control"
              id="positon"
              name="positon"
              placeholder="Position"
              v-model="account.position"
            />
          </div> -->
        </div>

        <div class="form-group">
          <button @click="submit" type="submit" class="btn btn-register">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
// import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import AccountService from "@/services/client/accoun.service";
// import Swal from "sweetalert2";
//
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
      address: "ád",
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
        // console.log(this.account);
        this.$router.push({ name: "login-client" });
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
  position: absolute;
  right: 0;
  left: 0;
  top: 100px;
  /* font-family: "Margesh Regular"; */
}

.container.register {
  display: flex;
  align-items: center;
  width: 800px;
  border: 2px solid #445b6d;
  border-radius: 20px;
  padding: 0;
  /*transform: translateY(30px);
  animation: fadeInDown 2s ease-out;*/
}

.container .register-img {
  width: 400px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  overflow: hidden;
  object-fit: cover;
}
.container .register-img img {
  width: 100%;
  margin-right: 20px;
  height: 100%;
  aspect-ratio: 3/4;
  /* display: inline-block; */
}

/* register-authen */
.register-authen {
  flex: 1;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-authen h3 {
  font-size: 1.5rem;
}

.register-authen .form-control {
  width: 320px;
}

.check-user {
  display: flex;
  justify-content: space-between;
}

.btn-register {
  border: none;
  background-color: #445b6d;
  padding: 8px 10px;
  color: white;
  border: 1px solid #445b6d;
  box-sizing: border-box;
  /* transition: background-color 0.3s ease-in-out;*/
}

.btn-register:hover {
  background-color: white;
  color: #445b6d;
}

.error-feedback {
  color: red;
}
/*
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(40);
  }
}*/
</style>
