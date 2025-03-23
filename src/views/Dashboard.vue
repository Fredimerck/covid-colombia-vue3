<template>
  <div class="relative flex flex-col lg:flex-row h-screen">
    <!-- Botón logout -->
    <button
      class="fixed top-2 right-2 z-50 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
      @click="logout"
    >
      Cerrar sesión
    </button>

    <!-- Botón hamburguesa (solo móviles) -->
    <button
      class="lg:hidden p-3 m-2 rounded-md text-white bg-blue-600 shadow-md fixed top-2 left-2 z-40"
      @click="menuAbierto = !menuAbierto"
    >
      ☰
    </button>

    <!-- Overlay oscuro -->
    <transition name="fade">
      <div
        v-if="menuAbierto && !isDesktop"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="menuAbierto = false"
      />
    </transition>

    <!-- Sidebar móvil o desktop -->
    <Sidebar
      v-if="menuAbierto || isDesktop"
      :cases="covidCases"
      @filter-changed="actualizarFiltros"
      :onCloseMenu="() => (menuAbierto = false)"
    />

    <!-- Contenido principal -->
    <div :class="['flex flex-col w-full lg:w-3/4', !isDesktop && 'pt-16']">
      <Loader v-if="loading" />
      <template v-else>
        <Summary :cases="filteredCases" />
        <Map :cases="filteredCases" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Summary from '@/components/Summary.vue';
import Map from '@/components/Map.vue';
import Loader from '@/components/Loader.vue';
import type { CovidCase } from '@/types/covid';
import { departamentoCoords } from '@/data/departamentoCoords';

const covidCases = ref<CovidCase[]>([]);
const filtros = ref<{ estado: string[]; departamento: string[] }>({ estado: [], departamento: [] });
const loading = ref(true);
const menuAbierto = ref(false);
const isDesktop = window.innerWidth >= 1024;

function logout() {
  localStorage.removeItem('auth');
  window.location.href = '/login';
}

function formatearEstado(raw: string): CovidCase['estado'] {
  const normalized = raw.toLowerCase();
  if (normalized.includes('fallecido')) return 'Fallecido';
  if (normalized.includes('recuperado')) return 'Recuperado';
  if (normalized.includes('leve')) return 'Leve';
  if (normalized.includes('moderado')) return 'Moderado';
  if (normalized.includes('grave')) return 'Grave';
  return 'Leve';
}

function mapApiData(raw: any[]): CovidCase[] {
  console.log('📥 Datos crudos de la API:', raw.slice(0, 5));
  return raw
    .filter(item =>
      item.departamento_nom &&
      item.ciudad_municipio_nom &&
      item.estado
    )
    .map((item, index) => {
      const coords = departamentoCoords[item.departamento_nom.toUpperCase()];
      return {
        id: index + 1,
        ciudad_municipio_nom: item.ciudad_municipio_nom,
        departamento_nom: item.departamento_nom,
        estado: formatearEstado(item.estado),
        lat: coords?.lat || 0,
        lng: coords?.lng || 0,
      };
    })
    .filter(item => item.lat !== 0 && item.lng !== 0);
}

async function fetchCovidData() {
  try {
    const response = await fetch('https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=5000');
    const data = await response.json();
    covidCases.value = mapApiData(data);
    console.log('🧪 Casos después del mapeo:', covidCases.value.slice(0, 5));
  } catch (error) {
    console.error('Error al cargar datos desde la API:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchCovidData();
});

function actualizarFiltros(nuevosFiltros: typeof filtros.value) {
  filtros.value = nuevosFiltros;
}

const filteredCases = computed(() => {
  const resultado = covidCases.value.filter(caso => {
    const estadoValido = filtros.value.estado.length === 0 || filtros.value.estado.includes(caso.estado);
    const departamentoValido = filtros.value.departamento.length === 0 || filtros.value.departamento.includes(caso.departamento_nom);
    return estadoValido && departamentoValido;
  });
  console.log('✅ Casos filtrados:', resultado);
  return resultado;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
