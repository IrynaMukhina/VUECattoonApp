<template>
  <header>
    <nav>
      <router-link to="/">Characters</router-link>
      <router-link to="/favorites">Favorites ({{ favoriteCount }})</router-link>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const favoriteCount = computed(() => store.state.favoriteCharacters.length);

    return { favoriteCount };
  },
};
</script>
