<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <router-link to="/">SPYo-Movies</router-link>
      <div>
        <ul>
          <li>
            <router-link to="/filmes">Filmes</router-link>
          </li>
          <li>
            <router-link to="/series">Séries</router-link>
          </li>
          <li>
            <router-link>Entrar</router-link>
          </li>
          <!--  Fazer um v-if checando se o usuário está logado depois de fazer o sistema de login
          <li>
            <router-link>Cadastrar</router-link>
          </li>
          -->
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
}
header ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}
header a{
  color: black;
  text-decoration: none;
}
footer {
  text-align: center;
  padding: 4rem;
  background-color: white;
  color: black;
}
</style>
