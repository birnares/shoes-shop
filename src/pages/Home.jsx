import { React, useState, useContext } from "react";
import Search from "../components/Search";
import Card from "../components/Card/Card";
import { DataContext } from "../App";
import Billboard from "../components/Billboard/Billboard";

const Home = () => {
  const { shoes, onAddToCart, onAddToFavorites, isLoading } =
    useContext(DataContext);
  const [searchValue, setSearchValue] = useState("");
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  const filterInputSearch = shoes.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const renderCards = () => {
    return (isLoading ? [...Array(12)] : filterInputSearch).map(
      (card, index) => (
        <Card
          key={index}
          onLikeCard={() => "onClick"}
          onPlus={(cardItem) => onAddToCart(cardItem)}
          onLike={(likeItem) => onAddToFavorites(likeItem)}
          onLoading={isLoading}
          {...card}
        />
      )
    );
  };

  return (
    <>
      <Billboard />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue
              ? `Поиск по запросу: '${searchValue}'`
              : "Все кроссовки"}
          </h1>

          <Search
            value={searchValue}
            setValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
          />
        </div>
        <div className="catalog">{renderCards()}</div>
      </div>
    </>
  );
};

export default Home;
