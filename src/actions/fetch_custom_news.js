export function fetchCustomNews(source, relevance) {
  return function (dispatch) {
    // NewsAPI v2: use top-headlines for sources
    const url = `/api/news?endpoint=top-headlines&sources=${source}`;
    fetch(url)
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
