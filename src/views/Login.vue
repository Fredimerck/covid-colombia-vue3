<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Iniciar Sesión</h1>

      <form @submit.prevent="login">
        <div class="mb-4 text-left">
          <label class="block mb-1 text-sm font-medium text-gray-700">Usuario</label>
          <input v-model="username" type="text" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div class="mb-6 text-left">
          <label class="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Ingresar
        </button>

        <p v-if="error" class="text-red-600 mt-4">Credenciales inválidas</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validCredentials } from '@/config/authConfig';

const username = ref('');
const password = ref('');
const error = ref(false);
const router = useRouter();

function login() {
  if (
    username.value === validCredentials.username &&
    password.value === validCredentials.password
  ) {
    localStorage.setItem('auth', 'true');
    router.push('/dashboard');
  } else {
    error.value = true;
  }
}
</script>
