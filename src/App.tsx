import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {MediaList} from "./components/MediaList";

function App() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const options = {weekday: "long", month: "long", day: "numeric"};
    const date = new Date();
    const day = date.toLocaleDateString('fr-FR', options as any);

    const time = date.toLocaleTimeString('fr-FR', {hour: "2-digit", minute: "2-digit"});
    setDate(`${day}, ${time}`)
  }, []);
  
  
  return (
    <>
      <header>
        {date}
      </header>
      <MediaList title="Derniers Films Populaires"/>
      <MediaList title="Dernières Séries Populaires"/>
    </>
  );
}

export default App;
