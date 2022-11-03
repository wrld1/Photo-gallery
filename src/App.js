import React from "react";
import { Collection } from "./Collection";
import "./index.scss";
import { useState, useEffect } from "react";

const cats = [
  { name: "All" },
  { name: "Sea" },
  { name: "Mountains" },
  { name: "Architecture" },
  { name: "Cities" },
];

// import { useEffect, useState } from "react";

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";

    fetch(
      `https://63643eb07b209ece0f4374a5.mockapi.io/photo_collections?page=${page}&limit=4&${category} `
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Photo collection</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(4)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? "active" : ""}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
