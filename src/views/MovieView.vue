<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGeneroStore } from '@/stores/generos';
import Loading from 'vue-loading-overlay';



////////////função de detalhes do filme//////////

import { useRouter } from 'vue-router'
const router = useRouter()

function abrirFilme(filmeId) {
  router.push({ name: 'DetalhesFilmes', params: { filmeId } });
}
//////////////



const generoStore = useGeneroStore();

onMounted(async () => {
  isLoading.value = true;
  await generoStore.getTodosGeneros('movie');
  isLoading.value = false;

});
const movies = ref([]);
const isLoading = ref(false);


const listaFilmes = async (generoId) => {
  generoStore.setIdGeneroAtual(generoId);
  isLoading.value = true;


  const response = await api.get('discover/movie', {
    params: {
      with_genres: generoId,
      with_keywords: '470',
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');


</script>

<template>
  <main>

<div class="container">

 <div class="genre-sidebar">
  <h1 class="tituloPagina">Gênero:</h1>
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
  <loading v-model:active="isLoading" is-full-page />
  <div class="filmes"><h1>Filmes:</h1>

  <div class="movie-list">


    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <img
  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
  :alt="movie.title" @click="abrirFilme(movie.id)"/>
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

</div>
  </main>
</template>

<style scoped>
main{
  background-color: black;
  --color: #ffffff;
}

.container{
  display: flex;
}
.tituloPagina{
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
}
.genre-sidebar {
  position: sticky;
  width: 20rem;
  min-width: 20rem;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 2rem 2rem 2rem 0;
  overflow-y: auto;
  background-color: black;
  color: white;

}

 .genre-sidebar .genre-item {
  position: relative;
  z-index: 1;
  padding: 0.5rem;
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
  color: black;
  background-color: var(--color);
}
.genre-item:hover::before {
  top: -25px;
  left: -25px;
  transform: scale(1.5);
}
.genre-item.active{
  background: var(--color);
  color: black;
}
.movie-list {
  position: sticky;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

}

.filmes{
  padding: 2rem;
  color: white;

}
.filmes h1{
  margin-bottom: 2rem;
  position: sticky;

}
.movie-card {
  width: 15rem;
  min-height: 30rem;
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
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-genres{
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.movie-genres span{
  padding: 0.4rem;
  color: black;
  background-color: white;
  border: #000 2px solid;
  border-radius: 0.5rem;
  cursor: pointer;
}
.movie-genres span.active{
  background-color: black;
  color: white;
  border: white 2px solid;
  border-radius: 0.5rem;
}

.movie-release-date {
  font-size: 0.9rem;
  color: gray;
  margin-bottom: 0.5rem;
}

</style>
