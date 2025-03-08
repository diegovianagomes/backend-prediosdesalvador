import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Definição de tipos para os prédios
type BuildingCategory = "berbert" | "diogenes" | "bina" | "lindo" | "outros";

interface Building {
  id: number;
  name: string;
  description: string;
  position: [number, number]; // [longitude, latitude]
  category: BuildingCategory;
}

// Função para categorizar os prédios com base no nome
const getBuildingCategory = (name: string): BuildingCategory => {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('berb') || nameLower.includes('berbert')) {
    return 'berbert';
  } else if (nameLower.includes('diogenes')) {
    return 'diogenes';
  } else if (nameLower.includes('bina')) {
    return 'bina';
  } else if (nameLower.includes('lindo') || nameLower.includes('lindao')) {
    return 'lindo';
  } else {
    return 'outros';
  }
};

// Função para obter a cor do marcador com base na categoria
const getMarkerColor = (category: BuildingCategory): string => {
  switch(category) {
    case 'berbert':
      return 'red';
    case 'diogenes':
      return 'green';
    case 'bina':
      return 'blue';
    case 'lindo':
      return 'purple';
    default:
      return 'gray';
  }
};

const buildings: Building[] = [
  // Teste alguns predios
  {
    id: 1,
    name: "CECI",
    description: "Sem descrição",
    position: [-38.5264054, -12.9933329],
    category: getBuildingCategory("CECI")
  },
  {
    id: 2,
    name: "Carlos Costa Pinto",
    description: "Sem descrição",
    position: [-38.5273039, -12.9947912],
    category: getBuildingCategory("Carlos Costa Pinto")
  },
  {
    id: 3,
    name: "Conjunto de Casas Vitoria",
    description: "Sem descrição",
    position: [-38.5273603, -12.9942633],
    category: getBuildingCategory("Conjunto de Casas Vitoria")
  },
  {
    id: 4,
    name: "Predio_rosa",
    description: "Sem descrição",
    position: [-38.5265046, -12.9985429],
    category: getBuildingCategory("Predio_rosa")
  },
  {
    id: 5,
    name: "Rodin",
    description: "Sem descrição",
    position: [-38.5258314, -12.9983142],
    category: getBuildingCategory("Rodin")
  },
  {
    id: 16,
    name: "Berbert",
    description: "Sem descrição",
    position: [-38.5280094, -13.0026944],
    category: getBuildingCategory("Berbert")
  },
  {
    id: 19,
    name: "prediao lindo",
    description: "Sem descrição",
    position: [-38.5284955, -13.0014269],
    category: getBuildingCategory("prediao lindo")
  },
  {
    id: 34,
    name: "Princesa de Diogenes",
    description: "Sem descrição",
    position: [-38.5319321, -13.0032001],
    category: getBuildingCategory("Princesa de Diogenes")
  },
  {
    id: 38,
    name: "Bina",
    description: "Sem descrição",
    position: [-38.517483, -13.0077775],
    category: getBuildingCategory("Bina")
  },
  {
    id: 59,
    name: "lindao",
    description: "Sem descrição",
    position: [-38.5135838, -12.9713919],
    category: getBuildingCategory("lindao")
  }
];

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    
    // Chave do MapTiler
    const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || 'UorlvmDuNcDc8pGbxuFY';
    
    // Inicializar o mapa
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/a32b4ca2-0fe6-4284-8d16-b2b2ca536839/style.json?key=${mapTilerKey}`,
      center: [-38.51083, -12.971111], // [longitude, latitude]
      zoom: 13
    });

    // Adicionar controles de navegação
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    
    // Adicionar escala
    map.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 200,
      unit: 'metric'
    }), 'bottom-left');

    // Quando o mapa estiver carregado, adicionar marcadores
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Limpar ao desmontar
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Adicionar marcadores quando o mapa estiver carregado
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Adicionar marcadores para cada prédio
    buildings.forEach(building => {
      // Criar elemento para o marcador
      const markerElement = document.createElement('div');
      markerElement.className = `marker ${building.category}`;
      markerElement.style.backgroundImage = `url(/markers/${getMarkerColor(building.category)}-marker.png)`;
      markerElement.style.width = '25px';
      markerElement.style.height = '41px';
      markerElement.style.backgroundSize = 'cover';
      markerElement.style.cursor = 'pointer';

      // Criar popup
      const popup = new maplibregl.Popup({ offset: 25 })
        .setHTML(`
          <div>
            <h3 style="font-weight: bold; font-size: 1.125rem;">${building.name}</h3>
            <p>${building.description}</p>
            <p>Categoria: ${building.category}</p>
            <a 
              href="/predios/${building.id}" 
              style="color: #3b82f6; text-decoration: none; margin-top: 0.5rem; display: inline-block;"
              onmouseover="this.style.textDecoration='underline'"
              onmouseout="this.style.textDecoration='none'"
            >
              Ver detalhes
            </a>
          </div>
        `);

      // Adicionar marcador ao mapa
      new maplibregl.Marker(markerElement)
        .setLngLat(building.position) // [longitude, latitude]
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Adicionar legenda ao mapa
    const legend = document.createElement('div');
    legend.className = 'map-legend';
    legend.style.position = 'absolute';
    legend.style.bottom = '20px';
    legend.style.right = '10px';
    legend.style.backgroundColor = 'white';
    legend.style.padding = '10px';
    legend.style.borderRadius = '5px';
    legend.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
    legend.style.zIndex = '1';
    legend.innerHTML = `
      <h4 style="margin-top: 0; margin-bottom: 8px; font-size: 14px;">Categorias de Prédios</h4>
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="background-image: url(/markers/red-marker.png); width: 15px; height: 24px; background-size: cover; margin-right: 5px;"></div>
        <span style="font-size: 12px;">Berbert</span>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="background-image: url(/markers/green-marker.png); width: 15px; height: 24px; background-size: cover; margin-right: 5px;"></div>
        <span style="font-size: 12px;">Diogenes</span>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="background-image: url(/markers/blue-marker.png); width: 15px; height: 24px; background-size: cover; margin-right: 5px;"></div>
        <span style="font-size: 12px;">Bina</span>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="background-image: url(/markers/purple-marker.png); width: 15px; height: 24px; background-size: cover; margin-right: 5px;"></div>
        <span style="font-size: 12px;">Lindo/Lindão</span>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="background-image: url(/markers/gray-marker.png); width: 15px; height: 24px; background-size: cover; margin-right: 5px;"></div>
        <span style="font-size: 12px;">Outros</span>
      </div>
    `;
    mapContainer.current?.appendChild(legend);
  }, [mapLoaded]);

  return (
    <div ref={mapContainer} style={{ height: "100%", width: "100%", position: "relative" }} />
  );
}