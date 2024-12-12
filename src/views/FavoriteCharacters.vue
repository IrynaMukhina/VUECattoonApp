<template>
  <div>
    <div v-if="favorites.length === 0">No cards</div>
    <div v-else class="character-list">
      <CharacterCard v-for="character in favorites" :key="character.id" :character="character" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CharacterCard from '../components/CharacterCard.vue';

export default {
  components: { CharacterCard },
  setup() {
    const store = useStore();
    const favorites = computed(() => store.getters.getFavoriteCharacters);

    return { favorites };
  },
};
</script>
