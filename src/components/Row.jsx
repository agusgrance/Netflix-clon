import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
export default function Row(props) {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  //console.log(movies);
  const handleClick = (val) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(val?.title || val?.name || val?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((val, key) => {
          return (
            <img
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              onClick={() => handleClick(val)}
              src={`${base_url}${
                isLargeRow ? val.poster_path : val.backdrop_path
              }`}
              alt={val.name}
              key={val.id}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
