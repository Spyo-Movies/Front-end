import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useAtorStore = defineStore('atores', () => {
  const state = reactive({
    elencoFilme: [],
    elencoSerie: [],
  });

  const elencoFilme = computed(() => state.elencoFilme);
  const elencoSerie = computed(() => state.elencoSerie);

  const getAtoresFilme = async (filmeId) => {
    const response = await api.get(`movie/${filmeId}/credits`, {
      params: { language: 'pt-BR' },
    });

    state.elencoFilme = response.data.cast || [];
  };

  const getAtoresSerie = async (serieId) => {
    const response = await api.get(`tv/${serieId}/credits`, {
      params: { language: 'pt-BR' },
    });
    state.elencoSerie = response.data.cast || [];
  };

  return { elencoFilme, elencoSerie, getAtoresFilme, getAtoresSerie };
});
