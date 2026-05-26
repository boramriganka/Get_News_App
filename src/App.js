import React, { useState } from 'react';
import styled from 'styled-components';

import Store from './store/store';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
//routes
import AppRoutes from './routes';
import { useDarkMode } from './components/useDarkMode';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/globalstyles.js';
import { lightTheme, darkTheme } from './components/Themes';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0;
`;

const Footer = styled.footer`
  padding: 4rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 800;
  margin-top: 4rem;

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const App = () => {
  const [theme, themeToggler] = useDarkMode();
  const [activeCategory, setActiveCategory] = useState('All');

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <Provider store={Store}>
      <ThemeProvider theme={themeMode}>
        <BrowserRouter>
          <GlobalStyles />
          <AppContainer>
            <Header theme={theme} toggleTheme={themeToggler} />
            <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            <MainContent>
              <AppRoutes />
            </MainContent>

            <Footer>
              JOURNAL<span>.</span>
              <p style={{fontSize: '0.8rem', fontWeight: 400, marginTop: '1rem', opacity: 0.6}}>
                © 2026 Premium Editorial Experience. All rights reserved.
              </p>
            </Footer>
          </AppContainer>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
