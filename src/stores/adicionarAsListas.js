import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useUsuarioStore } from "./usuario";


export const useAdicionarAsListasStore = defineStore("adicionarAsListas", () => {
  const usuarioStore = useUsuarioStore();

  async function adicionarFilmeFavoritos(filmeId){
    await api.post(`/account/${usuarioStore.usuario.id}/favorite`, {
      media_type: 'movie',
      media_id: filmeId,
      favorite: true
    },{
      params: {
        session_id: localStorage.getItem('session_id')
      }
    })
    alert('Filme adicionado aos favoritos com sucesso!')
  }

  async function adicionarSerieFavoritos(serieId){
    await api.post(`/account/${usuarioStore.usuario.id}/favorite`, {
      media_type: 'tv',
      media_id: serieId,
      favorite: true
    },{
      params: {
        session_id: localStorage.getItem('session_id')
      }
    })
    alert('Série adicionada aos favoritos com sucesso!')
  }

  async function adicionarFilmeAssistirDepois(filmeId){
    await api.post(`/account/${usuarioStore.usuario.id}/watchlist`, {
      media_type: 'movie',
      media_id: filmeId,
      watchlist: true
    },{
      params: {
        session_id: localStorage.getItem('session_id')
      }
    })
    alert('Filme adicionado à lista de assistir depois com sucesso!')
  }

  async function adicionarSerieAssistirDepois(serieId){
    await api.post(`/account/${usuarioStore.usuario.id}/watchlist`, {
      media_type: 'tv',
      media_id: serieId,
      watchlist: true
    },{
      params: {
        session_id: localStorage.getItem('session_id')
      }
    })
    alert('Série adicionada à lista de assistir depois com sucesso!')
  }

  return { adicionarFilmeFavoritos, adicionarSerieFavoritos, adicionarFilmeAssistirDepois, adicionarSerieAssistirDepois }
})
