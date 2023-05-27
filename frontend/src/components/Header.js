import React from 'react';
import headerLogo from '../images/header-logo.svg';

function Header({ children }) {
  return (
    <>
      <header className="header">
        <img
          src={headerLogo}
          alt='Логотип в виде слов на латиннице, написано Место Россия.'
          className="header__logo"
        />
        {children}
      </header>
    </>
  )
}
export default Header;