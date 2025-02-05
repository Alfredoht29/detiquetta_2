"use client";

import React, { useState, useEffect } from "react";
import DateInput from "../components/DateInput";
import TimeInput from "../components/TimeInput";
import styles from "../styles/reserve.module.css";
import { isMobileSafari } from "../utils/browserDetection"; // Import the helper function

export default function Reserve() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isMobileSafariBrowser, setIsMobileSafariBrowser] = useState(false);

  useEffect(() => {
    // Detect if the browser is mobile Safari
    setIsMobileSafariBrowser(isMobileSafari());
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <div className={`${styles.overlayContent} space-y-4`}>
        <h2 className="text-2xl font-bold mb-4">Reserva tu mesa</h2>

        {/* Restaurant Select Dropdown */}
        <div className="bg-white p-2 rounded">
          <select
            id="restaurant-select"
            name="restaurant"
            className="w-full p-3 rounded text-lg text-customor bg-white focus:outline-none focus:ring-2 focus:ring-customOrange"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un restaurante...
            </option>
            <option value="rest1">Restaurante El Buen Sabor</option>
            <option value="rest2">La Cocina Mexicana</option>
            <option value="rest3">Sushi Master</option>
            <option value="rest4">Pizzeria Da Luigi</option>
            <option value="rest5">Tacos Los Hermanos</option>
            <option value="rest6">Steakhouse Grill</option>
          </select>
        </div>

        {/* Form Inputs */}
        <input
          type="tel"
          placeholder="Número Telefónico"
          className="text-lg text-customor placeholder:text-customor rounded bg-white p-4 w-full"
          pattern="[0-9]*"
          inputMode="numeric"
        />
        <input
          type="number"
          placeholder="Número de personas"
          className="text-lg text-customor placeholder:text-customor rounded bg-white p-4 w-full"
          min={1}
          max={10}
        />
        <input
          type="text"
          placeholder="Nombre"
          className="text-lg text-customor placeholder:text-customor rounded bg-white p-4 w-full"
        />

        {/* Fecha Input */}
        <div>
          {isMobileSafariBrowser ? (
            <DateInput label="Fecha" value={date} onChange={setDate} />
          ) : (
            <div>
              <label htmlFor="fecha" className="block text-lg text-customor mb-2">
                Fecha
              </label>
              <input
                id="fecha"
                type="date"
                className="text-lg text-customor placeholder:text-customor rounded bg-white p-4 w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Horario Input */}
        <div>
          {isMobileSafariBrowser ? (
            <TimeInput
              label="Horario"
              value={time}
              onChange={setTime}
              id="horario-input" // Ensure unique ID
            />
          ) : (
            <div>
              <label htmlFor="horario" className="block text-lg text-customor mb-2">
                Horario
              </label>
              <input
                id="horario"
                type="time"
                className="text-lg text-customor placeholder:text-customor rounded bg-white p-4 w-full"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          )}
        </div>

        <button className="w-full bg-customOrange text-white font-bold py-3 px-4 rounded hover:bg-opacity-90 transition-colors">
          Reservar
        </button>
      </div>
    </div>
  );
}
