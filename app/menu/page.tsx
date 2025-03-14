"use client";

import React, { useEffect, useState } from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

// Estructura de la promoción, basada en tu ejemplo
interface Promotion {
  id: number;
  documentId: string;

@@ -18,20 +19,34 @@ interface Promotion {
  urlPromotion?: string;
}

const Page = () => {
export default function Page() {
  // Lista completa de promociones (incluyendo repeticiones).
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  // Lista base (la primera tanda de promociones que cargamos).
  const [basePromotions, setBasePromotions] = useState<Promotion[]>([]);
  // Bandera para mostrar skeleton (cargando) o lista final.
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  // Referencia al contenedor con scroll vertical.
  const containerRef = useRef<HTMLDivElement>(null);
  // Referencia al sentinela (un div al final para el IntersectionObserver).
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Al montar, obtenemos las promociones desde tu API de Strapi.
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<{ data: Promotion[] }>("http://localhost:1337/api/promotions", {
          headers: {
            Authorization: `Bearer 90b0d8b697ad0c5e2a3221575008228e914ab7695272327933d07a92728652ff2e46e9ae6865afb2213daf4eabf4a8b008947e9917e260498dc486d6a152541b39cb5f16edc143efc907c06cd05134214a1ed45ac3297c3cea603ba2fcc8ca0762b70dc7647c8593b55c6880056488870a7b1f6614ff82a7f971846afc720a5c`
        const response = await axios.get<{ data: Promotion[] }>(
          "http://localhost:1337/api/promotions",
          {
            headers: {
              Authorization: `Bearer 90b0d8b697ad0c5e2a3221575008228e914ab7695272327933d07a92728652ff2e46e9ae6865afb2213daf4eabf4a8b008947e9917e260498dc486d6a152541b39cb5f16edc143efc907c06cd05134214a1ed45ac3297c3cea603ba2fcc8ca0762b70dc7647c8593b55c6880056488870a7b1f6614ff82a7f971846afc720a5c`,
            },
          }
        });
        setPromotions(response.data.data);
        );
        const data = response.data.data;
        setBasePromotions(data);
        setPromotions(data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {

@@ -42,46 +57,98 @@ const Page = () => {
    fetchPromotions();
  }, []);

  // Configuramos IntersectionObserver para el sentinelaRef.
  useEffect(() => {
    if (!sentinelRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: containerRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [promotions]);

  // Agregamos otra tanda de "basePromotions" al final de "promotions"
  const loadMore = () => {
    if (basePromotions.length > 0) {
      setPromotions((prev) => [...prev, ...basePromotions]);
    }
  };

  return (
    <div className="h-full mx-auto pb-4 overflow-y-auto no-scrollbar flex items-center justify-center">
      <div className="max-h-full">
        {selectedPromo ? (
          <div className="flex flex-col md:flex-row items-center p-4 border rounded-lg shadow-lg">
            <img src={selectedPromo.urlPromotion} alt="Promo" className="w-80 h-80 object-cover rounded-lg" />
            <div className="ml-6 text-left">
              <h2 className="text-2xl font-bold">{selectedPromo.infoPromo}</h2>
              <p className="text-gray-600 mt-2">Expira: {selectedPromo.expirationDate}</p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setSelectedPromo(null)}>Cerrar</button>
            </div>
    <div className="w-full max-w-screen-xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Promociones destacadas</h2>

      {/* Contenedor con altura fija y scroll vertical */}
      <div
        ref={containerRef}
        className="h-[80vh] overflow-y-auto border border-gray-300 rounded-lg p-4 relative"
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-44 bg-gray-200 rounded animate-pulse"
                />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div className="flex flex-col w-52 h-64 gap-4" key={index}>
                      <div className="skeleton h-52 w-full"></div>
                    </div>
                  ))
              : promotions.map((promo) => (
                  <div 
                    className="relative flex flex-col w-52 h-52 rounded-lg shadow-lg border overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl" 
                    key={promo.id}
                    onClick={() => setSelectedPromo(promo)}
                  >
          <>
            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {promotions.map((promo, index) => (
                <div
                  key={`${promo.id}-${index}`}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  {/* Imagen con relación de aspecto 16:9 */}
                  <div className="relative w-full aspect-[16/9] bg-gray-100">
                    <img
                      src={promo.urlPromotion}
                      alt={`Promo ${promo.id}`}
                      className="h-52 w-full object-cover transition-opacity duration-300 hover:opacity-90"
                      src={promo.urlPromotion || "/placeholder.svg"}
                      alt={promo.infoPromo}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
          </div>

                  {/* Información y botón */}
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-2">
                      {promo.infoPromo}
                    </h3>
                    <button
  type="button"
  className="w-full px-3 py-2 bg-[#EE733B] text-white text-sm rounded hover:bg-[#ff6b25] transition-colors"
>
  Ver detalle
</button>

                  </div>
                </div>
              ))}
            </div>

            {/* Sentinela para cargar más promociones */}
            <div ref={sentinelRef} className="h-8" />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
}