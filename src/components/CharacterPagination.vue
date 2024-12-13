<template>
  <div class="pagination">
    <button @click="$emit('change-page', currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="$emit('change-page', currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'totalPages'],
};
</script>
