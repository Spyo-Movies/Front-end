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
        <section class="buttons">
    <a class="btnfos btnfos-5">Adicionar aos favoritos</a>
     <a class="btnfos btnfos-5">Assistir mais tarde</a>
</section>
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

  .buttons {
    margin-top: 1.5rem;


  }
.btnfos {
  text-decoration: none;
  color: white;
  padding: 0.7rem 1.5rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  display: inline-block;
}


.btnfos-5 {
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 0px;
  text-shadow: none;
  -webkit-transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
          transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  padding: 0.5rem;

}

.btnfos-5:hover {
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
  outline-offset: 15px;
  outline-color: rgba(255, 255, 255, 0);
  text-shadow: 1px 1px 2px #427388;
}

</style>
