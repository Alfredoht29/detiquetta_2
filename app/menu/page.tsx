"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

interface Promotion {
  id: number;
  documentId: string;
  infoPromo: string;
  expirationDate: string;
  urlPromotion?: string;
}

const Page = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [basePromotions, setBasePromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<{ data: Promotion[] }>(
          "http://localhost:1337/api/promotions",
          {
            headers: {
              Authorization: `Bearer 23aa03f93c96a744b04d81c82b9c4b594f6ab052ed1a574297bca5f888d81159fce3d920e85447154c9c706f40fde996631274fc9c8aab7cc5e1154a1b06c1ce99e5e8ff65fb8a667e450d90ac087bdfda3eabcbccee2fa413219cb7ed33aeb5c32a9853812f3ded78ef2f80c4d85b8c3716761a8b85d47b3e5095c2801d00ab`,
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
                      onClick={() => setSelectedPromo(promo)}
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
