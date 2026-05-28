import React from 'react';
import styled from 'styled-components';

import Store from './store/store';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
//routes
import AppRoutes from './routes';
import { useDarkMode } from './components/useDarkMode';
import Header from './components/Header';
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
  width: 100%;
  padding: 0;
`;

const Footer = styled.footer`
  padding: 6rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  background: ${({ theme }) => theme.body};
  margin-top: 4rem;
`;

const FooterLogo = styled.div`
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-bottom: 1.5rem;

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const Copyright = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.5;
  letter-spacing: 0.02em;
`;

const App = () => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <Provider store={Store}>
      <ThemeProvider theme={themeMode}>
        <BrowserRouter>
          <GlobalStyles />
          <AppContainer>
            <Header theme={theme} toggleTheme={themeToggler} />

            <MainContent>
              <AppRoutes />
            </MainContent>

            <Footer>
              <FooterLogo>
                JOURNAL<span>.</span>
              </FooterLogo>
              <Copyright>
                © 2026 Premium Editorial Experience. All rights reserved.
              </Copyright>
            </Footer>
          </AppContainer>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
