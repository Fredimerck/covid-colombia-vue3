import { defineStore } from 'pinia';
import axios from 'axios';

export const useCovidStore = defineStore('covid', {
  state: () => ({
    data: [],
    geoJson: null,
    filters: {
      departamento: '',
      estado: '',
    }
  }),
  actions: {
    async fetchData() {
      const res = await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json');
      this.data = res.data;
    },
    async fetchGeoJson() {
      const res = await axios.get('https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json');
      this.geoJson = res.data;
    },
    setFilter(key, value) {
      this.filters[key] = value;
    },
    resetFilters() {
      this.filters = { departamento: '', estado: '' };
    }
  }
});
