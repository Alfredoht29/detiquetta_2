"use client"

import type React from "react"
import { useState } from "react"
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react"

type PlanKey = "ENTRA AL MAPA" | "MARCA TU TERRITORIO" | "REY DE LA CUADRA"

interface Paquete {
  detalle: string
  "ENTRA AL MAPA": string | boolean
  "MARCA TU TERRITORIO": string | boolean
  "REY DE LA CUADRA": string | boolean
}

const paquetes: Paquete[] = [
  { detalle: "Precio", "ENTRA AL MAPA": "499", "MARCA TU TERRITORIO": "799", "REY DE LA CUADRA": "1,200" },
  {
    detalle: "Público Objetivo",
    "ENTRA AL MAPA": "Para emprendedores y negocios que están arrancando y quieren comenzar a vender.",
    "MARCA TU TERRITORIO": "Para negocios con ventas que buscan destacar entre la competencia.",
    "REY DE LA CUADRA": "Para líderes empresarios que buscan la atención de su categoría.",
  },
  {
    detalle: "Fotografía Profesional",
    "ENTRA AL MAPA": "(3 FOTOS) = 30 MIN DE SESIÓN",
    "MARCA TU TERRITORIO": "(5 FOTOS) = 45 MIN DE SESIÓN",
    "REY DE LA CUADRA": "(7 FOTOS) = 1 HR DE SESIÓN",
  },
  {
    detalle: "Visibilidad en Sitio Web",
    "ENTRA AL MAPA": true,
    "MARCA TU TERRITORIO": true,
    "REY DE LA CUADRA": true,
  },
  {
    detalle: "Diseño Gráfico",
    "ENTRA AL MAPA": true,
    "MARCA TU TERRITORIO": true,
    "REY DE LA CUADRA": true,
  },
  {
    detalle: "Publicidad Pagada",
    "ENTRA AL MAPA": false,
    "MARCA TU TERRITORIO": true,
    "REY DE LA CUADRA": true,
  },
  {
    detalle: "Menú Completo",
    "ENTRA AL MAPA": false,
    "MARCA TU TERRITORIO": false,
    "REY DE LA CUADRA": true,
  },
  {
    detalle: "Estadísticas",
    "ENTRA AL MAPA": false,
    "MARCA TU TERRITORIO": true,
    "REY DE LA CUADRA": true,
  },
]

// Type the function to accept a string | boolean value and a boolean for isOrangeColumn
const renderCellContent = (value: string | boolean, isOrangeColumn: boolean) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`w-6 h-6 ${isOrangeColumn ? "text-white" : "text-black"} mx-auto`} />
    ) : (
      <X className={`w-6 h-6 ${isOrangeColumn ? "text-white" : "text-black"} mx-auto`} />
    )
  }
  return value // if it's a string, just render it
}

// Mobile card component for portrait mode
const MobileCard: React.FC = () => {
  const [activePlanIndex, setActivePlanIndex] = useState(1) // Default to middle plan
  const planKeys: PlanKey[] = ["ENTRA AL MAPA", "MARCA TU TERRITORIO", "REY DE LA CUADRA"]
  const activePlan = planKeys[activePlanIndex]

  const handlePrevPlan = () => {
    setActivePlanIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextPlan = () => {
    setActivePlanIndex((prev) => (prev < planKeys.length - 1 ? prev + 1 : prev))
  }

  const isOrangeCard = activePlanIndex === 1

  return (
    <div className="w-full p-4">
      {/* Navigation controls */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevPlan}
          disabled={activePlanIndex === 0}
          className={`p-2 ${activePlanIndex === 0 ? "text-gray-400" : "text-black"}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center font-bold text-lg">{activePlan}</div>
        <button
          onClick={handleNextPlan}
          disabled={activePlanIndex === planKeys.length - 1}
          className={`p-2 ${activePlanIndex === planKeys.length - 1 ? "text-gray-400" : "text-black"}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Card content */}
      <div
        className={`rounded-lg overflow-hidden shadow-lg ${isOrangeCard ? "bg-orange-500 text-white" : "bg-white text-black border-2 border-black"}`}
      >
        {/* Price header */}
        <div className="p-6 text-center">
          <div className="flex flex-row-reverse w-full">
            <p className="text-sm">por mes.</p>
          </div>
          <div className="flex items-start justify-center font-bold roboto-mono-font">
            <span className="text-2xl align-super">$</span>
            <p className="text-6xl">{paquetes[0][activePlan]}</p>
          </div>
          <p className="text-sm mt-2 text-center px-4">{paquetes[1][activePlan]}</p>
          <button className={`mt-4 p-2 px-4 ${isOrangeCard ? "bg-white text-black" : "bg-black text-white"}`}>
            {activePlan}
          </button>
        </div>

        {/* Features list */}
        <div className={`${isOrangeCard ? "bg-orange-500" : "bg-gray-50"} p-4`}>
          {paquetes.slice(2).map((row, index) => (
            <div key={index} className={`flex justify-between p-3 ${index % 2 === 0 ? "bg-opacity-10 bg-black" : ""}`}>
              <div className="font-semibold">{row.detalle}</div>
              <div className="flex items-center justify-center">
                {typeof row[activePlan] === "boolean" ? (
                  row[activePlan] ? (
                    <Check className={`w-6 h-6 ${isOrangeCard ? "text-white" : "text-black"}`} />
                  ) : (
                    <X className={`w-6 h-6 ${isOrangeCard ? "text-white" : "text-black"}`} />
                  )
                ) : (
                  <span>{row[activePlan]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PaquetesTable: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Desktop table - hidden on small screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-2 border-black bg-white text-black">
                <div className="text-left font-bold">Detalles</div>
              </th>
              {/* Map over the plan keys to generate columns */}
              {["ENTRA AL MAPA", "MARCA TU TERRITORIO", "REY DE LA CUADRA"].map((plan, index) => (
                <th
                  key={index}
                  className={`p-4 ${
                    index === 1 ? "bg-orange-500 text-white" : "bg-white text-black border-2 border-black"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row-reverse w-full">
                      <p className="text-sm">por mes.</p>
                    </div>
                    <div className="flex items-start font-bold roboto-mono-font">
                      <span className="text-2xl align-super">$</span>
                      <p className="text-6xl">{paquetes[0][plan as PlanKey]}</p>
                    </div>
                    <p className="text-sm mt-2 text-center h-20 overflow-hidden">{paquetes[1][plan as PlanKey]}</p>
                    <button className={`mt-4 p-2 ${index === 1 ? "bg-white text-black" : "bg-black text-white"}`}>
                      {plan}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Skip the first two rows (pricing and public objective),
                render the rest as feature rows */}
            {paquetes.slice(2).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="p-4 border border-gray-300 font-semibold">{row.detalle}</td>
                {["ENTRA AL MAPA", "MARCA TU TERRITORIO", "REY DE LA CUADRA"].map((plan, planIndex) => (
                  <td
                    key={planIndex}
                    className={`p-4 border border-gray-300 text-center ${
                      planIndex === 1 ? "bg-orange-500 text-white" : ""
                    }`}
                  >
                    {renderCellContent(row[plan as PlanKey], planIndex === 1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view - only visible on small screens */}
      <div className="md:hidden">
        <MobileCard />
      </div>
    </div>
  )
}

export default PaquetesTable

