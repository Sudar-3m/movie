<!-- Wishlist.vue -->
<template>
  <div>
    <ul>
      <li v-for="item in wishlist" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    wishlist: {
      type: Array,
      required: true
    }
  }
}
</script>