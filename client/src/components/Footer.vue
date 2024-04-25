<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>Về chúng tôi</h4>
        <p>Đây là trang web mượn sách.</p>
      </div>
      <div class="footer-section">
        <h4>Truy cập nhanh</h4>
        <ul>
          <li>
            <router-link class="link" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: 'borrowing' }"
              >Products</router-link
            >
          </li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Liên hệ</h4>
        <p>123 Street Ninh Kieu, Can Tho, Viet Nam</p>
        <p>Email: info@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-bottom-p">
        &copy; 2024 product by Thanh Toan. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background-color: #f4f4f4;
  padding-top: 30px;
  color: #333;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  padding: 0 20px;
}

.footer-section h4 {
  margin-bottom: 10px;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section ul li .link {
  color: #333;
  text-decoration: none;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
}
.footer-bottom-p {
  margin-bottom: 0 !important;
}
</style>
