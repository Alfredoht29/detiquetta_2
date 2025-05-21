'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LucideLink, Facebook, Instagram } from 'lucide-react';

export default function RestaurantProfile() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${restaurantId}`);
        const data = await res.json();
        setRestaurant(data.data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
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
    <div className="flex flex-col min-h-screen bg-white">
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
        ></div>

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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
            <p className="text-gray-700">@rest.{restaurant.documentId}</p>
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

          {/* Description */}
          <div className="mt-6">
            <p className="text-gray-500">
              {Descripcion ?? '*Este restaurante aún no tiene descripción disponible.*'}
            </p>
          </div>

          {/* Image Gallery Placeholder */}
          <div className="flex gap-2 mt-6">
            <button className="bg-white w-20 h-20 rounded-2xl" />
            <button className="bg-white w-20 h-20 rounded-2xl" />
            <button className="bg-white w-20 h-20 rounded-2xl" />
            <button className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5V19" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Location Pin as Link */}
      {ubicacion && (
        <div className="flex justify-center mb-8">
          <a
            href={ubicacion}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-100 p-3 rounded-full shadow"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="black"
                strokeWidth="2"
              />
              <path
                d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
