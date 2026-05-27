const api = process.env.REACT_APP_KEY_NEWS;

export function fetchCategoryNews(category) {
  return function (dispatch) {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${api}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch({ type: 'FETCH_CATEGORY_NEWS', payload: { category, articles: res.articles } });
        } else {
          console.error('NewsAPI Error (FETCH_CATEGORY_NEWS):', res.message || 'Unknown error');
        }
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
      });
  };
}
