'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LucideLink, Facebook, Instagram } from 'lucide-react';

type Promotion = {
  id: number;
  documentId: string;
  infoPromo: string;
  weekDay: number;
  relevance: number;
  codeCity: number;
  expirationDate: string;
  urlPromotion?: string;
  Categoria: string;
  restaurant: { id: number; documentId: string; nombre: string };
};

export default function RestaurantProfile() {
  const params = useParams();
  const restaurantId = Array.isArray(params?.restaurantId)
    ? params.restaurantId[0]
    : (params?.restaurantId as string | undefined);

  const [restaurant, setRestaurant] = useState<any>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    if (!restaurantId) return;

    const API = process.env.NEXT_PUBLIC_API_URL;

    const fetchRestaurant = async () => {
      const res = await fetch(`${API}/restaurants/${restaurantId}`);
      const json = await res.json();
      setRestaurant(json.data);
    };

    const fetchPromotions = async () => {
      // Only this restaurant’s promotions:
      // filters[restaurant][documentId][$eq]=<restaurantId>
      const url =
        `${API}/promotions` +
        `?filters[restaurant][documentId][$eq]=${encodeURIComponent(restaurantId)}` +
        `&populate[restaurant][fields][0]=documentId` +
        `&populate[restaurant][fields][1]=nombre`;
      const res = await fetch(url);
      const json = await res.json();
      setPromotions(json.data ?? []);
    };

    fetchRestaurant();
    fetchPromotions();
  }, [restaurantId]);

  if (!restaurant) return <div className="p-4">Cargando...</div>;

  const {
    background,
    thumbnail,
    nombre,
    ubicacion,
    facebook,
    instagram,
    paginaPersonal,
    Descripcion,
  } = restaurant;

  return (
    <div className="flex flex-col min-h-screen bg-white ">
      {/* Profile Card */}
      <div className="mx-4 mb-4 bg-gray-200 rounded-3xl overflow-hidden">
        {/* Banner */}
        <div
          className="h-44 relative"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Info */}
        <div className="px-6 pb-6 relative">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full p-2">
                <img
                  src={thumbnail}
                  alt="Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Etiqueta Button */}
          <div className="flex justify-end mt-4">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full">
              Etiqueta
            </button>
          </div>

          {/* Nombre */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold">{nombre}</h2>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-gray-500">
              {Descripcion ?? '*Este restaurante aún no tiene descripción disponible.*'}
            </p>
          </div>

           {/* Social Links */}
          <div className="flex mt-6 gap-4">
            {paginaPersonal && (
              <a
                href={paginaPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-full"
              >
                <LucideLink size={20} />
              </a>
            )}
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-full"
              >
                <Facebook size={20} />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-full"
              >
                <Instagram size={20} />
              </a>
            )}
          </div>

          {/* Promotions */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-2 place-items-center">
            {promotions.length === 0 ? (
              <div className="col-span-2 text-gray-500">Sin promociones activas.</div>
            ) : (
              promotions.map((p) => (
                <article
                  key={p.id}
                  className="bg-white rounded-2xl p-3 flex flex-col shadow-sm border border-border portrait:max-w-48 landscape:max-w-64"
                >
                  {/* Image container with fixed ratio */}
                  <div className="aspect-[4/5] w-full bg-gray-100 rounded-lg mb-2 overflow-hidden">
                    <img
                      src={p.urlPromotion || "/placeholder.svg"}
                      alt={p.infoPromo}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="font-medium text-sm line-clamp-2">{p.infoPromo}</h3>
                  <div className="text-xs text-gray-500 mt-1">
                    Vence: {new Date(p.expirationDate).toLocaleDateString()}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Location Link */}
      {ubicacion && (
        <div className="flex justify-center mb-8">
          <a
            href={ubicacion}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-100 p-3 rounded-full shadow"
          >
            {/* ...pin svg... */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 13c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3Z" stroke="black" strokeWidth="2" />
              <path d="M12 21c4-4 8-7.582 8-11 0-4.418-3.582-8-8-8S4 5.582 4 10c0 3.418 4 7 8 11Z" stroke="black" strokeWidth="2" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

