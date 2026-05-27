const api = process.env.REACT_APP_KEY_NEWS;

export function searchNews(query) {
  return function (dispatch) {
    dispatch({ type: 'SEARCH_NEWS_LOADING' });
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${api}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch({ type: 'SEARCH_NEWS_SUCCESS', payload: res.articles });
        } else {
          console.error('NewsAPI Error (SEARCH_NEWS):', res.message || 'Unknown error');
          dispatch({ type: 'SEARCH_NEWS_FAILURE', payload: res.message });
        }
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
        dispatch({ type: 'SEARCH_NEWS_FAILURE', payload: err.message });
      });
  };
}
