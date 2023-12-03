import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [, setLocalStorageUpdate] = useState(0);
  let searchTimer: NodeJS.Timeout;

  const handleSearch = (e: any) => {
    clearTimeout(searchTimer);
    console.log(e.target.value);

    searchTimer = setTimeout(() => {
      axios
        .get(`https://api.npms.io/v2/search?q=${e.target.value}`)
        .then((res) => {
          setSearchResults(res.data.results);
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  const handleAddToFavorites = (
    packageName: string,
    addToFavorites: boolean
  ) => {
    const favorites = JSON.parse(localStorage.getItem("favourites") || "[]");

    if (addToFavorites) {
      // Add to favorites
      favorites.push(packageName);
    } else {
      // Remove from favorites
      const index = favorites.indexOf(packageName);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem("favourites", JSON.stringify(favorites));

    setLocalStorageUpdate((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <input
        className="p-2 mb-4 border border-gray-300"
        type="text"
        // value={searchTerm}
        onChange={(e) => {
          // setSearchTerm(e.target.value);
          handleSearch(e);
        }}
        placeholder="Search for NPM packages"
      />

      {searchResults.length > 0 ? (
        <div className="max-h-60 overflow-y-auto border border-gray-300 p-2">
          {searchResults.map((res) => (
            <div className="mb-2 flex items-center" key={res.package.name}>
              <span>{res.package.name}</span>
              <input
                type="checkbox"
                className="ml-2"
                onChange={(e) =>
                  handleAddToFavorites(res.package.name, e.target.checked)
                }
                checked={JSON.parse(
                  localStorage.getItem("favourites") || "[]"
                ).includes(res.package.name)}
              />
            </div>
          ))}
        </div>
      ) : null}
      <Link className="text-blue-500 hover:underline" to={"/favourites"}>
        Go to Favourites
      </Link>
    </div>
  );
};

export default Home;
