import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useGeneroStore = defineStore("genero", () => {
  const state = reactive({
    generos: [],
    idGeneroAtual: null,
  });

  const generos = computed(() => state.generos);
  const idGeneroAtual = computed(() => state.idGeneroAtual);

  const getNomeGeneros = (id) => state.generos.find((genero) => genero.id === id)?.name

  const getTodosGeneros = async(type) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`)
    state.generos = response.data.genres
  }

  const setIdGeneroAtual = (generoId) => {
    state.idGeneroAtual = generoId
  }

  return { generos, idGeneroAtual, getTodosGeneros, setIdGeneroAtual, getNomeGeneros}
});
