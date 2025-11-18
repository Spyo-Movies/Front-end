<script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/plugins/axios.js';
  import {Swiper, SwiperSlide} from 'swiper/vue'
  import 'swiper/swiper-bundle.css';
  import { Navigation, Pagination } from 'swiper/modules';

  const filmesPopulares = ref([]);
  const lancamentos = ref([]);
  let isLoading = ref(false);

  onMounted(async() => {
    isLoading.value = true;
    const response = await api.get('/list/8572092', {
      params: {
        language: 'pt-BR',
        with_keywords: '470'
      }
    })
    filmesPopulares.value = response.data.items;
    isLoading.value = false;
  })

  onMounted(async() => {
    isLoading.value = true;
    const response = await api.get('/movie/upcoming', {
      params: {
        language: 'pt-BR',
        with_keywords: '470'
      }
    })
    lancamentos.value = response.data.results;
    isLoading.value = false;
  })


</script>
<template>
  <main>
    <div class="Bem-vindo">
      Bem-Vindo, Agente há várias missões esperando por você!
    </div>
    <loading v-model:active="isLoading" is-full-page />
    <div class="filmes-populares">
      Filmes Populares:
      <swiper
      :modules="[Navigation, Pagination]"
      :slides-per-view="5"
      navigation
      pagination
      >
        <swiper-slide v-for="filme in filmesPopulares" :key="filme.id">
          <div class="filme-card">
            <img :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`" :alt="filme.title" />
            {{ filme.title }}
          </div>
        </swiper-slide>
       </swiper>
    </div>
    <div class="lancamentos">
      Lançamentos:

        <div v-for="filme in lancamentos" :key="filme.id">
          <div class="filme-card">
            <img :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`" :alt="filme.title">
            {{ filme.title }}
          </div>
        </div>
    </div>
    <div class="series-populares">
      Séries Populares:
    </div>
    <div class="series-em-lancamento">
      Séries em Lançamento:

    </div>
  </main>
</template>
<style scoped>
  main {
    padding: 2rem;
    background-color: #1e1e1e;
    color: white;
    min-height: 100vh;
  }
  .Bem-vindo {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  .filmes-populares, .lancamentos, .series-populares, .series-em-lancamento {
    margin-bottom: 2rem;
    font-size: 1.25rem;
    font-weight: bold;
  }
  .swiper{
    width: 100%;
  }
  .swiper-slide{
    width: 20%;
  }
  .filme-card {
    text-align: center;
    color: white;
    width: 100%;
    font-size: .9 rem;
  }
  .filme-card img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }
  
</style>
