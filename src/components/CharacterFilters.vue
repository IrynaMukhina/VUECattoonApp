<template>
  <div class="filter-container">
    <input
      type="text"
      placeholder="Search by name"
      @input="onNameChange"
      class="input-field"
    />
    <select @change="onSpeciesChange" class="select-field">
      <option value="">All Species</option>
      <option value="Human">Human</option>
      <option value="Alien">Alien</option>
    </select>
  </div>
</template>

<script>
export default {
  methods: {
    onNameChange(event) {
      this.$emit('filter', { name: event.target.value });
    },
    onSpeciesChange(event) {
      this.$emit('filter', { species: event.target.value });
    },
  },
};
</script>

<style scoped>
.filter-container {
  display: flex;
  gap: 12px;
  max-width: 300px;
  margin: 15px;
}

.input-field,
.select-field {
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus,
.select-field:focus {
  border-color: #007bff;
}

.input-field::placeholder {
  color: #888;
}

.select-field {
  background-color: #fff;
  cursor: pointer;
}

.select-field option {
  padding: 8px;
  font-size: 14px;
}

.filter-container .input-field,
.filter-container .select-field {
  width: 100%;
}
</style>
