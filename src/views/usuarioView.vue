<script setup>
import { ref, onMounted } from 'vue'
import { useUsuarioStore } from '@/stores/usuario.js'
import { useListaUsuarioStore } from '@/stores/listaUsuario'
import loading from 'vue-loading-overlay'

const usuarioStore = useUsuarioStore()
const listaUsuarioStore = useListaUsuarioStore()
const favoritosFilmes = ref([])
const assistirDepoisFilmes = ref([])
const favoritosSeries = ref([])
const assistirDepoisSeries = ref([])

const isLoading = ref(false)

const lista = ref(true)

function toggleFavoritos() {
  lista.value = true
}
function toggleAssistirDepois() {
  lista.value = false
}

import { useRouter } from 'vue-router'
const router = useRouter()

function abrirSerie(serieId) {
  router.push({ name: 'DetalhesSeries', params: { serieId } });
}

function abrirFilme(filmeId) {
  router.push({ name: 'DetalhesFilmes', params: { filmeId } })
}


onMounted(async () => {
  isLoading.value = true
  await listaUsuarioStore.getFavoritos()
  await listaUsuarioStore.getAssistirDepois()
  favoritosFilmes.value = listaUsuarioStore.favoritosFilme
  assistirDepoisFilmes.value = listaUsuarioStore.assistirDepoisFilmes
  favoritosSeries.value = listaUsuarioStore.favoritosSerie
  assistirDepoisSeries.value = listaUsuarioStore.assistirDepoisSeries
  isLoading.value = false
})
</script>
<template>
  <main>
    <div class="container-up">
      <div class="usuario">
        <div class="usuario-detalhes">
        <img
          :src="`https://image.tmdb.org/t/p/w45${usuarioStore.usuario.avatar?.tmdb?.avatar_path}`"
          alt="Avatar do Usuário"
        />
        <div class="detalhes-usuario">
          <p class="username">{{ usuarioStore.usuario.username }}</p>
          <p>Linguagem: {{ usuarioStore.usuario.iso_639_1.toUpperCase() }}</p>
          <p>Região: {{ usuarioStore.usuario.iso_3166_1.toUpperCase() }}</p>
        </div>
        </div>
        <router-link to='/' class="logout" @click="usuarioStore.logout()">Sair da conta</router-link>
      </div>
      <div class="botoes">
        <button :class="{ active: lista == true }" @click="toggleFavoritos()">Favoritos</button>
        <button :class="{ active: lista == false }" @click="toggleAssistirDepois()">
          Assistir Depois
        </button>
      </div>
    </div>
    <loading v-model:active="isLoading" is-full-page />
    <div class="container">
      <div v-if="lista" class="favoritos">
        <h2>Favoritos</h2>
        <div class="filmes">
          <h3>Filmes:</h3>
          <div class="cards">
            <div v-for="filme in favoritosFilmes" :key="filme.id" class="card"
            @click="abrirFilme(filme.id)"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`"
                alt="Poster do Filme"
              />
              <div class="detalhes">
                <h3>{{ filme.title }} ({{ filme.release_date.substring(0, 4) }})</h3>
                <p>{{ filme.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="series">
          <h3>Séries:</h3>
          <div class="cards">
            <div v-for="serie in favoritosSeries" :key="serie.id" class="card"
            @click="abrirSerie(serie.id)"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`"
                alt="Poster da Série"
              />
              <div class="detalhes">
                <h3>{{ serie.name }} ({{ serie.first_air_date.substring(0, 4) }})</h3>
                <p>{{ serie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="watchlist">
        <h2>Assistir Depois</h2>
        <div class="filmes">
          <h3>Filmes:</h3>
          <div class="cards">
            <div v-for="filme in assistirDepoisFilmes" :key="filme.id" class="card"
            @click="abrirFilme(filme.id)"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`"
                alt="Poster do Filme"
              />
              <div class="detalhes">
                <h3>{{ filme.title }} ({{ filme.release_date.substring(0, 4) }})</h3>
                <p>{{ filme.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="series">
          <h3>Séries:</h3>
          <div class="cards">
            <div v-for="serie in assistirDepoisSeries" :key="serie.id" class="card"
            @click="abrirSerie(serie.id)"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`"
                alt="Poster da Série"
              />
              <div class="detalhes">
                <h3>{{ serie.name }} ({{ serie.first_air_date.substring(0, 4) }})</h3>
                <p>{{ serie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
div.container-up {
  background-color: black;
  color: white;
}
div.usuario {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 3rem 3rem 0rem 3rem;
  background-color: black;
  color: white;
  justify-content: space-between;
}
div.usuario-detalhes {
  display: flex;
  align-items: center;
  gap: 1rem;
}
div.usuario img {
  border-radius: 50%;
  width: 75px;
  height: 75px;
}
div.detalhes-usuario {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
div.usuario p {
  font-size: 0.8rem;
  color: grey;
  font-weight: 700;
}
div.usuario p.username {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}
a.logout {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
div.botoes {
  display: flex;
  gap: 1rem;
  margin: 2rem 2rem 0rem 2rem;
  background-color: black;
}
div.botoes button {
  padding: 1rem;
  border-radius: 1rem 1rem 0rem 0rem;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}
div.botoes button:hover {
  background-color: white;
  color: black;
  transition: 0.3s;
}
div.botoes button.active {
  background-color: white;
  color: black;
  border: black 4px solid;
  border-bottom: none;
  border-radius: 1rem 1rem 0rem 0rem;
}
div.botoes button.active:hover {
  background-color: black;
  color: white;
  border: 4px solid white;
  border-bottom: none;
  transition: 0.3s;
}
div.favoritos,
div.watchlist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  color: black;
  padding: 0 1rem;
}
div.favoritos h2,
div.watchlist h2 {
  margin: 1rem 1rem 1rem 0rem;
  font-size: 2rem;
}
div.favoritos h3,
div.watchlist h3 {
  margin: 0rem 1rem 1rem 0rem;
  font-size: 1.5rem;
}
div.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: auto;
  padding: 0rem 2rem 1rem 2rem;
  cursor: pointer;
}

div.card {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  background-color: white;
  color: black;
  padding: 2rem;
}

div.card .detalhes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-wrap: wrap;
}
div.card img {
  width: 150px;
  border-radius: 0.5rem;
}
</style>
