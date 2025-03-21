import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: var(--primary-color);
  padding: 1rem;
  color: white;
  box-shadow: var(--box-shadow);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavContent>
        <Logo>JardinApp</Logo>
        <NavLinks>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/bocaux">Bocaux</NavLink>
          <NavLink to="/graines">Graines</NavLink>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
