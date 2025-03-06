/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

// Corrigir o problema dos ícones do Leaflet no Next.js
const fixLeafletIcon = () => {
  // @ts-expect-error
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
  });
};

// Definição de tipos para os prédios
type BuildingType = "historic" | "modern" | "tourist";

interface Building {
  id: number;
  name: string;
  description: string;
  position: [number, number]; // Definido como tupla com 2 elementos
  type: BuildingType;
}

// Dados dos prédios (substitua com seus dados reais)
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
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  // Centro do mapa em Salvador (definido como tupla)
  const center: [number, number] = [-12.971111, -38.51083];

  // Função para determinar a cor do marcador com base no tipo
  const getMarkerIcon = (type: BuildingType) => {
    let color = "blue";
    
    switch(type) {
      case "historic":
        color = "red";
        break;
      case "modern":
        color = "blue";
        break;
      case "tourist":
        color = "green";
        break;
    }
    
    return new L.Icon({
      iconUrl: `/markers/${color}-marker.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {buildings.map((building) => (
        <Marker 
          key={building.id} 
          position={building.position}
          icon={getMarkerIcon(building.type)} // Descomentado para usar a função
        >
          <Popup>
            <div>
              <h3 className="font-bold text-lg">{building.name}</h3>
              <p>{building.description}</p>
              <a 
                href={`/predios/${building.id}`} 
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Ver detalhes
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}