import React from "react";

const yesIcon = "https://images.vexels.com/media/users/3/217884/isolated/preview/e3e9cccfbb03979574653e56a5a677c6-icono-de-doodle-de-marca-de-verificacion.png";

const paquetes = [
  { detalle: "Precio", "ENTRA AL MAPA": "649", "MARCA TU TERRITORIO": "849", "REY DE LA CUADRA": "1249" },
  { detalle: "Público Objetivo", "ENTRA AL MAPA": "EMPRENDEDORES", "MARCA TU TERRITORIO": "RESTAURANTES CON FLUJO DE VENTAS", "REY DE LA CUADRA": "RESTAURANTES CONSOLIDADOS" },
  { detalle: "Fotografía Profesional", "ENTRA AL MAPA": "(3 FOTOS) = 30 MIN DE SESIÓN", "MARCA TU TERRITORIO": "(5 FOTOS) = 45 MIN DE SESIÓN", "REY DE LA CUADRA": "(7 FOTOS) = 1 HR DE SESIÓN" },
  { detalle: "Visibilidad en Sitio Web", "ENTRA AL MAPA": yesIcon, "MARCA TU TERRITORIO": yesIcon, "REY DE LA CUADRA": yesIcon },
  { detalle: "Diseño Gráfico", "ENTRA AL MAPA": yesIcon, "MARCA TU TERRITORIO": yesIcon, "REY DE LA CUADRA": yesIcon },
  { detalle: "Publicidad Pagada", "ENTRA AL MAPA": "", "MARCA TU TERRITORIO": yesIcon, "REY DE LA CUADRA": yesIcon },
  { detalle: "Menú Completo", "ENTRA AL MAPA": "", "MARCA TU TERRITORIO": "", "REY DE LA CUADRA": "" }
];

const PaquetesTable = () => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full rounded-lg text-black">
        <thead>
          <tr className="border-b border-gray-900">
            <th className="p-2 border-r border-gray-900 text-left">Detalles</th>
            <th className="p-2 border-l border-r border-gray-900 text-left">ENTRA AL MAPA</th>
            <th className="p-2 border-l border-r border-gray-900 text-left">MARCA TU TERRITORIO</th>
            <th className="p-2 border-l border-gray-900 text-left">REY DE LA CUADRA</th>
          </tr>
        </thead>
        <tbody>
          {paquetes.map((p, index) => (
            <tr key={index} className="border-b border-gray-900">
              <td className="p-2 font-bold border-r border-gray-900">{p.detalle}</td>
              <td className="p-2 border-r border-gray-900 text-center">{p["ENTRA AL MAPA"].includes("https") ? <img src={p["ENTRA AL MAPA"]} alt="Yes" width={20} height={20} className="mx-auto" /> : p["ENTRA AL MAPA"]}</td>
              <td className="p-2 border-r border-gray-900 text-center">{p["MARCA TU TERRITORIO"].includes("https") ? <img src={p["MARCA TU TERRITORIO"]} alt="Yes" width={20} height={20} className="mx-auto" /> : p["MARCA TU TERRITORIO"]}</td>
              <td className="p-2 text-center">{p["REY DE LA CUADRA"].includes("https") ? <img src={p["REY DE LA CUADRA"]} alt="Yes" width={20} height={20} className="mx-auto" /> : p["REY DE LA CUADRA"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaquetesTable;