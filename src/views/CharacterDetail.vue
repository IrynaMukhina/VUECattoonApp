<template>
  <div>
    <img :src="character.image" :alt="character.name" />
    <h1>{{ character.name }}</h1>
    <p>Species: {{ character.species }}</p>
    <p>Status: {{ character.status }}</p>
    <p>Last known location: {{ character.location.name }}</p>
    <p>First seen in: {{ character.episode[0] }}</p>
    <button @click="toggleFavorite">
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const character = ref(null);

    const fetchCharacter = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`);
      character.value = await response.json();
    };

    const isFavorite = computed(() => store.getters.isFavorite(character.value?.id));

    const toggleFavorite = () => {
      if (character.value) {
        if (isFavorite.value) {
          store.commit('removeFavorite', character.value.id);
        } else {
          store.commit('addFavorite', character.value);
        }
      }
    };

    onMounted(() => {
      fetchCharacter();
    });

    return { character, isFavorite, toggleFavorite };
  },
};
</script>
