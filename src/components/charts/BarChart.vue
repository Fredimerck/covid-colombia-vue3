<template>
    <div>
      <apexchart
        type="bar"
        height="300"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  
  defineProps<{
    data: { estado: string; cantidad: number }[];
  }>();
  
  const props = defineProps<{ data: { estado: string; cantidad: number }[] }>();
  
  const series = computed(() => [
    {
      name: 'Casos',
      data: props.data.map(item => item.cantidad),
    },
  ]);
  
  const chartOptions = computed(() => ({
    chart: {
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 500,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '50%',
      },
    },
    xaxis: {
      categories: props.data.map(item => item.estado),
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    colors: props.data.map(item => {
      switch (item.estado) {
        case 'Fallecido': return '#000000';
        case 'Recuperado': return '#10B981';
        case 'Leve': return '#FACC15';
        case 'Moderado': return '#FB923C';
        case 'Grave': return '#EF4444';
        default: return '#3B82F6';
      }
    }),
  }));
  </script>
  