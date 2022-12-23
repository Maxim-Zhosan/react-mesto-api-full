import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ headerLink, headerUserEmail, onLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      <div className="header__user-block">
        <p className="header__user-email">{headerUserEmail}</p>
        <Link to={headerLink.link} className="header__link" onClick={onLogout}>{headerLink.name}</Link>
      </div>

    </header>

  );
}

export default Header;