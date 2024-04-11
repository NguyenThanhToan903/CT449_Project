<script>
export default {
  props: {
    user: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ user.name }}
    </div>
    <div class="p-1">
      <strong>E-mail:</strong>
      {{ user.email }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ user.address }}
    </div>
    <div class="p-1">
      <strong>Điện thoại:</strong>
      {{ user.phone }}
    </div>
    <!-- <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="user.favorite" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div> -->
  </div>
</template>
