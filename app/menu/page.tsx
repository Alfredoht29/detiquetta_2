"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import useSavePromoStore from "../stores/savePromoStore";

interface Promotion {
  id: number;
  documentId: string;
  infoPromo: string;
  expirationDate: string;
  urlPromotion?: string;
  category: string;
  dayOfWeek: string;
  relevance: number;
}

const Page = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [basePromotions, setBasePromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const savePromoStore = useSavePromoStore();

  const categories = Array.from(new Set(basePromotions.map(promo => promo.category)));
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<{ data: Promotion[] }>(
          "http://209.38.139.117:1337/api/promotions",
          {
            headers: {
              Authorization: `Bearer b5814fca6bbdb899336b91b85d9927604f4ada67c3ec0ebbc080221738e1581e10987c044a946d7a063a7307af2fdc221501a4e5a25c5c514e08062ea4e82f85e7b7b2c62837fd32900920bda548e9cde1a75f362bd4568de7c129a966547fc8fcd62ad25cf235042327df3969288505c7d620f3b2f43ac761f6937735954bc7`,
            },
          }
        );
        const data = response.data.data;
        setBasePromotions(data);
        setPromotions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    let filteredPromotions = [...basePromotions];

    if (selectedCategory) {
      filteredPromotions = filteredPromotions.filter(promo => promo.category === selectedCategory);
    }

    if (selectedDay) {
      filteredPromotions = filteredPromotions.filter(promo => promo.dayOfWeek === selectedDay);
    }

    // Ordenar por relevancia
    filteredPromotions.sort((a, b) => b.relevance - a.relevance);

    setPromotions(filteredPromotions);
  }, [selectedCategory, selectedDay, basePromotions]);

  const handleSavePromo = (promoId: number) => {
    savePromoStore.addPromoId(promoId);
  };

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

  const loadMore = () => {
    if (basePromotions.length > 0) {
      setPromotions((prev) => [...prev, ...basePromotions]);
    }
  };

  return (
    <div className="h-full pb-4 overflow-y-auto no-scrollbar flex items-center justify-center">
      <div className="w-screen">
        {selectedPromo ? (
          <div className="landscape:w-1/2 landscape:mx-auto landscape:mt-20 flex flex-col md:flex-row items-center p-4 border rounded-lg shadow-lg">
            <img
              src={selectedPromo.urlPromotion}
              alt="Promo"
              className="w-80 h-80 object-cover rounded-lg"
            />
            <div className="ml-6 text-left">
              <h2 className="text-2xl font-bold">{selectedPromo.infoPromo}</h2>
              <p className="text-gray-600 mt-2">Expira: {selectedPromo.expirationDate}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedPromo(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full p-2 px-8 ml-8">
            <h2 className="text-2xl font-bold mb-4">Promociones destacadas</h2>
            
            {/* Filtros */}
            <div className="flex gap-4 mb-4">
              <select 
                className="select select-bordered w-full max-w-xs"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select 
                className="select select-bordered w-full max-w-xs"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="">Todos los días</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div
              ref={containerRef}
              className="h-[80vh] overflow-y-auto p-4 relative"
            >
              {loading ? (
                <div  className="relative flex flex-col w-64 h-64 rounded-lg border-2 border-solid border-black overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl">
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="h-44 bg-gray-200 rounded animate-pulse" />
                    ))}
                </div>
              ) : (
                <div className="grid portrait:grid-cols-1 landscape:grid-cols-4 mx-auto gap-4">
                  {promotions.map((promo) => (
                    <div
                      key={promo.id}
                      className="relative flex flex-col w-64 h-64 rounded-lg border-2 border-solid border-black overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                      <div className="relative w-full aspect-[16/9] bg-gray-100">
                        <img
                          src={promo.urlPromotion || "/placeholder.svg"}
                          alt={promo.infoPromo}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-grow p-3">
                        <h3 className="font-extrabold text-md underline decoration-4 line-clamp-2">{promo.infoPromo}</h3>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="w-full px-3 py-2 bg-[#EE733B] text-white text-sm rounded hover:bg-[#ff6b25] transition-colors"
                            onClick={() => setSelectedPromo(promo)}
                          >
                            Ver detalle
                          </button>
                          <button
                            type="button"
                            className="px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                            onClick={() => handleSavePromo(promo.id)}
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div ref={sentinelRef} className="h-8" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
