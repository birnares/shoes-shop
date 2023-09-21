import React, { useContext, useState } from "react";
import axios from "axios";

import { DataContext } from "../../App";
import { useCartPrice } from "../../hooks/useCartPrice";
import Notifications from "../Notifications";

import styles from "./Cart.module.scss";

const Cart = () => {
  const { onRemoveFromCart, cartOpened, setCartOpened } =
    useContext(DataContext);
  //your hook
  const { cartItems, setCartItems, cartPrice } = useCartPrice();

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onOrdered = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:3001/sneakers-orders/",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      cartItems.forEach((item) => {
        setTimeout(async () => {
          await axios.delete("http://localhost:3001/sneakers-cart/" + item.id);
        }, 3000);
      });
    } catch (error) {
      alert("Не удалось оформить заказ!");
    }
    setIsLoading(false);
  };
  return (
    <>
      <div
        className={`${styles.overlay} ${
          cartOpened ? styles.overlayVisible : ""
        }`}
      >
        <div className={styles.drawer}>
          <h2 className="d-flex justify-between">
            Корзина
            <img
              onClick={() => setCartOpened(false)}
              className="removeBtn cu-p"
              src="img/Cancel.svg"
              alt="Remove"
            />
          </h2>

          {cartItems.length > 0 ? (
            <div className="d-flex flex-column flex">
              <div className="cart flex">
                {cartItems.map((obj) => (
                  <div key={obj.id}>
                    <div className="cartItem d-flex align-center mb-20">
                      <img
                        width={70}
                        height={70}
                        className="mr-20"
                        src={obj.img}
                        alt="Sneakers"
                      />
                      <div className="mr-15">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img
                        onClick={() => onRemoveFromCart(obj.id)}
                        className="removeBtn"
                        src="img/Cancel.svg"
                        alt="Remove"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{cartPrice} руб.</b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{Math.floor(cartPrice * 0.05)} руб.</b>
                  </li>
                </ul>
                <button
                  disabled={isLoading}
                  onClick={onOrdered}
                  className="greenBtn"
                >
                  Оформить заказ <img src="img/Arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <Notifications
              title={isOrderComplete ? "Заказ оформлен!" : "Ваша корзина пуста"}
              description={
                isOrderComplete
                  ? `Ваш заказ #${orderId} скоро будет передан в отдел доставки`
                  : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              }
              img={isOrderComplete ? "img/Order.svg" : "img/package.png"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
