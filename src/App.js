import React from 'react';

//image
import image from '../src/836 [Converted].svg';

import image1 from '../src/news1.jpg';

import Store from './store/store';
import { Provider } from 'react-redux';

import { Link } from 'react-router-dom';
//routes
import Routes from './routes';
import { useDarkMode } from './components/useDarkMode';
import Toggle from './components/Toggler';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/globalstyles.js';
import { lightTheme, darkTheme } from './components/Themes';

const App = () => {
	const [theme, themeToggler] = useDarkMode();

	const themeMode = theme === 'light' ? lightTheme : darkTheme;
	return (
		<Provider store={Store}>
			<ThemeProvider theme={themeMode}>
				<>
					<GlobalStyles />
					<div className="App">
						<nav>
							<ul>
								<li>
									<Link to="/">Get News</Link>
								</li>
							</ul>
							<ul>
								<li>
									
										<div className="overlay-tech-news">
                    <Link to="/tech">
											<h4>Tech News</h4>
                      </Link>
										</div>
									
								</li>
								<Toggle theme={theme} toggleTheme={themeToggler} />
							</ul>
						</nav>
						<header>
							<div className="overlay1">
								<h1>Get</h1>
							</div>
							<div className="overlay2">
								<h1>News</h1>
							</div>

							<img src={image1} />
						</header>

						<main>
							<Routes />
						</main>
					</div>
				</>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
