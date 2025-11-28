<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useFilmeStore } from '@/stores/filmes';
  const filmeStore = useFilmeStore();



  const props = defineProps({
    filmeId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await filmeStore.getDetalhesFilme(props.filmeId);
  });
  const formatPtBr = (value) => {
  if (value == null) return '-'
  return new Intl.NumberFormat('pt-BR').format(Number(value))
}


</script>

<template>
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${filmeStore.filmeAtual.poster_path}`"
        :alt="filmeStore.filmeAtual.title"
      />

      <div class="detalhes">
        <h1>Filme: {{  filmeStore.filmeAtual.title }}</h1>
        <p>{{ filmeStore.filmeAtual.tagline }}</p>
        <p>{{ filmeStore.filmeAtual.overview }}</p>
        <p>Orçamento: ${{ formatPtBr(filmeStore.filmeAtual.budget) }}</p>
        <p>Avaliação: {{ Math.round(filmeStore.filmeAtual.vote_average * 10) }}%</p>
      </div>
    </div>

</div>
  <p class="produtoras">Produtoras:</p>
  <div class="companhias">
    <div
      v-for="companhia in filmeStore.filmeAtual.production_companies"
      :key="companhia.id"
    >
      <img
        v-if="companhia.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${companhia.logo_path}`"
        :alt="companhia.name"
      />
      <p v-else>{{ companhia.name }}</p>
    </div>
  </div>

</template>

<style scoped>

  .main {
    padding: 2rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
  }
  .content {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  .content img {
    border-radius: 0.4rem;
    width: 20vw;
  }
  .detalhes{
    max-width: 50vw;

    border-radius: 0.4rem;
    padding: 0 1rem;


  }
  .detalhes h1 {
    margin-bottom: 1rem;
  }
  .detalhes p {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    }

  .produtoras {
    font-size: 1rem;
    text-align: center;

  }
  .companhias {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 0 2rem 2rem 2rem;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    gap: 10rem;
  }


</style>
