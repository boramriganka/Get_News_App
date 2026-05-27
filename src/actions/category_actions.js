export function fetchCategoryNews(category) {
  return function (dispatch) {
    const url = `/api/news?endpoint=top-headlines&category=${category}`;
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
