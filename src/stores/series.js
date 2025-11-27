import { reactive,computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useSerieStore = defineStore("serie", () => {
  const state = reactive({
    serieAtual: {},})

  const serieAtual = computed(() => state.serieAtual);

  const getDetalhesSerie = async(serieId) => {
    const response = await api.get(`tv/${serieId}`);
    state.serieAtual = response.data;
  };

  return { serieAtual, getDetalhesSerie}

  }); 
