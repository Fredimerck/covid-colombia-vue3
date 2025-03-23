# 🗺️ COVID Colombia Dashboard - Vue 3 + Google Maps

Esta es una prueba técnica desarrollada con Vue 3, TypeScript y Tailwind CSS. La aplicación muestra un dashboard interactivo con datos reales de COVID-19 en Colombia, visualizados sobre Google Maps mediante polígonos GeoJSON, filtros dinámicos y estadísticas visuales.

---

## 🚀 Tecnologías utilizadas

- **Vue 3** + Composition API
- **TypeScript**
- **Vite**
- **Vue Router**
- **Pinia**
- **Tailwind CSS**
- **Google Maps JavaScript API**
- **ApexCharts (vue3-apexcharts)**

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/covid-colombia-vue3.git
cd covid-colombia-vue3
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

4. Abre en tu navegador:

```
http://localhost:5173
```

---

## 🔐 Acceso al sistema

Al iniciar la app, verás una pantalla de login:

```
Usuario: admin
Contraseña: admin123
```

Una vez autenticado, serás redirigido al dashboard principal.

---

## 🧠 Funcionalidades implementadas

✅ Autenticación y redirección protegida  
✅ Visualización del mapa de Colombia usando Google Maps  
✅ Carga y renderizado de polígonos GeoJSON por departamento  
✅ InfoWindow con datos al pasar el cursor sobre un departamento  
✅ Marcadores de casos en mapa con íconos de colores por estado  
✅ Leyenda visual de estados con colores  
✅ Filtros por estado y departamento en el menú lateral  
✅ Botón para limpiar filtros  
✅ Resumen de casos confirmados, activos, recuperados y mortales  
✅ Gráfica tipo donut con distribución por estado  
✅ Diseño responsive y optimizado para desktop, tablet y mobile  
✅ Código limpio, modular y siguiendo buenas prácticas  

---

## 🌐 API utilizadas

**Datos COVID:**  
https://www.datos.gov.co/resource/gt2j-8ykr.json

**GeoJSON de Colombia (departamentos):**  
https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/colombia.geo.json

**Google Maps API Key:**  
Se utilizó la key oficial entregada para la prueba:  
`AIzaSyBxNStypKrE9J3G2X3qNvSEzqfgN0EZyHg`

---

## 📱 Diseño y presentación

La app se diseñó siguiendo la guía visual proporcionada en la prueba técnica, pero se aplicó un polish visual profesional adicional, incluyendo:

- Colores bien definidos  
- Tipografía moderna  
- InfoWindows estilizados  
- Transiciones suaves  
- Diseño responsivo completo  

---

## 💡 Mejoras futuras opcionales

- Integración de coordenadas reales por ciudad desde otro origen (si la API los incluyera)
- Agrupamiento de marcadores o heatmap para alto volumen de datos
- Panel avanzado con filtros múltiples y estadísticas comparativas

---

## 🧑‍💻 Autor

Prueba técnica desarrollada por Fredimerck Niño Arevalo, como parte de evaluación para el rol Frontend.