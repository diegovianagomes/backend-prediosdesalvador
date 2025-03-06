"use client";

import dynamic from "next/dynamic";
import Container from "@/components/container";

// Importação dinâmica do componente de mapa para evitar problemas de SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">Carregando mapa...</div>
});

export default function MapaPage() {
  return (
    <Container>
      
      
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapComponent />
      </div>
      
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl mb-2">Como usar o mapa</h3>
          <p>Clique nos marcadores para ver informações sobre os prédios. Use os controles de zoom para navegar pelo mapa.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl mb-2">Legenda</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span>Prédios Históricos</span>
            </li>
            <li className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span>Edifícios Modernos</span>
            </li>
            <li className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span>Pontos Turísticos</span>
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-xl mb-2">Filtros</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span>Mostrar prédios históricos</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span>Mostrar edifícios modernos</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span>Mostrar pontos turísticos</span>
            </label>
          </div>
        </div>
      </div>
    </Container>
  );
}