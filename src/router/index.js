import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/filmes',
      name: 'filmes',
      component: () => import('../views/MovieView.vue'),
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('../views/SeriesView.vue'),
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: () => import('../views/usuarioView.vue'),
    },
      path: '/detalhes-filmes/:filmeId',
      name: 'DetalhesFilmes',
      component: () => import('../views/DetalhesFilmes.vue'),
      props: true,
    },
    {
      path: '/detalhes-series/:serieId',
      name: 'DetalhesSeries',
      component: () => import('../views/DetalhesSeries.vue'),
      props: true,
    },
  ],
})

export default router
