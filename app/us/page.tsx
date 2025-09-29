"use client";
import React from "react";
import Link from "next/link";

const Nosotros = () => {
  return (
    <div className="mx-auto">
      {/* Sección superior más compacta */}
      <div className="flex flex-wrap md:flex-row flex-col items-center gap-6 min-h-60">
        <div className="flex-1 text-center md:text-left pl-28 landscape:text-3xl portrait:text-xl tracking-widest">
          SI TU PROMOCIÓN NO ESTÁ AQUÍ,&nbsp; NO ESTÁ DONDE IMPORTA
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="assets/usicon.png"
            alt=""
            className="md:max-w-[300px] h-auto"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {/* Plan 499 */}
        <div className="border-2 border-black w-72 md:w-80 p-4">
          <div className="flex flex-row-reverse">
            <p>por mes.</p>
          </div>
          <div className="flex items-start font-bold pl-4 roboto-mono-font">
            <span className="text-2xl align-super">$</span>
            <p className="text-6xl">990</p>
          </div>
          <p className="text-justify mt-4">
            Para emprendedores y negocios que están arrancando y quieren
            comenzar a vender.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/plan-table">
              <button className="bg-black text-white p-2">ENTRA AL MAPA</button>
            </Link>
          </div>
        </div>

        {/* Plan 799 */}
        <div className="w-72 md:w-80 p-4 bg-orange-500 text-white">
          <div className="flex flex-row-reverse">
            <p>por mes.</p>
          </div>
          <div className="flex items-start font-bold pl-4 roboto-mono-font">
            <span className="text-2xl align-super">$</span>
            <p className="text-6xl">1490</p>
          </div>
          <p className="text-justify mt-4">
            Para negocios con ventas que buscan destacar entre la competencia.
          </p>
          <div className="flex justify-center pt-12">
            <Link href="/plan-table">
              <button className="bg-white text-black p-2">
                MARCA TU TERRITORIO
              </button>
            </Link>
          </div>
        </div>

        {/* Plan 1200 */}
        <div className="border-2 border-black w-72 md:w-80 p-4">
          <div className="flex flex-row-reverse">
            <p>por mes.</p>
          </div>
          <div className="flex items-start font-bold pl-4 roboto-mono-font">
            <span className="text-2xl align-super">$</span>
            <p className="text-6xl">7890</p>
          </div>
          <p className="text-justify mt-4">
            Para líderes empresarios que buscan la atención de su categoría.
          </p>
          <div className="flex justify-center pt-12">
            <Link href="/plan-table">
              <button className="bg-black text-white p-2">
                REY DE LA CUADRA
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-4"></div>
      {/* Texto y misión */}
      <div className="p-8">
      <h2 className="text-2xl text-customor font-bold">
        "Al mal tiempo, buena comida"
      </h2>
      <p>
        De Etiqueta es una empresa orgullosamente veracruzana dedicada a mejorar
        tu experiencia de compra. Nos especializamos en recopilar y ofrecerte
        los descuentos más exclusivos del día para que disfrutes de tus comidas
        favoritas sin romper tu presupuesto. Ya sea que prefieras pedir comida
        para llevar o necesites un almuerzo rápido, estamos aquí para ayudarte a
        encontrar la mejor oferta del día.
      </p>
      <br />
      <p>
        Nuestra página se actualiza continuamente, lo que significa que siempre
        encontrarás algo nuevo y emocionante. Las promociones cambian
        diariamente, así que cada visita es una nueva oportunidad para descubrir
        grandes ahorros y probar algo diferente.
      </p>
      <br />
      <h2 className="text-2xl text-customor font-bold">MISIÓN</h2>
      <p>
        Estamos comprometidos en brindar una experiencia satisfactoria y
        conveniente tanto para consumidores como para restauranteros.
        ¡Contáctanos y déjanos ser tu mejor aliado en la búsqueda de grandes
        descuentos y deliciosas comidas!
      </p>
      </div>
    </div>
  );
};

export default Nosotros;
