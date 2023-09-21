import React, { useContext } from "react";
import Card from "../components/Card/Card";
import { DataContext } from "../App";

const Favorites = () => {
  const { favorites, onAddToFavorites, onAddToCart } = useContext(DataContext);
  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {favorites.length > 0
              ? "Мой список желаемого:"
              : "Список желаемого пуст"}
          </h1>
        </div>
        <div className="catalog">
          {favorites.length > 0 ? (
            <div className="catalog">
              {favorites.map((obj) => (
                <Card
                  key={obj.id}
                  onLike={onAddToFavorites}
                  onPlus={onAddToCart}
                  onBookmarked={true}
                  {...obj}
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
                <p className="opacity-6">Добавьте хотя бы одну пару кросовок</p>
              </div>
              {/* <button onClick={onClose} className="greenBtn">
                    Вернуться назад <img src="img/Arrow.svg" alt="Arrow" />
                  </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
