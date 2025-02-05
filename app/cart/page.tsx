"use client";
import React from "react";

const page = () => {
  const data = [
    {
      producto: "Pizza Margherita",
      restaurante: "Luigi's Italian Kitchen",
      precio: "$12.99",
      descuento: "10%",
      avatar:
        "https://web.didiglobal.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fn7hs0hadu6ro%2F1O0Be1dObiQBm17GQJHLj8%2F3fde720730f0b3616ecf5a82b928e7f9%2Fpizza-a-domicilio-cerca-de-mi.jpg&w=828&q=75",
    },
    {
      producto: "Sushi Platter",
      restaurante: "Tokyo Delights",
      precio: "$22.50",
      descuento: "15%",
      avatar:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg",
    },
    {
      producto: "Tacos al Pastor",
      restaurante: "El Gusto Mexicano",
      precio: "$8.99",
      descuento: "5%",
      avatar:
        "https://comedera.com/wp-content/uploads/sites/9/2017/08/tacos-al-pastor-receta.jpg",
    },
    {
      producto: "Cheeseburger",
      restaurante: "American Grill",
      precio: "$9.49",
      descuento: "No discount",
      avatar:
        "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0__FillWzExNzAsNTgzXQ.jpg",
    },
  ];

  const parsePrice = (priceStr: string) =>
    parseFloat(priceStr.replace("$", ""));
  const parseDiscount = (discountStr: string) => {
    if (discountStr.endsWith("%")) {
      return parseFloat(discountStr.replace("%", "")) / 100;
    }
    return 0;
  };

  const totalOriginalPrice = data.reduce(
    (acc, item) => acc + parsePrice(item.precio),
    0
  );

  const totalDiscount = data.reduce((acc, item) => {
    const discountRate = parseDiscount(item.descuento);
    return acc + parsePrice(item.precio) * discountRate;
  }, 0);

  const totalFinalPrice = totalOriginalPrice - totalDiscount;

  return (
    <>
      <button
        className="btn btn-block bg-customOrange text-white"
        onClick={() =>
          (
            document.getElementById("my_modal_4") as HTMLDialogElement
          ).showModal()
        }
      >
        ORDEN
      </button>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <div className="mx-auto font-bold">
            <h1 className="text-2xl text-center">TU ORDEN</h1>
            <br />
            {/* List of Products in Summary */}
            {data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span>{item.producto}</span>
                  <span>
                    ${parsePrice(item.precio).toFixed(2)}
                    {item.descuento !== "No discount" && (
                      <span className="text-sm text-gray-500">
                        {" "}
                        (-{item.descuento})
                      </span>
                    )}
                  </span>
                </div>
                <hr className="border-b border-black" />
              </div>
            ))}

            {/* Totals */}
            <div className="flex justify-between text-customor">
              <span>TOTAL</span> <span>${totalOriginalPrice.toFixed(2)}</span>
            </div>
            <hr className="border-b border-black" />
            <div className="flex justify-between text-customor">
              <span>TE AHORRASTE</span> <span>${totalDiscount.toFixed(2)}</span>
            </div>
            <hr className="border-b border-black" />
            <div className="flex justify-between text-customor">
              <span>TOTAL A PAGAR</span>{" "}
              <span>${totalFinalPrice.toFixed(2)}</span>
            </div>
            <hr className="border-b border-black" />
            <br />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cerrar</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto landscape:block hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Restaurante</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-24 w-24">
                        <img
                          src={item.avatar}
                          alt={`Image of ${item.producto}`}
                        />
                      </div>
                    </div>
                    <span className="text-lg font-bold">{item.producto}</span>
                  </div>
                </td>
                <td>{item.restaurante}</td>
                <td>{item.precio}</td>
                <td>{item.descuento}</td>
                <td>
                  <button className="btn btn-circle btn-error btn-sm">X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="portrait:block hidden">
        {data.map((item, index) => (
          <details key={index} className="collapse collapse-arrow">
            <summary className="collapse-title text-xl font-medium">
              {item.producto}
            </summary>
            <div className="collapse-content">
              <div className="flex items-center gap-3 mb-2">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={item.avatar} alt={`Image of ${item.producto}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">{item.restaurante}</p>
                  <p className="text-sm">Precio: {item.precio}</p>
                  <p className="text-sm">Descuento: {item.descuento}</p>
                </div>
                <button className="btn btn-circle btn-error btn-sm">X</button>
              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
};

export default page;
