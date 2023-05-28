import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
  email,
  exit,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <div className="header__links">
          <p className="header__email">{email}</p>
          <button onClick={exit} className="header__button">Выйти</button>
        </div>
      </Header>
      <main className="content">
        <section className="profile">
          <button
            onClick={onEditAvatar}
            className="profile__edit-avatar-btn"
            type="button"
          >
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              className="profile__avatar"
            ></div>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              onClick={onEditProfile}
              className="profile__edit-button"
            ></button>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
          <button onClick={onAddPlace} className="profile__button" />
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  link={card.link}
                  name={card.name}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
export default Main;
