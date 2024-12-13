import { createStore } from 'vuex';

export default createStore({
  state: {
    characters: [],
    favoriteCharacters: JSON.parse(localStorage.getItem('favorites')) || [],
  },
  mutations: {
    setCharacters(state, characters) {
      state.characters = characters;
    },
    addFavorite(state, character) {
      if (!state.favoriteCharacters.find((fav) => fav.id === character.id)) {
        state.favoriteCharacters.push(character);
        localStorage.setItem('favorites', JSON.stringify(state.favoriteCharacters));
      }
    },
    removeFavorite(state, characterId) {
      state.favoriteCharacters = state.favoriteCharacters.filter((fav) => fav.id !== characterId);
      localStorage.setItem('favorites', JSON.stringify(state.favoriteCharacters));
    },
  },
  actions: {
    async fetchCharacters({ commit }, { page = 1 }) {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      commit('setCharacters', data.results);
    },
  },
  getters: {
    getFavoriteCharacters: (state) => state.favoriteCharacters,
    isFavorite: (state) => (id) => state.favoriteCharacters.some((fav) => fav.id === id),
  },
});
