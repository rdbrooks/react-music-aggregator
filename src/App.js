import "./App.css";
import { useState } from "react";
import songData from "./assets/song-data.json";
import Song from "./components/Song.js";
import SongLiked from "./components/SongLiked.js";

songData.forEach((song) => {
  song.image = process.env.PUBLIC_URL + "/" + song.image;
});

function App() {
  const [liked, setLiked] = useState([]);
  const [numLiked, setNumLiked] = useState(0);

  const likedInteraction = (name) => {
    if (liked.includes(name)) {
      setLiked(liked.filter((songName) => songName !== name));
      setNumLiked(numLiked - 1);
    } else {
      setLiked((liked) => [...liked, name]);
      setNumLiked(numLiked + 1);
    }
  };

  const showLiked = () => {
    const listLiked = liked.map((songName) => <SongLiked name={songName} />);
    return listLiked;
  };

  const buildSongList = () => {
    const songList = songData.map((song) => (
      <Song
        name={song.name}
        artist={song.artist}
        length={song.length}
        genre={song.genre}
        date={song.date}
        image={song.image}
        likedInteraction={likedInteraction}
      />
    ));
    return songList;
  };

  return (
    <div className="App">
      <div id="music" className="web-section">
        <h1>Global Top Music</h1>
        <div id="filter-genre" class="filter-sort">
          <h2>Filter By Genre:</h2>
          <button>Pop</button>
          <button>Rap</button>
          <button>Folk Rock</button>
        </div>
        <div id="filter-length" class="filter-sort">
          <h2>Filter By Length:</h2>
          <button>2:00 - 3:00</button>
          <button>3:01 - 4:00</button>
          <button>4:01+</button>
        </div>
        <div id="sort-date" class="filter-sort">
          <h2>Sort By:</h2>
          <button>Release Date</button>
        </div>
        <div id="reset" class="filter-sort">
          <button>Reset All Filters and Sorting</button>
        </div>
        <h2 id="song-heading">Songs</h2>
        {buildSongList()}
      </div>
      <div id="liked" className="web-section">
        <h1>Liked Songs</h1>
        <p>Number of Liked Songs: {numLiked}</p>
        <div>{showLiked()}</div>
      </div>
    </div>
  );
}

export default App;
