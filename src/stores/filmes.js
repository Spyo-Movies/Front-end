import { reactive,computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useFilmeStore = defineStore("filme", () => {
  const state = reactive({
    filmeAtual: {},})

  const filmeAtual = computed(() => state.filmeAtual);

  const getDetalhesFilme = async(filmeId) => {
    const response = await api.get(`movie/${filmeId}`);
    state.filmeAtual = response.data;
  };

  return { filmeAtual, getDetalhesFilme}

  });

