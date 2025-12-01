<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import loginView from './views/loginView.vue'
import { usepopupLoginStore } from './stores/popUpLogin'
import { useUsuarioStore } from './stores/usuario'
import { useRoute, useRouter } from 'vue-router'

const popupLoginStore = usepopupLoginStore()
const usuarioStore = useUsuarioStore()
console.log('URL do Avatar:', usuarioStore.usuario?.avatar)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const tokenAprovado = route.query.request_token

  if (tokenAprovado) {
    await usuarioStore.criarSessaoComTokenAprovado(tokenAprovado)
    router.replace({ query: {} })
  }

  await usuarioStore.verificarSessaoSalva()
})
</script>
<template>
  <header>
    <loginView v-model:active="popupLoginStore.isLoginVisible" />
    <router-link to="/">SPYo-Movies</router-link>
    <div>
      <ul>
        <li>
          <router-link to="/filmes">Filmes</router-link>
        </li>
        <li>
          <router-link to="/series">Séries</router-link>
        </li>
        <li v-if="usuarioStore.autenticado">
          <router-link to="/usuario">
            <img
              :src="`https://image.tmdb.org/t/p/w45${usuarioStore.usuario.avatar?.tmdb?.avatar_path}`"
              :alt="usuarioStore.usuario?.username"
            />
          </router-link>
        </li>
        <li v-else class="entrar">
          <a @click="popupLoginStore.showLogin()"> Entrar </a>
        </li>
      </ul>
    </div>
  </header>
  <RouterView />
  <footer>
    <p>SPYo-Movies &copy; 2025</p>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  color: black;
  font-size: 1rem;
}
header ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
header a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
footer {
  text-align: center;
  padding: 4rem;
  background-color: white;
  color: black;
}
header img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: block;
}
</style>
