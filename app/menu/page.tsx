"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Promotion {
  id: number;
  documentId: string;
  idPromotion: string;
  infoPromo: string;
  weekDay: number;
  relevance: number;
  codeCity: number;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  urlPromotion?: string;
}

const Page = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<{ data: Promotion[] }>("http://localhost:1337/api/promotions", {
          headers: {
            Authorization: `Bearer 90b0d8b697ad0c5e2a3221575008228e914ab7695272327933d07a92728652ff2e46e9ae6865afb2213daf4eabf4a8b008947e9917e260498dc486d6a152541b39cb5f16edc143efc907c06cd05134214a1ed45ac3297c3cea603ba2fcc8ca0762b70dc7647c8593b55c6880056488870a7b1f6614ff82a7f971846afc720a5c`
          }
        });
        setPromotions(response.data.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

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
                    <img
                      src={promo.urlPromotion}
                      alt={`Promo ${promo.id}`}
                      className="h-52 w-full object-cover transition-opacity duration-300 hover:opacity-90"
                    />
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
