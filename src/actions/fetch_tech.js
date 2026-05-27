const api = process.env.REACT_APP_KEY_NEWS;

export function fetchTech() {
  return function (dispatch) {
    // NewsAPI v2: using everything or top-headlines
    const url = `https://newsapi.org/v2/top-headlines?sources=the-verge,techcrunch,wired&apiKey=${api}`;
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
