"use client";
import Link from "next/link";
import Image from "next/image";
import { useNavbar } from "../stores/navBarStore";
import { useState, useEffect, useRef } from "react";
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

  const menuRef = useRef<HTMLDivElement | null>(null); // Ref for the navbar menu
  const modalRef = useRef<HTMLDialogElement | null>(null); // Ref for the Ubicación modal

  const calculateCountdown = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeRemaining = midnight.getTime() - now.getTime();
    setHours(Math.floor(timeRemaining / (1000 * 60 * 60)));
    setMinutes(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((timeRemaining % (1000 * 60)) / 1000));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menu when clicking outside (except modal)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (modalRef.current?.contains(target)) return; // Ignore modal clicks
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const { selectedLocation, setSelectedLocation } = useLocationStore();
  const locations = ["Veracruz", "Boca del rio", "Xalapa"];

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  if (!showNavbar) return null;

  return (
    <nav className="sticky top-0 z-10 bg-white">
      <div className="hidden md:flex justify-between items-center w-full">
        <div className="flex-1 flex justify-start">
          <div className="ml-12 flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="pt-7">
              <Image src="/assets/fb.svg" alt="Facebook Icon" width={50} height={50} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="pt-7">
              <Image src="/assets/ig.svg" alt="Instagram Icon" width={50} height={50} />
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Image src="/assets/detiquetalogo.png" alt="detiqueta logo" width={322} height={90} />
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="px-4 pb-8 sm:px-2 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden md:flex h-16">
          <Link href="/" className={`${pathname === "/" ? "nav-active" : "nav-def"} py-2`}>
            INICIO
          </Link>

          <Link href="/menu" className={`${pathname === "/menu" ? "nav-cactive" : "nav-cdef"} py-2`}>
            <span className="countdown font-mono text-xl">
              <span style={{ "--value": hours } as React.CSSProperties}></span>h
              <span style={{ "--value": minutes } as React.CSSProperties}></span>m
              <span style={{ "--value": seconds } as React.CSSProperties}></span>s
            </span>
          </Link>

          <Link href="/us" className={`${pathname === "/us" ? "nav-active" : "nav-def"} py-2`}>
            NOSOTROS
          </Link>

          <Link href="/reserve" className={`${pathname === "/reserve" ? "nav-active" : "nav-def"} py-2`}>
            RESERVAR
          </Link>

          <Link href="/wishlist" className={`${pathname === "/wishlist" ? "nav-active" : "nav-def"} py-2`}>
            LISTA DE DESEOS
          </Link>

          <button className="nav-def2 pb-2" onClick={openModal}>
            UBICACION
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex justify-center md:hidden items-center">
          <div className="mt-14 mr-8">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-gray-900 focus:outline-none">
              {isOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
            </button>
          </div>
          <div className="pt-6">
            <Image src="/assets/detiquetalogo.png" alt="detiqueta logo" width={322} height={90} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div ref={menuRef} className="md:hidden bg-white shadow-md font-bold">
          <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              INICIO
            </Link>
            <Link
              href="/menu"
              className={
                "block px-3 py-2 rounded-md text-base font-medium text-customred"
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="countdown text-xl">
                <span
                  style={{ "--value": hours } as React.CSSProperties}
                ></span>h
                <span
                  style={{ "--value": minutes } as React.CSSProperties}
                ></span>m
                <span
                  style={{ "--value": seconds } as React.CSSProperties}
                ></span>s
              </span>
            </Link>
            <Link href="/us" className="block px-3 py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              NOSOTROS
            </Link>
            <Link href="/reserve" className="block px-3 py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              RESERVAR
            </Link>
            <Link href="/wishlist" className="block px-3 py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              LISTA DE DESEOS
            </Link>
            <button className="block px-3 py-2 text-gray-700 hover:text-gray-900" onClick={openModal}>
              UBICACION
            </button>
          </div>
        </div>
      )}

      {/* Ubicación Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Selecciona tu ciudad</h3>
          <select value={selectedLocation} onChange={handleLocationChange} className="select select-warning w-full max-w-xs">
            <option value="" disabled>UBICACION</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      </dialog>
    </nav>
  );
};

export default Navbar;
