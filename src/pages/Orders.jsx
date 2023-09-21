import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card/Card";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(
          "http://localhost:3001/sneakers-orders/"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      })();
      setIsLoading(false);
    } catch (error) {
      alert("Не удалось загрузить ваши заказы");
      console.error(error);
    }
  }, []);
  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {orders.length > 0 ? "Мой список заказов:" : "Список заказов пуст"}
          </h1>
        </div>
        <div className="catalog">
          {orders.length > 0 ? (
            <div className="catalog">
              {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                <Card
                  key={index}
                  onLikeCard={() => "onClick"}
                  onLoading={isLoading}
                  {...item}
                />
              ))}
            </div>
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <div className="cartInfo d-flex align-center flex-column">
                <img
                  className="mb-20"
                  width={120}
                  height={120}
                  src="/img/folder.png"
                  alt="Empty"
                />
                <p className="opacity-6">Оформите хотя бы один заказ</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
