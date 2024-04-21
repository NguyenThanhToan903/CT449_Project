<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Rubik+Mono+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&family=Oswald:wght@200..700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&family=Oswald:wght@200..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&family=Oswald:wght@200..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  background-color: #adbc9f;
}
</style>
