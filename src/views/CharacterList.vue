<template>
  <div>
    <CharacterFilters @filter="applyFilters" />
    <div class="character-list">
      <CharacterCard
        v-for="character in filteredCharacters"
        :key="character.id"
        :character="character"
      />
    </div>
    <CharacterPagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change-page="fetchCharacters"
    />
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import CharacterFilters from "../components/CharacterFilters.vue";
import CharacterCard from "../components/CharacterCard.vue";
import CharacterPagination from "../components/CharacterPagination.vue";

export default {
  components: { CharacterFilters, CharacterCard, CharacterPagination },
  setup() {
    const store = useStore();
    const characters = ref([]);
    const filters = ref({ name: "", species: "" });
    const currentPage = ref(1);
    const totalPages = ref(1);

    // Fetch characters from API
    const fetchCharacters = async (page = 1) => {
      currentPage.value = page;
      await store.dispatch("fetchCharacters", { page });
      characters.value = store.state.characters;

      // Update the total pages from the API response
      // Assuming this value comes from the API
      totalPages.value = Math.ceil(100 / 20); // Replace 100 with total characters and 20 with per-page count
    };

    // Filtered characters based on search and species
    const filteredCharacters = computed(() => {
      return characters.value.filter((character) => {
        const matchesName = character.name
          .toLowerCase()
          .includes(filters.value.name.toLowerCase());
        const matchesSpecies =
          !filters.value.species || character.species === filters.value.species;
        return matchesName && matchesSpecies;
      });
    });

    // Update filters and refetch characters
    const applyFilters = (newFilters) => {
      filters.value = { ...filters.value, ...newFilters };
    };

    onMounted(() => {
      fetchCharacters();
    });

    return {
      characters,
      filteredCharacters,
      fetchCharacters,
      applyFilters,
      currentPage,
      totalPages,
    };
  },
};
</script>
