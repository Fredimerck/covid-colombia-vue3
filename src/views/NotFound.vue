<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 text-center px-4">
      <img
        src="@/assets/404-cartoon.webp"
        alt="Página no encontrada"
        class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-8 animate-fade-in"
      />
      <h1 class="text-4xl font-extrabold text-gray-800 mb-4">¡Oops! Página no encontrada</h1>
      <p class="text-gray-600 mb-6">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <RouterLink
        to="/"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Volver al inicio
      </RouterLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router';
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
  