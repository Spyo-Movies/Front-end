import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useUsuarioStore } from "./usuario";

export const useListaUsuarioStore = defineStore("listaUsuario",() => {
  const usuarioStore = useUsuarioStore();
  const favoritosFilme = ref([]);
  const favoritosSerie = ref([]);
  const assistirDepoisFilmes = ref([]);
  const assistirDepoisSeries = ref([]);

  async function getFavoritos() {
    const response = await api.get(`/account/${usuarioStore.usuario.id}/favorite/movies?language=pt-BR&page=1&session_id=${localStorage.getItem('session_id')}&sort_by=created_at.asc`);
    favoritosFilme.value = response.data.results;
    const response2 = await api.get(`/account/${usuarioStore.usuario.id}/favorite/tv?language=pt-BR&page=1&session_id=${localStorage.getItem('session_id')}&sort_by=created_at.asc`);
    favoritosSerie.value = response2.data.results;
  }

  async function getAssistirDepois() {
    const response = await api.get(`/account/${usuarioStore.usuario.id}/watchlist/movies?language=pt-BR&page=1&session_id=${localStorage.getItem('session_id')}&sort_by=created_at.asc`)
    assistirDepoisFilmes.value = response.data.results;
    const response2 = await api.get(`/account/${usuarioStore.usuario.id}/watchlist/tv?language=pt-BR&page=1&session_id=${localStorage.getItem('session_id')}&sort_by=created_at.asc`)
    assistirDepoisSeries.value = response2.data.results;
  }

  return { favoritosFilme, favoritosSerie, assistirDepoisFilmes, assistirDepoisSeries, getFavoritos, getAssistirDepois }
})
