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
  <main>

<h1 class="tituloPagina">Filmes</h1>
<div class="container">
 <div class="genre-sidebar">
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
 </div>

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

</div>
  </main>
</template>

<style scoped>


.container{

  height: 400vh;
  display: flex;


}
.tituloPagina{
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
}

.genre-sidebar {
  position: sticky;
  top: 0;
  left: 1rem;
  margin-right: 10vw;
  display: flex;
  height: 80vh;
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-start;

  box-shadow: 0 0 0.5rem #000;
  min-width: 12rem;
  overflow-y: auto;
  max-height: max-content;




}

 .genre-sidebar .genre-item {
  position: relative;
  z-index: 1;
  padding: 0.5rem 0;
  cursor: pointer;
  border: 2px solid var(--color);
  transition:
    color 0.5s,
    background-color 0.5s;
  border-radius: 8px;
  text-align: center;
  color: var(--color);
  overflow: hidden;
  margin-top: 1rem;
}

.genre-item::before {
  content: '';
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 200px;
  width: 200px;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: all 0.7s ease-in-out;
}
.genre-item:hover {
  color: #fff;
  background-color: var(--color);
}
.genre-item:hover::before {
  top: -25px;
  left: -25px;
  transform: scale(1.5);
}
.genre-item:active::before {
  background: var(--color);
  transition: background 0s;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: 150vh;

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

</style>
