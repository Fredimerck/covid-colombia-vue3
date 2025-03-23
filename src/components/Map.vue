<template>
  <div class="relative w-full flex-grow min-h-[300px]">
    <!-- Contenedor del mapa -->
    <div ref="mapRef" class="w-full h-screen sm:h-full rounded-lg" />

    <!-- Leyenda -->
    <div class="absolute bottom-4 right-4 bg-white shadow-lg rounded p-3 text-sm z-50 w-56 sm:w-auto text-xs">
      <h3 class="font-semibold mb-2 text-gray-800">Leyenda de Estados</h3>
      <ul class="space-y-1">
        <li><span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color:#10B981"></span>Recuperado</li>
        <li><span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color:#FACC15"></span>Leve</li>
        <li><span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color:#FB923C"></span>Moderado</li>
        <li><span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color:#EF4444"></span>Grave</li>
        <li><span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color:#1F2937"></span>Fallecido</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { CovidCase } from '@/types/covid';

const props = defineProps<{ cases: CovidCase[] }>();

declare global {
  interface Window {
    google: typeof google;
  }
}

const mapRef = ref<HTMLDivElement | null>(null);
const map = ref<google.maps.Map | null>(null);
const markers = ref<google.maps.Marker[]>([]);
const infoWindow = ref<google.maps.InfoWindow | null>(null);

function getEstadoColor(estado: string): string {
  switch (estado) {
    case 'Recuperado': return '#10B981';
    case 'Leve': return '#FACC15';
    case 'Moderado': return '#FB923C';
    case 'Grave': return '#EF4444';
    case 'Fallecido': return '#1F2937';
    default: return '#3B82F6';
  }
}

function formatNumber(value: any): string {
  return parseFloat(value).toLocaleString('es-CO');
}

function initMap() {
  const center = { lat: 4.6097, lng: -74.0818 };
  map.value = new window.google.maps.Map(mapRef.value!, {
    center,
    zoom: 6,
    mapTypeId: 'roadmap',
  });

  infoWindow.value = new window.google.maps.InfoWindow();

  map.value.data.loadGeoJson(
    'https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json'
  );

  map.value.data.setStyle({
    fillColor: '#93c5fd',
    fillOpacity: 0.4,
    strokeColor: '#2563eb',
    strokeWeight: 1,
  });

  map.value.data.addListener('mouseover', (event: any) => {
    const nombre = event.feature.getProperty('NOMBRE_DPT');
    const area = event.feature.getProperty('AREA');
    const perimeter = event.feature.getProperty('PERIMETER');
    const hectares = event.feature.getProperty('HECTARES');

    const content = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 12px 16px;
        max-width: 260px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      ">
        <h3 style="margin: 0 0 6px; font-size: 16px; font-weight: 600; color: #1f2937;">
          ${nombre}
        </h3>
        <p style="margin: 0; font-size: 14px; color: #374151;">
          <strong>Área:</strong> ${formatNumber(area)} km²<br/>
          <strong>Perímetro:</strong> ${formatNumber(perimeter)} km<br/>
          <strong>Hectáreas:</strong> ${formatNumber(hectares)} ha
        </p>
      </div>
    `;

    infoWindow.value!.setContent(content);
    infoWindow.value!.setPosition(event.latLng);
    infoWindow.value!.open(map.value);

    map.value!.data.overrideStyle(event.feature, {
      fillOpacity: 0.6,
      fillColor: '#60a5fa',
    });
  });

  map.value.data.addListener('mouseout', (event: any) => {
    infoWindow.value!.close();
    map.value!.data.revertStyle(event.feature);
  });
}

function addMarkers(cases: CovidCase[]) {
  if (!map.value || !infoWindow.value) return;

  markers.value.forEach(marker => marker.setMap(null));
  markers.value = [];

  for (const item of cases) {
    const marker = new window.google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map: map.value,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: getEstadoColor(item.estado),
        fillOpacity: 0.9,
        strokeColor: '#ffffff',
        strokeWeight: 1,
      },
      title: item.ciudad_municipio_nom,
    });

    const content = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 12px 16px;
        max-width: 260px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-left: 5px solid ${getEstadoColor(item.estado)};
      ">
        <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #1f2937;">
          ${item.ciudad_municipio_nom}
        </h3>
        <p style="margin: 0; font-size: 14px; color: #374151;">
          <strong>Departamento:</strong> ${item.departamento_nom}<br/>
          <strong>Estado:</strong> <span style="color: ${getEstadoColor(item.estado)}; font-weight: 600;">
            ${item.estado}
          </span>
        </p>
      </div>
    `;

    marker.addListener('click', () => {
      infoWindow.value!.setContent(content);
      infoWindow.value!.open(map.value, marker);
    });

    markers.value.push(marker);
  }
}

onMounted(() => {
  const interval = setInterval(() => {
    if (window.google?.maps && mapRef.value) {
      clearInterval(interval);
      initMap();
      addMarkers(props.cases);
    }
  }, 100);
});

watch(
  () => props.cases,
  (nuevosCasos) => {
    if (map.value) {
      addMarkers(nuevosCasos);
    }
  },
  { deep: true }
);
</script>
