import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from './Toggler';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';

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
  gap: 0.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  margin-right: 0.5rem;
  transition: all 0.3s ease;
  width: ${({ $expanded }) => $expanded ? '200px' : '40px'};
  overflow: hidden;

  @media (max-width: 480px) {
     width: ${({ $expanded }) => $expanded ? '140px' : '40px'};
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 0.25rem 0.5rem;
  width: 100%;
  font-family: inherit;
  outline: none;
  display: ${({ $visible }) => $visible ? 'block' : 'none'};

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.8rem;
  }
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
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchExpanded(false);
      setQuery('');
    }
  };

  return (
    <NavContainer>
      <Logo to="/">
        JOURNAL<span>.</span>
      </Logo>

      <NavLinks>
        <NavLink to="/">Top Stories</NavLink>
        <NavLink to="/category/technology">Technology</NavLink>
        <NavLink to="/category/business">Business</NavLink>
        <NavLink to="/category/entertainment">Entertainment</NavLink>
      </NavLinks>

      <ActionGroup>
        <SearchContainer $expanded={searchExpanded}>
          <SearchInput
            $visible={searchExpanded}
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
          <IconButton onClick={() => setSearchExpanded(!searchExpanded)}>
            {searchExpanded ? <CloseIcon sx={{ fontSize: 20 }} /> : <SearchIcon sx={{ fontSize: 20 }} />}
          </IconButton>
        </SearchContainer>
        <IconButton as={Link} to="/saved">
          <BookmarkBorderIcon sx={{ fontSize: 22 }} />
        </IconButton>
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </ActionGroup>
    </NavContainer>
  );
};

export default Header;
