import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Definição de tipos para os prédios
type BuildingType = "historic" | "modern" | "tourist";

interface Building {
  id: number;
  name: string;
  description: string;
  position: [number, number]; // [latitude, longitude]
  type: BuildingType;
}

// Dados dos prédios
const buildings: Building[] = [
  {
    id: 1,
    name: "Elevador Lacerda",
    description: "Um dos principais cartões-postais de Salvador, inaugurado em 1873.",
    position: [-12.974722, -38.513333],
    type: "historic"
  },
  {
    id: 2,
    name: "Farol da Barra",
    description: "Construído em 1698, é o farol mais antigo do Brasil.",
    position: [-13.010278, -38.532222],
    type: "historic"
  },
  {
    id: 3,
    name: "Igreja do Bonfim",
    description: "Um dos principais símbolos religiosos de Salvador, construída em 1754.",
    position: [-12.924722, -38.508889],
    type: "historic"
  },
  {
    id: 4,
    name: "Shopping Barra",
    description: "Um dos principais centros comerciais de Salvador.",
    position: [-13.009722, -38.527778],
    type: "modern"
  },
  {
    id: 5,
    name: "Mercado Modelo",
    description: "Centro de artesanato e cultura popular da Bahia.",
    position: [-12.973611, -38.513889],
    type: "tourist"
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
      markerElement.className = 'marker';
      markerElement.style.backgroundImage = `url(/markers/${getMarkerColor(building.type)}-marker.png)`;
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
        .setLngLat([building.position[1], building.position[0]]) // [longitude, latitude]
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [mapLoaded]);

  // Função para determinar a cor do marcador com base no tipo
  const getMarkerColor = (type: BuildingType): string => {
    switch(type) {
      case "historic":
        return "red";
      case "modern":
        return "blue";
      case "tourist":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />
  );
}