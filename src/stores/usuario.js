import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useUsuarioStore = defineStore('usuario', () => {

  const sessionId = ref(null)
  const autenticado = ref(false)
  const usuario = ref({})
  const URL_REDIRECT = 'http://localhost:5173/'

  const iniciarLogin = async () => {
      const response = await api.get('/authentication/token/new')
      const requestToken = response.data.request_token

      const UrlAutenticacao = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${URL_REDIRECT}`
      window.location.href = UrlAutenticacao
    }

  const criarSessaoComTokenAprovado = async (tokenAprovado) => { // AGORA É RECONHECIDA
      const respostaSessao = await api.post('/authentication/session/new', {
        request_token: tokenAprovado,
      })

      const novoSessionId = respostaSessao.data.session_id
      sessionId.value = novoSessionId
      autenticado.value = true

      const respostaUsuario = await api.get('/account', {
        params: {
          session_id: novoSessionId,
        },
      })
      usuario.value = respostaUsuario.data
      console.log('Usuário autenticado:', usuario.value)
      localStorage.setItem('session_id', novoSessionId)
    }


  return {
    sessionId,
    autenticado,
    usuario,
    iniciarLogin,
    criarSessaoComTokenAprovado
  }
})
