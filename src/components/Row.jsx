import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";
export default function Row(props) {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  //console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((val, key) => {
          return (
            <img
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? val.poster_path : val.backdrop_path
              }`}
              alt={val.name}
              key={val.id}
            />
          );
        })}
      </div>
    </div>
  );
}
