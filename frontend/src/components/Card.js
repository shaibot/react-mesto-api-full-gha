import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick () {
    onCardClick(card);
  }
  function handleLikeClick () {
    onCardLike(card);
  }

  function handleDeleteClick () {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <figure className="element">
        {isOwn && (
          <button
            type="button"
            className="element__card-delete"
            onClick={handleDeleteClick}
          />
        )}
        <img
          alt={card.name}
          src={card.link}
          onClick={handleClick}
          className="element__image"
        />
        <figcaption className="element__caption-like">
          <p className="element__caption">{card.name}</p>
          <button
            type="button"
            className={`element__like ${isLiked && "element__like_active"}`}
            onClick={handleLikeClick}
          />
        </figcaption>
        <span className="element__counter-likes">{card.likes.length}</span>
      </figure>
    </li>
  );
}

export default Card;
