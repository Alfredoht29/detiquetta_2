"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import useSavePromoStore from "../stores/savePromoStore";

interface Promotion {
  id: number;
  documentId: string;
  idPromotion: string;
  infoPromo: string;
  weekDay: number;
  relevance: number;
  codeCity: number;
  expirationDate: string;
  urlPromotion?: string;
  Categoria: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  restaurant: {
    id: number;
    documentId: string;
  };
}

export default function SavedPromos() {
  const promoIds = useSavePromoStore((s) => s.promoIds);
  const removePromoId = useSavePromoStore((s) => s.removePromoId);

  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchSavedPromos = async () => {
      if (!promoIds.length) {
        setPromos([]);
        return;
      }

      setLoading(true);
      try {
        const savedIds = promoIds.join(",");
        const url = `${process.env.NEXT_PUBLIC_API_URL}/promotions?savedIds=${savedIds}`;
        const res = await axios.get(url);

        const mapped: Promotion[] = res.data.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          idPromotion: item.idPromotion,
          infoPromo: item.infoPromo,
          weekDay: item.weekDay,
          relevance: item.relevance,
          codeCity: item.codeCity,
          expirationDate: item.expirationDate,
          urlPromotion: item.urlPromotion,
          Categoria: item.Categoria,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          publishedAt: item.publishedAt,
          restaurant: {
            id: item.restaurant?.id ?? 0,
            documentId: item.restaurant?.documentId ?? "sin-id",
          },
        }));

        setPromos(mapped);
      } catch (err) {
        console.error("Error fetching saved promos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPromos();
  }, [promoIds]);

  const toggleExpanded = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const removeItem = (id: number) => {
    removePromoId(id); // Remove from Zustand
    setPromos((prev) => prev.filter((promo) => promo.id !== id)); // Remove from local state
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Promos Guardadas</h1>

      {loading && <p>Cargando...</p>}

      {!loading && promos.length === 0 && (
        <p className="text-gray-500">No hay promociones guardadas.</p>
      )}

      {!loading && promos.length > 0 && (
        <>
          {/* Landscape - table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="border-b border-black">
                  <th>Imagen</th>
                  <th>Promoción</th>
                  <th>Expira</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((promo) => (
                  <tr key={promo.id} className="border-b border-black">
                    <td>
                      <div className="w-20 h-20 rounded">
                        <img
                          src={promo.urlPromotion || "/placeholder.svg"}
                          alt={promo.infoPromo}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                    </td>
                    <td>{promo.infoPromo}</td>
                    <td>{new Date(promo.expirationDate).toLocaleDateString("es-ES")}</td>
                    <td>
                      <button
                        onClick={() => removeItem(promo.id)}
                        className="btn btn-ghost btn-sm text-customOrange"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Portrait - collapsible cards */}
          <div className="md:hidden space-y-3">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="collapse collapse-arrow bg-base-100 border border-black rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={expanded[promo.id] || false}
                  onChange={() => toggleExpanded(promo.id)}
                  className="min-h-0"
                />
                <div className="collapse-title p-4 flex items-center gap-4">
                  <img
                    src={promo.urlPromotion || "/placeholder.svg"}
                    alt={promo.infoPromo}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{promo.infoPromo}</h3>
                    <p className="text-sm">
                      Expira: {new Date(promo.expirationDate).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>

                <div className="collapse-content px-4 pb-4">
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => removeItem(promo.id)}
                      className="btn btn-outline btn-sm text-customOrange border-customOrange hover:bg-customOrange hover:text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
