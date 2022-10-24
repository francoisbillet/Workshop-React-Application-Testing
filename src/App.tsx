import React, { useEffect, useState } from "react";
import "./App.css";
import { Media, MediaList } from "./components/MediaList";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "UNDEFINED";

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function App() {
  const [date, setDate] = useState("");
  const [movieData, setMovieData] = useState<Media[]>([]);
  const [serieData, setSerieData] = useState<Media[]>([]);

  useEffect(() => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    const date = new Date();
    const day = date.toLocaleDateString("fr-FR", options as any);

    const time = date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDate(`${day}, ${time}`);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const d = data.results.map(
          (datum: any) =>
            ({
              title: datum.title,
              releaseDate: formatDate(datum.release_date),
              imgUrl: datum.poster_path,
            } as Media)
        );
        setMovieData(d);
      });
    fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const d = data.results.map(
          (datum: any) =>
            ({
              title: datum.name,
              releaseDate: formatDate(datum.first_air_date),
              imgUrl: datum.poster_path,
            } as Media)
        );
        setSerieData(d);
      });
  }, []);

  return (
    <>
      <header>{date}</header>
      <MediaList title="Derniers Films Populaires" medias={movieData} />
      <MediaList title="Dernières Séries Populaires" medias={serieData} />
    </>
  );
}

export default App;
