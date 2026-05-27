const api = process.env.REACT_APP_KEY_NEWS;

export function fetchCustomNews(source, relevance) {
  return function (dispatch) {
    // NewsAPI v2: use top-headlines for sources
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch({ type: 'FETCH_CUSTOM_NEWS', payload: res.articles });
        } else {
          console.error('NewsAPI Error:', res.message);
        }
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
      });
  };
}
