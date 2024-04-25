<template>
  <div class="user-list">
    <h2>User List</h2>
    <div v-if="users.length > 0">
      <div v-for="user in users" :key="user.id">
        <div class="user-item">
          <!-- @click="toUser(user)" -->
          <p>
            <strong>Name:</strong> {{ user.first_name + " " + user.last_name }}
          </p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Address:</strong> {{ user.address }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No users found.</p>
    </div>
  </div>
</template>

<script>
import accountService from "@/services/admin/account.service";
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async toUser(user) {
      this.$router.push({ name: "user-profile", params: { id: user._id } });
    },
    async getUsers() {
      this.users = await accountService.getAllUsers();
    },
  },
};
</script>

<style scoped>
.user-list {
  padding: 20px;
  margin: 0 auto;
  max-width: 600px;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  font-size: 24px;
  font-family: Lato, sans-serif;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-list h2 {
  margin-bottom: 10px;
  font-size: 34px;
  text-transform: uppercase;
  color: #11855c;
  text-align: center;
}

.user-item {
  margin-bottom: 20px;
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  background-color: #fbfada;
}
</style>
