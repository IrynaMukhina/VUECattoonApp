import { createRouter, createWebHistory } from 'vue-router';
import CharacterList from '../views/CharacterList.vue';
import CharacterDetail from '../views/CharacterDetail.vue';
import FavoriteCharacters from '../views/FavoriteCharacters.vue';

const routes = [
  { path: '/', name: 'Home', component: CharacterList },
  { path: '/character/:id', name: 'CharacterDetail', component: CharacterDetail },
  { path: '/favorites', name: 'Favorites', component: FavoriteCharacters },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
