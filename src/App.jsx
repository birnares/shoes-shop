import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart/Cart";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

export const DataContext = createContext({});

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shoes, setShoes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchLoadingData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("http://localhost:3001/sneakers-cart"),
            axios.get("http://localhost:3001/sneakers-favorites"),
            axios.get("http://localhost:3001/sneakers"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setShoes(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных с сервера");
      }
    }

    fetchLoadingData();
  }, []);

  // add cart

  const onAddToCart = async (cardItem) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(cardItem.id)
      );
      if (findItem) {
        console.log(`Удаляем товар с id: ${findItem.id}`);
        await axios.delete(
          `http://localhost:3001/sneakers-cart/${findItem.id}`
        );
        console.log(`Товар с id ${findItem.id} успешно удален`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(cardItem.id))
        );
        console.log("Обновленное состояние корзины:", cartItems);
      } else {
        console.log(`Добавляем товар с не найденным id: ${cardItem.id}`);
        const { data } = await axios.post(
          "http://localhost:3001/sneakers-cart",
          cardItem
        );
        console.log(`Товар с id ${cardItem.id} успешно добавлен`);
        setCartItems((prev) => [...prev, data]);
        console.log("Обновленное состояние корзины:", cartItems);
      }
    } catch (error) {
      alert("Не удалось добавить товар в корзину");
      console.error(error);
    }
  };

  // remove cart item
  const onRemoveFromCart = async (id) => {
    try {
      console.log(`Удаляем товар с id: ${id}`);
      await axios.delete(`http://localhost:3001/sneakers-cart/${id}`);
      console.log(`Товар с id ${id} успешно удален`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      console.log("Обновленное состояние корзины:", cartItems);
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
      console.error(error);
    }
  };

  // like card
  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        await axios.delete(
          `http://localhost:3001/sneakers-favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "http://localhost:3001/sneakers-favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в закладки");
      console.error(error);
    }
  };
  // forDoneCard
  const onDoneCard = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const onDoneFavoritesCard = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <DataContext.Provider
      value={{
        shoes,
        cartItems,
        setCartItems,
        favorites,
        onDoneCard,
        onAddToFavorites,
        onAddToCart,
        cartOpened,
        setCartOpened,
        onRemoveFromCart,
        isLoading,
        onDoneFavoritesCard,
      }}
    >
      <div className="wrapper clear">
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Cart />
      </div>
    </DataContext.Provider>
  );
}

export default App;
