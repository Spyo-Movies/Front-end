import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useUsuarioStore = defineStore('usuario', () => {
  const sessionId = ref({});
  const autenticado = ref(false);
  const usuario = ref({});

  const getRequestToken = async () => {
    const Token = ref({})
    const response = await api.get('authentication/token/new');
    Token.value = response.data;
    return Token;
  }
  const criarSessao = async() => {
    const requestToken = getRequestToken();
    const sessao = ref({});
    const sessionId = ref({});

    const response = await api.post(`authentication/${requestToken}?redirect_to=http://localhost:5173/`)
    sessao.value = response.data;

    const response2 = await api.post('authentication/session/new', {request_token: sessao.value})
    sessionId.value = response2.data;
    autenticado.value = true;
  }
  return { sessionId, autenticado, usuario, criarSessao}
})
