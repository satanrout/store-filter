import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const { filtered, sidebar } = useSelector((state) => state.action);

  const getDiscount = (price) => Math.round(((1000 - price) / 1000) * 100) + "%";

  return (
    <div className="grid">
      {filtered.map((item) => {
        return (
          <div className="grid-item" key={item.id}>
            <div className="img-con">
              <Image objectFit="contain" src={item.image} alt={item.title} layout="fixed" height={200} width={150} />
            </div>

            <div>
              <div className="grid-item-title">{item.title}</div>
              <div className="grid-item-prices">
                <div className="grid-item-price">{"₹" + item.price}</div>
                <div className="grid-item-mrp">₹1000</div>
                <div className="grid-item-discount">{getDiscount(item.price)}</div>
              </div>
            </div>
          </div>
        );
      })}
      {sidebar && <div className="overlay"></div>}
    </div>
  );
};

export default Products;
