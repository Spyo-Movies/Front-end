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
    if(usuarioStore.autenticado == true){
    alert('Filme adicionado aos favoritos com sucesso!')
    }
    else{
      alert('Você precisa estar logado para adicionar aos favoritos.')

  }
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
    if(usuarioStore.autenticado == true){
    alert('Série adicionada aos favoritos com sucesso!')
    }
    else{
      alert('Você precisa estar logado para adicionar aos favoritos.')
    }
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
    if(usuarioStore.autenticado == true){
    alert('Filme adicionado à lista de assistir mais tarde com sucesso!')
    }
    else{
      alert('Você precisa estar logado para adicionar ao assistir mais tarde.')
    }
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
    if(usuarioStore.autenticado == true){
    alert('Série adicionada à lista de assistir mais tarde com sucesso!')
    }
    else{
      alert('Você precisa estar logado para adicionar ao assistir mais tarde.')
    }
  }

  return { adicionarFilmeFavoritos, adicionarSerieFavoritos, adicionarFilmeAssistirDepois, adicionarSerieAssistirDepois }
})
