<template>
    <div class="w-1/4 bg-white border-l p-4 overflow-y-auto shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Resumen Estadístico</h2>
  
      <div class="mb-4">
        <p class="text-gray-700"><strong>Total de casos:</strong> {{ cases.length }}</p>
      </div>
  
      <div class="mb-4">
        <h3 class="font-medium text-gray-700 mb-2">Casos por Estado</h3>
        <ul class="space-y-1">
          <li v-for="(cantidad, estado) in casosPorEstado" :key="estado">
            {{ estado }}: {{ cantidad }}
          </li>
        </ul>
      </div>
  
      <div>
        <h3 class="font-medium text-gray-700 mb-2">Top Departamentos</h3>
        <ul class="space-y-1">
          <li v-for="(cantidad, departamento) in topDepartamentos" :key="departamento">
            {{ departamento }}: {{ cantidad }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import type { CovidCase } from '@/types/covid';
  
  const props = defineProps<{ cases: CovidCase[] }>();
  
  const casosPorEstado = computed(() => {
    const conteo: Record<string, number> = {};
    for (const caso of props.cases) {
      conteo[caso.estado] = (conteo[caso.estado] || 0) + 1;
    }
    return conteo;
  });
  
  const topDepartamentos = computed(() => {
    const conteo: Record<string, number> = {};
    for (const caso of props.cases) {
      conteo[caso.departamento_nom] = (conteo[caso.departamento_nom] || 0) + 1;
    }
    return Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .reduce((obj, [dep, cant]) => {
        obj[dep] = cant;
        return obj;
      }, {} as Record<string, number>);
  });
  </script>
  