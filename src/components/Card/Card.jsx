import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import { DataContext } from "../../App";
import style from "./Card.module.scss";
import plusCard from "./CardPlus.svg";
import doneCard from "./CardDone.svg";
import likeCard from "./heart-fill.svg";
import unLikeCard from "./heart-unfill.svg";

const Card = ({
  id,
  img,
  title,
  price,
  onPlus,
  onLikeCard,
  onLike,
  onBookmarked = false,
  onLoading = false,
}) => {
  const { onDoneCard, onDoneFavoritesCard } = useContext(DataContext);
  const [isFavorite, setIsFavorite] = useState(onBookmarked);
  const itemAttributes = { id, parentId: id, img, title, price };

  const handlePlus = () => {
    onPlus(itemAttributes);
    console.log(itemAttributes, "added");
  };

  const handleLike = () => {
    onLike(itemAttributes);
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className={style.card}>
        {onLoading ? (
          <ContentLoader
            speed={2}
            width={152}
            height={225}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="1" y="0" rx="10" ry="10" width="150" height="155" />
            <rect x="0" y="167" rx="5" ry="5" width="150" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div onClick={onLikeCard} className={style.favorite}>
              {onLike && (
                <img
                  onClick={handleLike}
                  src={onDoneFavoritesCard(id) ? likeCard : unLikeCard}
                  alt={title}
                />
              )}
            </div>
            <img width="100%" height={135} src={img} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              {onPlus && (
                <img
                  className={style.plus}
                  onClick={handlePlus}
                  src={onDoneCard(id) ? doneCard : plusCard}
                  alt={title}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
