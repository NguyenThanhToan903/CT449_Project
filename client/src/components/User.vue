<template>
  <div class="user-profile">
    <h2>Tài Khoản</h2>
    <div v-if="user" class="user-details">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Address:</strong> {{ user.address }}</p>
      <p><strong>Sex:</strong> {{ user.sex }}</p>
      <!-- Thêm các thông tin người dùng khác cần hiển thị -->
    </div>

    <div v-else>
      <p>Please log in to view your profile.</p>
      <p>{{ this.$route.fullPath }}</p>
      <p>{{ this.$route.params.id }}</p>
    </div>
  </div>
  <Borrowing v-if="user - detail" />
</template>

<script>
import accounService from "@/services/client/accoun.service";
import Borrowing from "./Borrowing.vue";
export default {
  components: {
    Borrowing,
  },
  props: {
    searchQuery: String,
  },
  data() {
    return {
      user: null,
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    async getUser() {
      this.user = await accounService.findById(this.$route.params.id);
      this.user.name = (
        this.user.last_name +
        " " +
        this.user.first_name
      ).toUpperCase();
    },
  },
};
</script>

<style scoped>
.user-profile {
  padding: 20px;
  margin: 0 auto;
  max-width: 600px;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  font-size: 24px;
  font-family: Lato, sans-serif;
  background-color: #fbfada;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-profile h2 {
  margin-bottom: 10px;
  font-size: 34px;
  text-transform: uppercase;
  color: #12372a;
  text-align: center;
}

.user-details {
  padding: 10px 0;
}

.user-details p {
  margin: 5px 0;
}

.user-details strong {
  font-weight: bold;
}
</style>
