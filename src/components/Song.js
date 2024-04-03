import { useState, useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function Song({
  name,
  artist,
  length,
  genre,
  date,
  image,
  likedInteraction,
  isLiked,
}) {
  const [heartFilled, setHeartFilled] = useState(isLiked);

  useEffect(() => {
    setHeartFilled(isLiked);
  }, [isLiked]);

  const handleClick = () => {
    setHeartFilled(!heartFilled);
    likedInteraction(name);
  };

  return (
    <div className="song">
      <img className="song-img" src={image} alt={"song cover of " + name}></img>
      <div className="song-info">
        <h2>{name}</h2>
        <h3>{artist}</h3>
        <p>
          {length} min | {genre} | {date}{" "}
        </p>
      </div>
      <div className="like-button" onClick={handleClick}>
        {heartFilled ? <GoHeartFill /> : <GoHeart />}
      </div>
    </div>
  );
}
