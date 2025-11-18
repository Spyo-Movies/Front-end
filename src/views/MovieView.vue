<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGeneroStore } from '@/stores/generos';

const genreStore = useGeneroStore();

onMounted(async () => {

  await genreStore.getTodosGeneros('movie');

});
const movies = ref([]);

const listaFilmes = async (generoId) => {
  genreStore.setIdGeneroAtual(generoId);


  const response = await api.get('discover/movie', {
    params: {
      with_genres: generoId,
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
};
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');


</script>

<template>

<h1>Filmes</h1>
  <ul class="genre-list">

      <li
    v-for="genero in genreStore.genres"
    :key="genero.id"
    @click="listaFilmes(genero.id)"
    class="genre-item"
    :class="{ active: genero.id === genreStore.idGeneroAtual }"
  >
    {{ genero.name }}
  </li>

  </ul>


  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img
  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
  :alt="movie.title"/>
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
         <span
  v-for="genre_id in movie.genre_ids"
  :key="genre_id"
  @click="listaFilmes(genre_id)"
  :class="{ active: genre_id === genreStore.idGeneroAtual }"
>
  {{ genreStore.getNomeGeneros(genre_id) }}
</span>
        </p>

      </div>
    </div>
  </div>


</template>
