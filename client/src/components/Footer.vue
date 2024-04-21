<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>About Us</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contact Us</h4>
        <p>123 Street Name, City, Country</p>
        <p>Email: info@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  // You can add any logic or properties here if needed
};
</script>

<style scoped>
.footer {
  background-color: #f4f4f4;
  padding: 30px 0;
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

.footer-section ul li a {
  color: #333;
  text-decoration: none;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
}
</style>
