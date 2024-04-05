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
  const [genreFilter, setGenreFilter] = useState("");
  const [lengthFilter, setLengthFilter] = useState([]);
  const [sortRelease, setSortRelease] = useState("");

  const likedInteraction = (name) => {
    if (liked.includes(name)) {
      setLiked(liked.filter((songName) => songName !== name));
      setNumLiked(numLiked - 1);
    } else {
      setLiked((liked) => [name, ...liked]);
      setNumLiked(numLiked + 1);
    }
  };

  const showLiked = () => {
    const listLiked = liked.map((songName) => <SongLiked name={songName} />);
    return listLiked;
  };

  const resetFilters = () => {
    setGenreFilter("");
    setLengthFilter([]);
    setSortRelease("");
  };

  const buildSongList = () => {
    let filteredSongs = [...songData];

    if (sortRelease === "Oldest to Newest") {
      filteredSongs = filteredSongs.sort(
        (song1, song2) => new Date(song1.date) - new Date(song2.date)
      );
    }
    if (sortRelease === "Newest to Oldest") {
      filteredSongs = filteredSongs.sort(
        (song1, song2) => new Date(song2.date) - new Date(song1.date)
      );
    }

    if (genreFilter !== "") {
      filteredSongs = filteredSongs.filter(
        (song) => song.genre === genreFilter
      );
    }

    if (lengthFilter.length !== 0) {
      filteredSongs = filteredSongs.filter(
        (song) =>
          timeToSeconds(song.length) >= lengthFilter[0] &&
          timeToSeconds(song.length) <= lengthFilter[1]
      );
    }

    const songList =
      filteredSongs.length > 0 ? (
        filteredSongs.map((song) => (
          <Song
            name={song.name}
            artist={song.artist}
            length={song.length}
            genre={song.genre}
            date={song.date}
            image={song.image}
            likedInteraction={likedInteraction}
            isLiked={liked.includes(song.name)}
          />
        ))
      ) : (
        <p>No songs match your search</p>
      );

    return songList;
  };

  const timeToSeconds = (time) => {
    const [minsString, secsString] = time.split(":");
    const mins = parseInt(minsString);
    const secs = parseInt(secsString);

    return mins * 60 + secs;
  };

  return (
    <main className="App">
      <div id="music" className="web-section">
        <h1>Global Top Songs</h1>
        <div id="filter-length" class="filter-sort">
          <h2>Filter By Length:</h2>
          <button
            onClick={() => setLengthFilter([])}
            className={lengthFilter.length === 0 ? "active-filter" : ""}
          >
            All Lengths
          </button>
          <button
            onClick={() => setLengthFilter([120, 180])}
            className={lengthFilter[0] === 120 ? "active-filter" : ""}
          >
            2:00 - 3:00
          </button>
          <button
            onClick={() => setLengthFilter([181, 240])}
            className={lengthFilter[0] === 181 ? "active-filter" : ""}
          >
            3:01 - 4:00
          </button>
          <button
            onClick={() => setLengthFilter([241, 1000])}
            className={lengthFilter[0] === 241 ? "active-filter" : ""}
          >
            4:01+
          </button>
        </div>
        <div id="filter-genre" class="filter-sort">
          <h2>Filter By Genre:</h2>
          <button
            onClick={() => setGenreFilter("")}
            className={genreFilter === "" ? "active-filter" : ""}
          >
            All Genres
          </button>
          <button
            onClick={() => setGenreFilter("Pop")}
            className={genreFilter === "Pop" ? "active-filter" : ""}
          >
            Pop
          </button>
          <button
            onClick={() => setGenreFilter("Rap")}
            className={genreFilter === "Rap" ? "active-filter" : ""}
          >
            Rap
          </button>
          <button
            onClick={() => setGenreFilter("Folk Rock")}
            className={genreFilter === "Folk Rock" ? "active-filter" : ""}
          >
            Folk Rock
          </button>
        </div>
        <div id="sort-date" class="filter-sort">
          <h2>Sort By:</h2>
          <button
            onClick={() => setSortRelease("")}
            className={sortRelease === "" ? "active-filter" : ""}
          >
            No Sorting
          </button>
          <button
            onClick={() => setSortRelease("Newest to Oldest")}
            className={
              sortRelease === "Newest to Oldest" ? "active-filter" : ""
            }
          >
            Newest to Oldest
          </button>
          <button
            onClick={() => setSortRelease("Oldest to Newest")}
            className={
              sortRelease === "Oldest to Newest" ? "active-filter" : ""
            }
          >
            Oldest to Newest
          </button>
        </div>
        <div id="reset" class="filter-sort">
          <button onClick={() => resetFilters()}>
            Reset All Filters and Sorting
          </button>
        </div>
        <h2 id="song-heading">Songs</h2>
        {buildSongList()}
      </div>
      <div id="liked" className="web-section">
        <h1>Liked Songs</h1>
        <p>Number of Liked Songs: {numLiked}</p>
        <div>{showLiked()}</div>
      </div>
    </main>
  );
}

export default App;
