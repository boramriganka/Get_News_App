import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Toggle from './Toggler';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(8px);
  background: ${({ theme }) => theme.body}ee;
`;

const Logo = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.text};

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

const Header = ({ theme, toggleTheme }) => {
  return (
    <NavContainer>
      <Logo to="/">
        JOURNAL<span>.</span>
      </Logo>

      <NavLinks>
        <NavLink to="/">Top Stories</NavLink>
        <NavLink to="/tech">Technology</NavLink>
        <NavLink to="/business">Business</NavLink>
        <NavLink to="/culture">Culture</NavLink>
      </NavLinks>

      <ActionGroup>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </ActionGroup>
    </NavContainer>
  );
};

export default Header;