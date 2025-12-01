<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios.js'
import loading from 'vue-loading-overlay'
import { useGeneroStore } from '@/stores/generos'

const generoStore = useGeneroStore()
const series = ref([])
const generos = ref([])
const isLoading = ref(false)

const formatarData = (date) => new Date(date).toLocaleDateString('pt-BR')
const getNomeGenero = (id) => generos.value.find((genero) => genero.id === id).name

const listarSeries = async (generoId) => {
  generoStore.setIdGeneroAtual(generoId)
  isLoading.value = true
  const response = await api.get('/discover/tv', {
    params: {
      with_genres: generoId,
      language: 'pt-BR',
      with_keywords: '470',
    },
  })
  series.value = response.data.results
  isLoading.value = false
}

onMounted(async () => {
  isLoading.value = true
  await generoStore.getTodosGeneros('tv')
  isLoading.value = false
})
</script>
<template>
  <main>
    <div class="page-container">
      <loading v-model:active="isLoading" is-full-page />

      <div class="lista-genero">
        <p class="generos-titulo">Gêneros:</p>
        <ul>
          <li
            v-for="genero in generoStore.generos"
            :key="genero.id"
            class="item-genero"
            :class="{ active: genero.id === generoStore.idGeneroAtual }"
            @click="listarSeries(genero.id)"
          >
            <p>{{ genero.name }}</p>
          </li>
        </ul>
      </div>

      <div class="series">
        <h1>
          Séries
        </h1>
        <div class="lista-series">
          <div v-for="serie in series" :key="serie.id" class="cartao-serie">
            <img
              :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`"
              :alt="serie.name"
              @click="abrirSerie(serie.id)"
            />
            <div class="detalhes-serie">
              <p class="titulo-serie">{{ serie.name }}</p>
              <p class="data-lancamento-serie">{{ formatarData(serie.first_air_date) }}</p>
              <div class="generos-serie">
                <span
                  v-for="genero_id in serie.genre_ids"
                  :key="genero_id"
                  @click="getNomeGenero(genero_id)"
                  :class="{ active: genero_id === generoStore.idGeneroAtual }"
                >
                  {{ generoStore.getNomeGeneros(genero_id) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: black;
  --color: #ffffff;
}
.page-container {
  display: flex;
  min-height: 100vh;
}
div.lista-genero {
  width: 20rem;
  min-width: 20rem;
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 2rem;
  overflow-y: auto;
  background-color: black;
  color: white;
}
div.lista-genero ul {
  list-style: none;
  padding: 0;
}
div.lista-genero .item-genero {
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
.item-genero::before {
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
.item-genero:hover {
  color: #fff;
  background-color: var(--color);
}
.item-genero:hover p{
  color: #fff;
  transition: 0.7s;
}
.item-genero:hover::before {
  top: -25px;
  left: -25px;
  transform: scale(1.5);
}
.item-genero.active {
  background: var(--color);
  color: white;
  border: 2px solid black;
}
.item-genero.active p {
  color: black;
}
div.series {
  flex: 1;
  padding: 2rem;
  color: white;
}
div.series h1 {
  margin-bottom: 2rem;
  position: sticky;
}
.lista-series {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.cartao-serie {
  width: 15rem;
  min-height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.cartao-serie img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}
.titulo-serie {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.detalhes-serie{
  padding: 0 0.5rem;
}

.generos-serie {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.generos-serie span{
  padding: 0.4rem;
  color: black;
  background-color: white;
  border: #000 2px solid;
  border-radius: 0.5rem;
  cursor: pointer;
}
.detalhes-serie span.active{
  background-color: black;
  color: white;
  border: white 2px solid;
  border-radius: 0.5rem;
}
</style>
