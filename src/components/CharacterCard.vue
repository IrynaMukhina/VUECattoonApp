<template>
  <div class="character-card">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
    <p>Species: {{ character.species }}</p>
    <p>Status: {{ character.status }}</p>
    <button @click="toggleFavorite">
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: ['character'],
  setup(props) {
    const store = useStore();
    const isFavorite = computed(() => store.getters.isFavorite(props.character.id));

    const toggleFavorite = () => {
      if (isFavorite.value) {
        store.commit('removeFavorite', props.character.id);
      } else {
        store.commit('addFavorite', props.character);
      }
    };

    return { isFavorite, toggleFavorite };
  },
};
</script>
