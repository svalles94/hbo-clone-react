import { useStateContext } from "../../HBOProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import router, { useRouter } from "next/router";

const SearchModal = (props) => {
  const globalState = useStateContext();
  const [popData, setPopData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();

  useEffect(async () => {
    try {
      let popData = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?primary_release_year=2021&api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-us`
      );
      setPopData(popData.data.results.filter((item, i) => i < 14));
      setShowResults(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (globalState.searchOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [globalState.searchOpen]);

  const handleInput = async (e) => {
    try {
      setText(e.target.value);
      let searchData = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${e.target.value}&api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US`
      );
      setSearchData(
        searchData.data.results.filter(
          (item, i) => item.media_type === "tv" || item.media_type === "movie"
        )
      );
      setShowResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  const clickedThumbnail = (type, id, media_type) => {
    if (type === "popular") {
      router.push(`/movie/${id}`);
      globalState.setSearchOpenAction(!globalState.searchOpen);
    }
    if (type === "search") {
      router.push(`/${media_type}/${id}`);
      globalState.setSearchOpenAction(!globalState.searchOpen);
    }
    console.log("send user to media page" + props.mediaUrl);
  };

  return (
    <div
      className={`search-modal ${
        globalState.searchOpen ? "search-modal--active" : ""
      }`}
    >
      <div className="search-modal__input-group">
        <input
          className="search-modal__input"
          type="text"
          placeholder="search for a title"
          onChange={handleInput}
          value={text}
        />
        <div
          className="search-modal__close-btn"
          onClick={() =>
            globalState.setSearchOpenAction(!globalState.searchOpen)
          }
        >
          <i className="fas fa-times" />
        </div>
      </div>

      <h3 className="search-modal__title">
        {showResults && searchData.length >= 1
          ? `Search Result for ${text}`
          : `Popular Searches`}
      </h3>

      <div className="search-modal__thumbnails">
        {showResults && searchData.length >= 1 ? (
          <SearchResults
            searchData={searchData}
            clickedThumbnail={clickedThumbnail}
          />
        ) : (
          <PopularResults
            popData={popData}
            clickedThumbnail={clickedThumbnail}
          />
        )}
      </div>
    </div>
  );
};

const PopularResults = (props) => {
  return props.popData.map((item, index) => {
    return (
      <div
        key={index}
        className="search-modal__thumbnail"
        onClick={() => props.clickedThumbnail("popular", item.id)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
          alt=""
        />
        <div className="search-modal__top-layer">
          <i className="fas fa-play" />
        </div>
      </div>
    );
  });
};

const SearchResults = (props) => {
  return props.searchData.map((item, index) => {
    return (
      <div
        key={index}
        className="search-modal__thumbnail"
        onClick={() => clickedThumbnail("popular", item.id, item.media_type)}
      >
        <img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} />
        <div className="search-modal__top-layer">
          <i className="fas fa-play" />
        </div>
      </div>
    );
  });
};

export default SearchModal;
