<template>
  <div
    class="bg-white p-4 overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none h-full z-40"
    :class="[
      'fixed top-0 left-0 w-full lg:w-1/4 lg:static',
      isVisibleOnMobile ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Título -->
    <h2 class="text-2xl font-bold text-red-600 mb-1">Total de casos confirmados</h2>
    <p class="text-sm text-gray-500 mb-4">Actualizado hace 10 min</p>

    <!-- Indicadores -->
    <div class="space-y-3 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-orange-400"></span>
          <span>Casos activos</span>
        </div>
        <span class="font-semibold text-sm">{{ resumen.activos }}</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-green-500"></span>
          <span>Recuperados</span>
        </div>
        <span class="font-semibold text-sm">{{ resumen.recuperados }}</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-black"></span>
          <span>Mortales</span>
        </div>
        <span class="font-semibold text-sm">{{ resumen.fallecidos }}</span>
      </div>
    </div>

    <!-- Filtros -->
    <div class="space-y-4 mb-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Filtrar por estado</label>
        <select multiple v-model="filtros.estado" class="w-full border rounded-md p-2 text-sm">
          <option v-for="estado in estados" :key="estado" :value="estado">{{ estado }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Filtrar por ubicación</label>
        <select multiple v-model="filtros.departamento" class="w-full border rounded-md p-2 text-sm">
          <option v-for="dpto in departamentos" :key="dpto" :value="dpto">{{ dpto }}</option>
        </select>
      </div>
    </div>

    <!-- Botón limpiar -->
    <button
      @click="limpiarFiltros"
      :class="[
        'w-full py-2 rounded text-sm transition',
        filtros.estado.length || filtros.departamento.length
          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          : 'bg-gray-100 text-gray-400 cursor-default'
      ]"
    >
      Limpiar filtros
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { CovidCase } from '@/types/covid';

const emit = defineEmits<{
  (e: 'filter-changed', filtros: { estado: string[]; departamento: string[] }): void
}>();

const props = defineProps<{
  cases: CovidCase[];
  onCloseMenu?: () => void;
}>();

const filtros = ref({
  estado: [] as string[],
  departamento: [] as string[]
});

const estados = computed(() => {
  return [...new Set(props.cases.map(c => c.estado))].filter(Boolean);
});

const departamentos = computed(() => {
  return [...new Set(props.cases.map(c => c.departamento_nom))].filter(Boolean);
});

const resumen = computed(() => ({
  activos: props.cases.filter(c => c.estado !== 'Recuperado' && c.estado !== 'Fallecido').length,
  recuperados: props.cases.filter(c => c.estado === 'Recuperado').length,
  fallecidos: props.cases.filter(c => c.estado === 'Fallecido').length,
}));

const isVisibleOnMobile = ref(true);

function limpiarFiltros() {
  filtros.value.estado = [];
  filtros.value.departamento = [];
}

watch(filtros, (nuevoFiltro) => {
  emit('filter-changed', nuevoFiltro);
  if (typeof props.onCloseMenu === 'function' && window.innerWidth < 1024) {
    props.onCloseMenu();
  }
}, { deep: true });
</script>

<style scoped>
select {
  min-height: 100px;
}
</style>
