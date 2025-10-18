"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { CircleX, Heart, Store, MessageCircle } from "lucide-react";
import useSavePromoStore from "../stores/savePromoStore";
import { useLocationStore } from "../stores/useLocationStore";
import { Promotion } from "../interfaces/promotion";
import Image from "next/image";
import Wish from "../components/Wish";

const daysOfWeek = [
  { label: "Todos los días", value: "" },
  { label: "Domingo", value: "0" },
  { label: "Lunes", value: "1" },
  { label: "Martes", value: "2" },
  { label: "Miércoles", value: "3" },
  { label: "Jueves", value: "4" },
  { label: "Viernes", value: "5" },
  { label: "Sábado", value: "6" },
];

const Page: React.FC = () => {
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDay, setSelectedDay] = useState(
    new Date().getDay().toString()
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const promoIds = useSavePromoStore((s) => s.promoIds);
  const addPromoId = useSavePromoStore((s) => s.addPromoId);
  const removePromoId = useSavePromoStore((s) => s.removePromoId);

  const openWhatsApp = (phoneNumber: string, promoInfo: string) => {
    const message = `Hola! Estoy interesado en la promoción: ${promoInfo}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPromos = async () => {
      if (!selectedLocation) return;

      setLoading(true);
      try {
        const params: Record<string, string> = {
          codeCity: selectedLocation.codecity.toString(),
        };

        if (selectedDay !== "") {
          params.weekDay = selectedDay;
        }

        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/promotions`,
          { params }
        );

        //
        const mapped: Promotion[] = resp.data.data
          .map((item: any) => ({
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
            restaurant: item.restaurant ?? {
              id: 0,
              documentId: "",
              nombre: "",
              delivery_num: "",
            },
          }))
          .sort(
            (a: { relevance: number }, b: { relevance: number }) =>
              a.relevance - b.relevance
          );

        setPromotions(mapped);
      } catch (err) {
        console.error("Error fetching promos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, [selectedDay, selectedLocation]);

  const filtered = promotions
    .filter((p) => !selectedCategory || p.Categoria === selectedCategory)
    .sort((a, b) => a.relevance - b.relevance);

  const categories = Array.from(new Set(promotions.map((p) => p.Categoria)));

  return (
    <div className="h-full pb-4 overflow-y-auto no-scrollbar flex items-center justify-center">
      <div className="w-screen">
        {selectedPromo ? (
          <div className="landscape:mx-auto landscape:mt-20 flex flex-col items-center justify-center p-4 border rounded-lg shadow-lg">
            <img
              src={selectedPromo.urlPromotion}
              alt="Promo"
              className="w-3/5 object-cover rounded-lg mb-6"
            />

            <div className="p-6 border rounded-lg shadow-sm text-center w-1/2">
              <h2 className="text-2xl font-bold">{selectedPromo.infoPromo}</h2>
              <p className="text-gray-600 mt-2">
                Expira:{" "}
                {new Date(selectedPromo.expirationDate).toLocaleDateString(
                  "es-ES"
                )}
              </p>

              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="bg-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center"
                  onClick={() => setSelectedPromo(null)}
                >
                  <CircleX className="w-7 h-7" />
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center"
                  onClick={() =>
                    openWhatsApp(
                      selectedPromo.restaurant.delivery_num,
                      selectedPromo.infoPromo
                    )
                  }
                >
                  <Image
                    src={"assets/compra.svg"}
                    alt={"compra"}
                    width={40}
                    height={40}
                  />
                </button>
                <Link
                  href={`/restaurant/${selectedPromo.restaurant.documentId}`}
                >
                  <button className="bg-[#EE733B] text-white w-14 h-14 rounded-full flex items-center justify-center">
                    <Store className="w-7 h-7" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full p-2 px-8 ml-4">
            <h2 className="text-2xl font-bold mb-4">Promociones</h2>
            <div className="flex gap-4 mb-4">
              {/* Optional category selector */}
              {/* <select
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
              </select> */}
            </div>
            <div
              ref={containerRef}
              className="h-[80vh] overflow-y-auto p-4 relative"
            >
              {loading ? (
                <div className="grid portrait:grid-cols-1 landscape:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-44 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid portrait:grid-cols-1 landscape:grid-cols-4 mx-auto gap-4 place-items-center">
                  {filtered.map((promo) => {
                    const saved = promoIds.includes(promo.id);
                    return (
                      <div
                        key={promo.id}
                        className="relative flex flex-col rounded-lg  w-3/4 border-2 border-solid border-black overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                      >
                        <div className="relative aspect-[2/3] bg-gray-100">
                          <img
                            src={promo.urlPromotion || "/placeholder.svg"}
                            alt={promo.infoPromo}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-grow p-3">
                          <h3 className="font-extrabold text-md decoration-4 line-clamp-2">
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
                              <Wish saved={saved} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={sentinelRef} className="h-8" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
