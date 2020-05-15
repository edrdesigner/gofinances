import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const ACTIVE_STYLE = {
  borderBottom: '2px solid #FF872C',
  paddingBottom: 10,
};

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <Link to="/">
        <img src={Logo} alt="GoFinances" />
      </Link>
      <nav>
        <NavLink to="/" activeStyle={ACTIVE_STYLE} exact>
          Dashboard
        </NavLink>
        <NavLink to="/import" activeStyle={ACTIVE_STYLE}>
          Importar
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
