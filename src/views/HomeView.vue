<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination } from 'swiper/modules'
import loading from 'vue-loading-overlay'

const filmesPopulares = ref([])
const melhoresFilmes = ref([])
const seriesPopulares = ref([])
const melhoresSeries = ref([])
let isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  let response = await api.get('/list/8572092', {
    params: {
      language: 'pt-BR',
      with_keywords: '470',
    },
  })
  filmesPopulares.value = response.data.items

  response = await api.get('/list/8572097', {
    params: {
      language: 'pt-BR',
      with_keywords: '470',
    },
  })
  melhoresFilmes.value = response.data.items

  response = await api.get('/list/8572752', {
    params: {
      language: 'pt-BR',
      with_keywords: '470',
    },
  })
  melhoresSeries.value = response.data.items

  response = await api.get('/list/8573570', {
    params: {
      language: 'pt-BR',
      with_keywords: '470',
    },
  })
  seriesPopulares.value = response.data.items
  isLoading.value = false
})

import { useRouter } from 'vue-router'
const router = useRouter()

function abrirSerie(serieId) {
  router.push({ name: 'DetalhesSeries', params: { serieId } });
}
function abrirFilme(filmeId) {
  router.push({ name: 'DetalhesFilmes', params: { filmeId } })
}
</script>
<template>
  <main>
    <div class="Bem-vindo">
      <p>Bem-Vindo, Agente há várias missões esperando por você!</p>
    </div>
    <loading v-model:active="isLoading" is-full-page />
    <div class="filmes-populares">
      <p>Filmes Populares:</p>
      <swiper
        :modules="[Navigation, Pagination]"
        :slides-per-view="4"
        navigation
        :centeredSlides="true"
        :loop="true"
      >
        <swiper-slide v-for="filme in filmesPopulares" :key="filme.id">
          <div class="filme-card"
          @click="abrirFilme(filme.id)"
          >
            <img :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`" :alt="filme.title" />
            {{ filme.title }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="melhores-filmes">
      <p>Melhores Filmes:</p>
      <swiper
        :modules="[Navigation, Pagination]"
        :slides-per-view="4"
        navigation
        :centeredSlides="true"
        :loop="true"
      >
        <swiper-slide v-for="filme in melhoresFilmes" :key="filme.id">
          <div class="filme-card"
          @click="abrirFilme(filme.id)"
          >
            <img :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`" :alt="filme.title" />
            {{ filme.title }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="series-populares">
      <p>Séries Populares:</p>
      <swiper
        :modules="[Navigation, Pagination]"
        :slides-per-view="4"
        navigation
        :centeredSlides="true"
        :loop="true"
      >
        <swiper-slide v-for="serie in seriesPopulares" :key="serie.id">
          <div class="filme-card"
          @click="abrirSerie(serie.id)"
          >
            <img :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`" :alt="serie.name" />
            {{ serie.name }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="melhores-series">
      <p>Melhores Series:</p>
      <swiper
        :modules="[Navigation, Pagination]"
        :slides-per-view="4"
        navigation
        :centeredSlides="true"
        :loop="true"
      >
        <swiper-slide v-for="serie in melhoresSeries" :key="serie.id">
          <div class="filme-card"
          @click="abrirSerie(serie.id)"
          >
            <img :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`" :alt="serie.name" />
            {{ serie.name }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </main>
</template>
<style scoped>
main {
  background-color: black;
  color: white;
}
.Bem-vindo {
  width: 100%;
  height: 720px;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background-image: url(/Espiao-removebg-preview.png);
  background-size: cover;
  text-align: center;
}
.Bem-vindo p {
  padding-top: 25vw;
}
.filmes-populares,
.melhores-filmes,
.series-populares,
.melhores-series {
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: bold;
}
.swiper {
  width: 100%;
  height: 100%;
}
.filme-card {
  text-align: center;
  color: white;
  width: 70%;
  margin: 0 auto;
  font-size: 0.9 rem;
}
.filme-card img {
  width: 100%;
  border-radius: 20px;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
div p {
  padding: 2rem 2rem 2rem 4rem;
}
::v-deep(.swiper-button-next),
::v-deep(.swiper-button-prev) {
  color: red;
}
</style>
