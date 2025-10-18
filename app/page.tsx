"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Store, CircleX,MessageCircle} from "lucide-react";
import Link from "next/link";
import { useLocationStore } from "../app/stores/useLocationStore";
import useSavePromoStore from "./stores/savePromoStore";
import { Promotion } from "./interfaces/promotion";
import { Location } from "./interfaces/location";
import Wish from "./components/Wish";

export default function Home() {
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDay, setSelectedDay] = useState(
    new Date().getDay().toString()
  );

  const promoIds = useSavePromoStore((s) => s.promoIds);
  const addPromoId = useSavePromoStore((s) => s.addPromoId);
  const removePromoId = useSavePromoStore((s) => s.removePromoId);

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
  const openWhatsApp = (phoneNumber: string, promoInfo: string) => {
    const message = `Hola! Estoy interesado en la promoción: ${promoInfo}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      if (!selectedLocation) return;

      setLoading(true);
      try {
        const params: Record<string, string> = {
          codeCity: selectedLocation.codecity.toString(),
        };

        if (selectedDay !== "") {
          params.weekDay = selectedDay;
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/promotions`, { params })

        const mappedPromos: Promotion[] = res.data.data
          .filter((item: any) => item.relevance === 1)
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
          }));

        setPromotions(mappedPromos);
      } catch (err) {
        console.error("Error fetching promotions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [selectedDay,selectedLocation]);

  if (selectedPromo) {
    return (
      <div className="h-full pb-4 overflow-y-auto no-scrollbar flex items-center justify-center">
        <div className="w-screen">
          <div className="landscape:w-1/2 landscape:mx-auto landscape:mt-20  flex flex-col items-center justify-center p-4 border rounded-lg shadow-lg">
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
                  <MessageCircle className="w-7 h-7" />
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
        </div>
      </div>
    );
  }

  return (
    <div className="carousel w-full h-[83vh] md:h-screen">
      <div id="slide1" className="carousel-item w-full">
        <div className="hero bg-base-200 h-full">
          <div className="hero-content text-center max-w-4xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold">
                {selectedLocation
                  ? `Promociones en ${selectedLocation.name}`
                  : "¡Bienvenido!"}
              </h1>
              <p className="py-6 text-3xl">
                Las mejores promociones en la mejor aplicación
              </p>
              <div className="portrait:hidden absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="slide2" className="carousel-item w-full">
        <div className="h-full mx-auto overflow-y-auto no-scrollbar flex items-center justify-center">
          <div className="max-h-full p-4">
            <h2 className="text-2xl font-bold mb-4">Promociones Destacadas</h2>
            <select
              className="select select-bordered w-full max-w-xs mb-8"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {daysOfWeek.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div className="flex flex-col w-52 gap-4" key={index}>
                      <div className="skeleton h-52 w-full"></div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
                {promotions.map((promo) => {
                  const saved = promoIds.includes(promo.id);
                  return (
                    <div
                      key={promo.id}
                      className="relative w-3/4 flex flex-col rounded-lg border-2 border-solid border-black overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                      <div className="relative aspect-[2/3] bg-gray-100">
                        <img
                          src={promo.urlPromotion || "/placeholder.svg"}
                          alt={promo.infoPromo}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-grow p-3">
                        <h3 className="font-extrabold text-md">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
