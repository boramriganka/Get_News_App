export function fetchCustomNews(source) {
  return function (dispatch) {
    const url = `/api/news?endpoint=top-headlines&sources=${source}`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch({ type: 'FETCH_CUSTOM_NEWS', payload: res.articles });
        } else {
          console.error('NewsAPI Error (FETCH_CUSTOM_NEWS):', res.message || 'Unknown error');
        }
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
      });
  };
}
