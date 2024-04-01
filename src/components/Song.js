export default function Song({
  name,
  artist,
  length,
  genre,
  date,
  image,
  likedInteraction,
}) {
  return (
    <div className="song">
      <img className="song-img" src={image} alt={name}></img>
      <div className="song-info">
        <h2>{name}</h2>
        <h3>{artist}</h3>
        <p>
          {length} min | {genre} | {date}{" "}
        </p>
      </div>
      <div className="like-button">
        <button onClick={() => likedInteraction(name, artist, image)}>
          Like
        </button>
      </div>
    </div>
  );
}
