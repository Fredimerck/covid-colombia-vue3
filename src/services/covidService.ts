import type { CovidCase } from '@/types/covid';

const API_URL = 'https://www.datos.gov.co/resource/gt2j-8ykr.json';

export async function fetchCovidCases(): Promise<CovidCase[]> {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const parsed: CovidCase[] = data
      .filter((item: any) =>
        item.ciudad_municipio_nom &&
        item.departamento_nom &&
        typeof item.estado === 'string' &&
        item.latitud &&
        item.longitud &&
        !isNaN(parseFloat(item.latitud)) &&
        !isNaN(parseFloat(item.longitud))
      )
      .map((item: any, index: number) => ({
        id: index,
        ciudad_municipio_nom: item.ciudad_municipio_nom,
        departamento_nom: item.departamento_nom,
        estado: formatearEstado(item.estado),
        lat: parseFloat(item.latitud),
        lng: parseFloat(item.longitud),
      }));

    return parsed;
  } catch (error) {
    console.error('Error al cargar los datos COVID:', error);
    return [];
  }
}

function formatearEstado(raw: string | undefined): CovidCase['estado'] {
  if (!raw) return 'Leve';
  const normalizado = raw.toLowerCase();
  if (normalizado.includes('fallecido')) return 'Fallecido';
  if (normalizado.includes('recuperado')) return 'Recuperado';
  if (normalizado.includes('leve')) return 'Leve';
  if (normalizado.includes('moderado')) return 'Moderado';
  if (normalizado.includes('grave')) return 'Grave';
  return 'Leve'; // fallback por defecto
}
