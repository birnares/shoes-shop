import React, { useContext } from "react";
import { DataContext } from "../App";

const Notifications = ({ title, description, img }) => {
  const { setCartOpened } = useContext(DataContext);
  return (
    <>
      <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        <img className="mb20" width={160} height={160} src={img} alt="Empty" />
        <h2>{title}</h2>
        <p className="opacity-6">{description}</p>
        <button onClick={() => setCartOpened(false)} className="greenBtn">
          Вернуться назад <img src="img/Arrow.svg" alt="Arrow" />
        </button>
      </div>
    </>
  );
};

export default Notifications;
