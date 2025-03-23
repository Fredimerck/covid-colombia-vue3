<template>
    <div class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div class="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center animate-fade-in">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Bienvenido al Mapa COVID Colombia</h1>
        <p class="text-gray-600 mb-6">
          Explora los casos reportados por departamento y estado en tiempo real.
        </p>
        <button
          @click="irADashboard"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function irADashboard() {
    router.push({ name: 'Dashboard' });
  }
  </script>
  
  <style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
  </style>
  