import { ref } from "vue";
import { defineStore } from "pinia";

export const usepopupLoginStore = defineStore("popUpLogin", () => {
  const isLoginVisible = ref(false);

  const showLogin = () => {
    isLoginVisible.value = true;
  };

  const hideLogin = () => {
    isLoginVisible.value = false;
  };

  return { isLoginVisible, showLogin, hideLogin };
});
