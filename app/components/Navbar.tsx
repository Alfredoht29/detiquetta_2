"use client";
import Link from "next/link";
import Image from "next/image";
import { useNavbar } from "../stores/navBarStore";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { usePathname } from "next/navigation";
import { useLocationStore } from "../stores/useLocationStore";

const Navbar = () => {
  const pathname = usePathname();
  const { showNavbar } = useNavbar();
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const calculateCountdown = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeRemaining = midnight.getTime() - now.getTime();
    const remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const remainingMinutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const remainingSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    setHours(remainingHours);
    setMinutes(remainingMinutes);
    setSeconds(remainingSeconds);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const { selectedLocation, setSelectedLocation } = useLocationStore();
  const locations = ["Location 1", "Location 2", "Location 3"];

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLocation(event.target.value);
  };

  if (!showNavbar) return null;

  return (
    <nav className="sticky top-0 z-10 bg-white">
      <div className="hidden md:flex justify-between items-center w-full">
        <div className="ml-12 flex-none flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pt-7"
          >
            <Image
              src="/assets/fb.svg"
              alt="Facebook Icon"
              width={50}
              height={50}
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pt-7"
          >
            <Image
              src="/assets/ig.svg"
              alt="Instagram Icon"
              width={50}
              height={50}
            />
          </a>
        </div>

        <div className="flex">
          <Image
            src="/assets/detiquetalogo.png"
            alt="detiqueta logo"
            width={322}
            height={90}
            className="ml-20"
          />
        </div>

        <div className="flex items-center pt-7 px-2">
          <div className="detiqueta-searchbar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#E73D00"
              className="h-5 w-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              className="w-48 p-2 border-none focus:outline-none"
              placeholder="Busca"
            />
            <button className="btn-orange ml-2">Búsqueda</button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 sm:px-2 lg:px-8">
        <div className="hidden md:flex h-16">
          <Link
            href="/"
            className={`${pathname === "/" ? "nav-active" : "nav-def"} py-2`}
          >
            INICIO
          </Link>

          <Link
            href="/menu"
            className={`${
              pathname === "/menu" ? "nav-cactive" : "nav-cdef"
            } py-2`}
          >
            <span className="countdown font-mono text-xl">
              <span style={{ "--value": hours } as React.CSSProperties}></span>h
              <span
                style={{ "--value": minutes } as React.CSSProperties}
              ></span>
              m
              <span
                style={{ "--value": seconds } as React.CSSProperties}
              ></span>
              s
            </span>
          </Link>

          <Link
            href="/us"
            className={`${pathname === "/us" ? "nav-active" : "nav-def"} py-2`}
          >
            NOSOTROS
          </Link>

          <Link
            href="/reserve"
            className={`${
              pathname === "/reserve" ? "nav-active" : "nav-def"
            } py-2`}
          >
            RESERVAR
          </Link>

          <Link
            href="/clients"
            className={`${
              pathname === "/clients" ? "nav-active" : "nav-def"
            } py-2`}
          >
            CLIENTES
          </Link>

          <Link
            href="/cart"
            className={`${
              pathname === "/cart" ? "nav-active" : "nav-def"
            } py-2`}
          >
            CARRITO
          </Link>
          <button className="nav-def2 pb-2" onClick={()=>(document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}>UBICACION</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex justify-center md:hidden items-center">
          <div className="mt-14 mr-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="h-8 w-8" />
              ) : (
                <MenuIcon className="h-8 w-8" />
              )}
            </button>
          </div>
          <div className="pt-6">
            <Image
              src="/assets/detiquetalogo.png"
              alt="detiqueta logo"
              width={322}
              height={90}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/"
                  ? "text-customor"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              INICIO
            </Link>
            <Link
              href="/menu"
              className={
                "block px-3 py-2 rounded-md text-base font-medium text-customred"
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="countdown font-mono text-xl">
                <span
                  style={{ "--value": hours } as React.CSSProperties}
                ></span>
                h
                <span
                  style={{ "--value": minutes } as React.CSSProperties}
                ></span>
                m
                <span
                  style={{ "--value": seconds } as React.CSSProperties}
                ></span>
                s
              </span>
            </Link>
            <Link
              href="/us"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/us"
                  ? "text-customor"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              NOSOTROS
            </Link>
            <Link
              href="/reserve"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/reserve"
                  ? "text-customor"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              RESERVAR
            </Link>
            <Link
              href="/clients"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/clients"
                  ? "text-customor"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              CLIENTES
            </Link>
            <Link
              href="/cart"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/cart"
                  ? "text-customor"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              CARRITO
            </Link>
            <span
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer`}
              onClick={() => {
                const modal = document.getElementById('my_modal_5');
                if (modal) {
                  (modal as HTMLDialogElement).showModal();
                }
                setIsOpen(false);
              }}
            >
              UBICACION
            </span>
          </div>
        </div>
      )}
         <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Selecciona tu ciudad</h3>
                <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="select select-primary w-full max-w-xs"
            >
              <option value="" disabled>
                UBICACION
              </option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
    </nav>
  );
};

export default Navbar;
