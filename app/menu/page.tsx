// app/page.tsx

"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import useSavePromoStore from "../stores/savePromoStore";

interface Promotion {
  id: number;
  infoPromo: string;
  expirationDate: string;
  urlPromotion?: string;
  category: string;
  relevance: number;
}

const daysOfWeek = [
  { label: "Todos los días", value: "" },
  { label: "Domingo",    value: "0" },
  { label: "Lunes",      value: "1" },
  { label: "Martes",     value: "2" },
  { label: "Miércoles",  value: "3" },
  { label: "Jueves",     value: "4" },
  { label: "Viernes",    value: "5" },
  { label: "Sábado",     value: "6" },
];

const Page: React.FC = () => {
  const [promotions, setPromotions]             = useState<Promotion[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [selectedPromo, setSelectedPromo]       = useState<Promotion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDay, setSelectedDay]           = useState(
    new Date().getDay().toString()
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef  = useRef<HTMLDivElement>(null);

  const promoIds      = useSavePromoStore((s) => s.promoIds);
  const addPromoId    = useSavePromoStore((s) => s.addPromoId);
  const removePromoId = useSavePromoStore((s) => s.removePromoId);

  // Fetch whenever the day changes
  useEffect(() => {
    const fetchPromos = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (selectedDay !== "") {
          params.weekDay = selectedDay;
        }
        const resp = await axios.get<{ data: Promotion[] }>(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions`,
          { params }
        );
        setPromotions(resp.data.data);
      } catch (err) {
        console.error("Error fetching promos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPromos();
  }, [selectedDay]);

  // Category filter + relevance sort
  const filtered = promotions
    .filter((p) => !selectedCategory || p.category === selectedCategory)
    .sort((a, b) => b.relevance - a.relevance);

  const categories = Array.from(new Set(promotions.map((p) => p.category)));

  return (
    <div className="h-full pb-4 overflow-y-auto no-scrollbar flex items-center justify-center">
      <div className="w-screen">
        {selectedPromo ? (
          /* Detail view */
          <div className="landscape:w-1/2 landscape:mx-auto landscape:mt-20 flex flex-col md:flex-row items-center p-4 border rounded-lg shadow-lg">
            <img
              src={selectedPromo.urlPromotion}
              alt="Promo"
              className="w-80 h-80 object-cover rounded-lg"
            />
            <div className="ml-6 text-left">
              <h2 className="text-2xl font-bold">{selectedPromo.infoPromo}</h2>
              <p className="text-gray-600 mt-2">
                Expira: {selectedPromo.expirationDate}
              </p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedPromo(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          /* List + filters */
          <div className="w-full p-2 px-8 ml-4">
            <h2 className="text-2xl font-bold mb-4">
              Promociones destacadas
            </h2>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
              {/* Category */}
              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Day */}
              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {daysOfWeek.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div
              ref={containerRef}
              className="h-[80vh] overflow-y-auto p-4 relative"
            >
              {loading ? (
                /* Skeleton placeholders */
                <div className="grid portrait:grid-cols-1 landscape:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-44 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                /* Promo grid */
                <div className="grid portrait:grid-cols-1 landscape:grid-cols-4 mx-auto gap-4">
                  {filtered.map((promo) => {
                    const saved = promoIds.includes(promo.id);
                    return (
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
                          <h3 className="font-extrabold text-md underline decoration-4 line-clamp-2">
                            {promo.infoPromo}
                          </h3>
                          <div className="flex gap-2">
                            <button
                              className="w-full px-3 py-2 bg-[#EE733B] text-white text-sm rounded hover:bg-[#ff6b25] transition-colors"
                              onClick={() => setSelectedPromo(promo)}
                            >
                              Ver detalle
                            </button>
                            <button
                              className="p-2 rounded-full transition-all hover:scale-110"
                              onClick={() =>
                                saved
                                  ? removePromoId(promo.id)
                                  : addPromoId(promo.id)
                              }
                              aria-label={saved ? "Guardado" : "Guardar"}
                            >
                              <Heart
                                className={`w-6 h-6 stroke-black ${
                                  saved
                                    ? "fill-[#EE733B] animate-heartbeat"
                                    : "fill-none hover:fill-[#EE733B]/20"
                                }`}
                                strokeWidth={1.5}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* When promotions is empty, you’ll see nothing here */}
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
