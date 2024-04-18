<template>
  <Form class="form-register" @submit.prevent="submit">
    <div class="container register">
      <div class="register-authen">
        <h3>Đăng nhập</h3>

        <div class="register-page" action="">
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
        </div>

        <div class="form-group">
          <button @click="submit" type="submit" class="btn btn-register">
            Đăng nhập
          </button>
        </div>
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

.form-register {
  position: absolute;
  right: 0;
  left: 0;
  top: 100px;
}

.container.register {
  display: flex;
  align-items: center;
  width: 800px;
  border: 2px solid #445b6d;
  border-radius: 20px;
  padding: 0;
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
  transition: background-color 0.3s ease-in-out;
}

.btn-register:hover {
  background-color: white;
  color: #445b6d;
}

.error-feedback {
  color: red;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(40);
  }
}
</style>
