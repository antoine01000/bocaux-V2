import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: var(--primary-color);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
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
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">Mon Jardin</Logo>
        <NavLinks>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/bocaux">Bocaux</NavLink>
          <NavLink to="/graines">Graines</NavLink>
          <NavLink to="/categories">Catégories</NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
