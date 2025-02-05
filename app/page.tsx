"use client";

import React from 'react';
import { useLocationStore } from '../app/stores/useLocationStore';

export default function Home() {
  const skeletons = Array(6).fill(0);
  const selectedLocation = useLocationStore((state) => state.selectedLocation);

  return (
    <div className="carousel w-full h-[83vh] md:h-screen">
      <div className="carousel-item w-full">
        <div className="hero bg-base-200 h-full">
          <div className="hero-content text-center max-w-4xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold">
                {selectedLocation ? `${selectedLocation}` : '!'}
              </h1>
              <p className="py-6 text-3xl">
                Las mejores promociones en la mejor aplicación
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-item w-full">
        <div className="h-full mx-auto overflow-y-auto no-scrollbar flex items-center justify-center">
          <div className="max-h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
              {skeletons.map((_, index) => (
                <div className="flex flex-col w-52 gap-4" key={index}>
                  <div className="skeleton h-52 w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
