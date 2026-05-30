import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Toggle from './Toggler';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 1.5rem;
  height: 70px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(12px);
  background: ${({ theme }) => theme.body}ee;
`;

const NavInner = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  z-index: 10;

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1100px) {
    position: static;
    transform: none;
    margin-left: 2rem;
    flex: 1;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['$active'].includes(prop),
})`
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme, $active }) => $active ? theme.text : theme.textSecondary};
  padding: 1.5rem 0;
  border-bottom: 2px solid ${({ theme, $active }) => $active ? theme.accent : 'transparent'};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 10;
`;

const HeaderIconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$active'].includes(prop),
})`
  background: none;
  border: none;
  color: ${({ theme, $active }) => $active ? theme.accent : theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.border}44;
  }
`;

const SearchOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$visible'].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.body};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  transform: ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4rem;
`;

const SearchContent = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const SearchInputLarge = styled.input`
  width: 100%;
  background: none;
  border: none;
  border-bottom: 4px solid ${({ theme }) => theme.text};
  font-size: clamp(2rem, 5vw, 4rem);
  font-family: var(--font-serif);
  color: ${({ theme }) => theme.text};
  padding: 1rem 0;
  outline: none;
  font-weight: 900;

  &::placeholder {
    opacity: 0.2;
  }
`;

const SearchHint = styled.p`
  margin-top: 2rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
`;

const Header = ({ theme, toggleTheme }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queueCount = useSelector(state => state.ReadQueue.items.length);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSearch(false);
      setQuery('');
    }
  };

  const isSavedPage = location.pathname === '/saved';

  return (
    <>
      <NavContainer>
        <NavInner>
          <Logo to="/">
            JOURNAL<span>.</span>
          </Logo>

          <NavLinks>
            <NavLink to="/" $active={location.pathname === '/'}>Top Stories</NavLink>
            <NavLink to="/category/technology" $active={location.pathname === '/category/technology'}>Technology</NavLink>
            <NavLink to="/category/business" $active={location.pathname === '/category/business'}>Business</NavLink>
            <NavLink to="/category/entertainment" $active={location.pathname === '/category/entertainment'}>Entertainment</NavLink>
            <NavLink to="/queue" $active={location.pathname === '/queue'}>
              Queue
              {queueCount > 0 && (
                <Badge
                  badgeContent={queueCount}
                  color="error"
                  sx={{ ml: 1, '& .MuiBadge-badge': { fontSize: '0.6rem', height: '16px', minWidth: '16px' } }}
                />
              )}
            </NavLink>
          </NavLinks>

          <ActionGroup>
            <HeaderIconButton onClick={() => setShowSearch(true)} aria-label="Open search">
              <SearchIcon sx={{ fontSize: 22 }} />
            </HeaderIconButton>
            <HeaderIconButton as={Link} to="/saved" $active={isSavedPage} aria-label="Saved articles">
              {isSavedPage ? <BookmarkIcon sx={{ fontSize: 24 }} /> : <BookmarkBorderIcon sx={{ fontSize: 24 }} />}
            </HeaderIconButton>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </ActionGroup>
        </NavInner>
      </NavContainer>

      <SearchOverlay $visible={showSearch}>
        <SearchHeader>
          <HeaderIconButton onClick={() => setShowSearch(false)} aria-label="Close search">
            <CloseIcon sx={{ fontSize: 32 }} />
          </HeaderIconButton>
        </SearchHeader>
        <SearchContent>
          <SearchInputLarge
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            autoFocus={showSearch}
          />
          <SearchHint>Press Enter to search the news archives.</SearchHint>
        </SearchContent>
      </SearchOverlay>
    </>
  );
};

export default Header;
