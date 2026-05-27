export function fetchTech() {
  return function (dispatch) {
    // NewsAPI v2: using everything or top-headlines
    const url = `/api/news?endpoint=top-headlines&sources=the-verge,techcrunch,wired`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch({ type: 'FETCH_TECH', payload: res.articles });
        } else {
          console.error('NewsAPI Error (FETCH_TECH):', res.message || 'Unknown error');
        }
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
      });
  };
}
