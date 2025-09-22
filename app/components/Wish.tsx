"use client";

import Image from "next/image";

type WishProps = {
  saved: boolean;
};

const Wish = ({ saved }: WishProps) => {
  return (
    <Image
      src={saved ? "/assets/wish-pressed.svg" : "/assets/wish-default.svg"}
      alt={saved ? "Guardado" : "Guardar"}
      width={64}
      height={64}
      className={`${saved ? "animate-heartbeat" : "hover:opacity-70"}`}
    />
  );
};

export default Wish;

