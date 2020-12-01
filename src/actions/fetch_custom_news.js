const api = process.env.REACT_APP_KEY_NEWS;
console.log(api);

export function fetchCustomNews(source, relevance) {
	//return the actual action to do

	return function (dispatch) {
		const url = `https://newsapi.org/v1/articles?source=${source}&sortBy=${relevance}&apiKey=${api}`;
		fetch(url)
			.then((res) => {
				console.log(url);
				return res.json();
			})
			.then((res) => {
				// console.log(res)
				dispatch({ type: 'FETCH_CUSTOM_NEWS', payload: res.articles });
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
