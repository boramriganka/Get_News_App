export function searchNews(query) {
  return function (dispatch) {
    const url = `/api/news?endpoint=everything&q=${query}`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch({ type: 'SEARCH_NEWS', payload: res.articles });
        } else {
          console.error('NewsAPI Error (SEARCH_NEWS):', res.message || 'Unknown error');
        }
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
      });
  };
}
