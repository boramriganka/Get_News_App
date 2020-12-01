const api = process.env.REACT_APP_KEY_NEWS;

export function fetchTech(){
    //return the actual action to do
        return function(dispatch){
            fetch(`https://newsapi.org/v1/articles?source=the-verge&sortBy=top&apiKey=${api}`)
            .then(res => {
                return res.json();
                
            })
            .then(res => {
             // console.log(res)
              dispatch({type:"FETCH_TECH", payload: res.articles});
            })
            .catch(err => {
                console.log(err);
            })
      
         }
      
}