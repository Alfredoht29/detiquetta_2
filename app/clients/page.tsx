import React from "react";

const page = () => {
  return (
    <div>
      <div className="mx-auto w-1/2 h-5/6 p-4 my-4">
        <h2 className="text-4xl font-bold text-customor text-center">
          Clientes
        </h2>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New album is released!</h2>
            <p>Click the button to listen on Spotiwhy app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Listen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
