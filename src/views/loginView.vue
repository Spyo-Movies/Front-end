<script setup>
import { usepopupLoginStore } from '@/stores/popUpLogin'
import { useUsuarioStore } from '@/stores/usuario'

const usuarioStore = useUsuarioStore()

const popupLoginStore = usepopupLoginStore()
</script>
<template>
  <transition name="fade">
    <main v-if="popupLoginStore.isLoginVisible">
      <div class="container">
        <h1>Deseja entrar com sua conta do TheMovieDatabase?</h1>
        <div class="botao">
          <button
            class="entrar"
            @click="
              usuarioStore.iniciarLogin(),
              popupLoginStore.hideLogin()
            "
          >
            Entrar
          </button>
          <button class="cancelar" @click="popupLoginStore.hideLogin()">Cancelar</button>
        </div>
      </div>
    </main>
  </transition>
</template>
<style scoped>
main {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(3px);
}
.container {
  align-items: center;
  gap: 2rem;
  border: 2px solid black;
  padding: 4rem;
  border-radius: 10px;
  background-color: white;
  color: black;
}
.botao {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
}
.entrar {
  background-color: white;
  color: green;
  border: green 2px solid;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.entrar:hover {
  background-color: green;
  color: white;
  transition: 0.3s;
}
.cancelar {
  background-color: white;
  color: red;
  border: red 2px solid;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.cancelar:hover {
  background-color: red;
  color: white;
  transition: 0.3s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
