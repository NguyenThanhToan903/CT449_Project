<template>
  <div class="sidebar">
    <div class="sidebar-header">Admin Panel</div>
    <div class="menu">
      <ul>
        <li @click="navigateTo('admin-products')">Dashboard</li>
        <li @click="navigateTo('home')">Products</li>
        <li @click="navigateTo('users')">Users</li>
        <!-- Thêm các mục menu khác nếu cần -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  background-color: #333;
  color: #fff;
  padding-top: 20px;
}

.sidebar-header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.menu ul {
  list-style-type: none;
  padding-left: 0;
}

.menu ul li {
  padding: 10px;
  cursor: pointer;
}

.menu ul li:hover {
  background-color: #555;
}
</style>
