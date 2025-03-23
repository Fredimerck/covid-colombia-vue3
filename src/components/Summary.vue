<template>
  <div class="bg-white rounded-xl p-4 shadow-md w-full max-w-4xl mx-auto">
    <h2 class="text-lg md:text-xl font-bold text-red-600 mb-4 text-center md:text-left">Total de casos confirmados</h2>

    <div v-if="totalCasos === 0" class="text-sm text-gray-500 italic">
      No se encontraron casos con la información disponible actualmente.
    </div>

    <div v-else>
      <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        <!-- Gráfico -->
        <div class="w-full md:w-1/2">
          <apexchart
            type="donut"
            height="250"
            :options="chartOptions"
            :series="series"
          />
        </div>

        <!-- Resumen textual -->
        <div class="w-full md:w-1/2 text-sm text-gray-700 space-y-2">
          <p><strong>Total de casos:</strong> {{ totalCasos }}</p>
          <p>
            <strong>Estado más frecuente:</strong>
            <span class="capitalize">{{ estadoConMasCasos.estado }}</span>
            ({{ estadoConMasCasos.cantidad }} casos)
          </p>
          <p class="text-xs text-gray-400 italic mt-4">
            Datos tomados en tiempo real desde
            <a href="https://www.datos.gov.co/" target="_blank" class="underline">datos.gov.co</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CovidCase } from '@/types/covid';

const props = defineProps<{ cases: CovidCase[] }>();

const totalCasos = computed(() => props.cases.length);

const resumenPorEstado = computed(() => {
  const conteo: Record<string, number> = {};
  for (const c of props.cases) {
    conteo[c.estado] = (conteo[c.estado] || 0) + 1;
  }
  return conteo;
});

const series = computed(() => Object.values(resumenPorEstado.value));

const chartOptions = computed(() => ({
  labels: Object.keys(resumenPorEstado.value),
  colors: [
    '#FACC15', // Leve
    '#FB923C', // Moderado
    '#EF4444', // Grave
    '#10B981', // Recuperado
    '#1F2937', // Fallecido
  ],
  legend: {
    position: 'bottom',
    labels: {
      colors: '#374151',
    }
  },
  dataLabels: {
    enabled: true
  },
}));

const estadoConMasCasos = computed(() => {
  let maxEstado = '';
  let maxCantidad = 0;
  for (const [estado, cantidad] of Object.entries(resumenPorEstado.value)) {
    if (cantidad > maxCantidad) {
      maxCantidad = cantidad;
      maxEstado = estado;
    }
  }
  return { estado: maxEstado, cantidad: maxCantidad };
});
</script>

<style scoped>
/* Compacto para pantallas pequeñas */
</style>
