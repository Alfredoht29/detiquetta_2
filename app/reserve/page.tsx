"use client";

import React, { useState, useEffect } from "react";
import DateInput from "../components/DateInput";
import TimeInput from "../components/TimeInput";
import styles from "../styles/reserve.module.css";
import { isMobileSafari } from "../utils/browserDetection";
import { useLocationStore } from "../stores/useLocationStore";

async function fetchRestaurantsByCity(codeCity: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants?codeCity=${codeCity}`
  );
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export default function Reserve() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const [isMobileSafariBrowser, setIsMobileSafariBrowser] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { selectedLocation } = useLocationStore();

  useEffect(() => {
    setIsMobileSafariBrowser(isMobileSafari());
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadRestaurants = async () => {
      if (!selectedLocation) return;
      const data = await fetchRestaurantsByCity(selectedLocation.codecity);
      setRestaurants(data);
    };
    loadRestaurants();
  }, [selectedLocation]);

  const handleReserve = () => {
    if (!date || !time || !name || !numPeople || !selectedRestaurant) {
      alert("Completa todos los campos");
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = time;


    const payload = {
      To: selectedRestaurant,
      ContentVariables: JSON.stringify({
      "1": formattedDate,
      "2": formattedTime,
      "3": name.toUpperCase(),
      "4": String(numPeople),
    }),
    };

    console.log("Reservation JSON:", payload);


    fetch(`${process.env.NEXT_PUBLIC_N8N_WEBHOOK_RESERVATION_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log("Webhook response:", data))
      .catch(console.error);
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={`${styles.overlayContent} space-y-4`}>
        <h2 className="text-2xl font-bold mb-4">Reserva tu mesa</h2>

        {/* Restaurant select */}
        <div className="bg-white p-2 rounded">
          {!selectedLocation ? (
            <p className="text-customor">
              Selecciona una ubicación para ver restaurantes.
            </p>
          ) : (
            <select
              id="restaurant-select"
              className="w-full p-3 rounded text-lg text-customor bg-white focus:outline-none focus:ring-2 focus:ring-customOrange"
              value={selectedRestaurant || ""}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="" disabled>
                Selecciona un restaurante...
              </option>
              {restaurants.map((r) => (
                <option key={r.id} value={r.reservation_num}>
                  {r.nombre}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Number of people */}
        <input
          type="number"
          placeholder="Número de personas"
          className="text-lg text-customor placeholder:text-customor rounded bg-white p-4 w-full"
          min={1}
          max={10}
          value={numPeople}
          onChange={(e) => setNumPeople(parseInt(e.target.value))}
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Nombre"
          className="text-lg text-customor placeholder:text-customor rounded bg-white p-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
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
        </div>

        {/* Time */}
        {isMobileSafariBrowser ? (
          <TimeInput
            label="Horario"
            value={time}
            onChange={setTime}
            id="horario-input"
          />
        ) : (
          <div>
            <label
              htmlFor="horario"
              className="block text-lg text-customor mb-2"
            >
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

        <button
          onClick={handleReserve}
          className="w-full bg-customOrange text-white font-bold py-3 px-4 rounded hover:bg-opacity-90 transition-colors"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
