"use client";
import React from "react";
import Image from "next/image";
import styles from "../styles/footer.module.css";
import { useNavbar } from "../stores/navBarStore";

const Footer: React.FC = () => {
  const { showNavbar } = useNavbar();
  
  if (!showNavbar) return null;

  return (
    <footer>
      <div className={styles.backgroundContainer}>
        {/* WhatsApp Input Positioned Above the Logo */}
        <div className={styles.whatsappInput}>
          <span>SUSCRÍBETE AHORA PARA ADQUIRIR LOS DESCUENTOS DE LA SEMANA</span>
        </div>

        {/* Overlay Content with Logo and Links */}
        <div className={styles.overlayContent}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Logo - Visible on Desktop */}
              <div className="hidden md:flex mx-auto">
                <Image
                  src="/assets/icono.svg"
                  alt="detiqueta logo"
                  width={229}
                  height={64}
                />
              </div>

              {/* Logo - Visible on Mobile */}
              <div className="flex md:hidden mx-auto">
                <Image
                  src="/assets/icono.svg"
                  alt="detiqueta logo"
                  width={150}
                  height={150}
                />
              </div>

              {/* Contact Information */}
              <div className="flex flex-col mx-auto space-y-4">
                <h2 className="text-2xl font-semibold">ENVIANOS UN MENSAJE</h2>
                <div className="flex items-center">
                  <Image
                    src="/assets/contacto.svg"
                    alt="Contacto Icon"
                    width={20}
                    height={20}
                  />
                  <p className="ml-2">CONTACTO</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/assets/faq.svg"
                    alt="FAQ Icon"
                    width={20}
                    height={20}
                  />
                  <p className="ml-2">PREGUNTAS FRECUENTES</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/assets/resenas.svg"
                    alt="Reseñas Icon"
                    width={20}
                    height={20}
                  />
                  <p className="ml-2">RESEÑAS</p>
                </div>
              </div>

              {/* Additional Contact Methods */}
              <div className="flex flex-col mx-auto space-y-4">
                <h2 className="text-2xl font-semibold opacity-0">
                  ENVIANOS UN MENSAJE
                </h2>
                <div className="flex items-center">
                  <Image
                    src="/assets/whatsapp.svg"
                    alt="WhatsApp Icon"
                    width={20}
                    height={20}
                  />
                  <p className="ml-2">WHATSAPP</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/assets/mail.svg"
                    alt="Correo Icon"
                    width={20}
                    height={20}
                  />
                  <p className="ml-2">CORREO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
