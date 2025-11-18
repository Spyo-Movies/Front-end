<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGeneroStore } from '@/stores/generos';

const generoStore = useGeneroStore();

onMounted(async () => {

  await generoStore.getTodosGeneros('movie');

});
const movies = ref([]);

const listaFilmes = async (generoId) => {
  generoStore.setIdGeneroAtual(generoId);


  const response = await api.get('discover/movie', {
    params: {
      with_genres: generoId,
      with_keywords: '470',
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
    v-for="genero in generoStore.generos"
    :key="genero.id"
    @click="listaFilmes(genero.id)"
    class="genre-item"
    :class="{ active: genero.id === generoStore.idGeneroAtual }"
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
  :class="{ active: genre_id === generoStore.idGeneroAtual }"
>
  {{ generoStore.getNomeGeneros(genre_id) }}
</span>
        </p>

      </div>
    </div>
  </div>


</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #5e5e5e;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #6e0000;
  box-shadow: 0 0 0.5rem #fd0000;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}
.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.movie-genres span {
  background-color: #088767;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}
.active {
  background-color: #ffffff;
  font-weight: bolder;
  color: #000;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
