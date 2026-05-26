import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomNews } from "../actions/fetch_custom_news";

const Main = () => {
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState("");
    const [relevance, setRelevance] = useState("");

    const customNewsSelector = useSelector((state) => state.CustomSearch);
    const dispatch = useDispatch();
    const getCustomNews = (source, relevance) => dispatch(fetchCustomNews(source, relevance));

    useEffect(() => {
        fetch("https://newsapi.org/v1/sources?")
            .then(res => res.json())
            .then(response => {
                setSources(response.sources);
            })
            .catch(err => console.error(err));
    }, []); // Empty dependency array to run only once

    const getNews = (e) => {
        e.preventDefault();
        if (source !== "" && source !== "nothing") {
            getCustomNews(source, relevance);
        }
    };
    
    let news;
    if (customNewsSelector.customNews.length > 0) {
        news = (
            <div className="news">
                {customNewsSelector.customNews.map(x => (
                    <div className="post" key={x.title}>
                        <img src={x.urlToImage} alt={x.title} />
                        <h2>{x.title}</h2>
                        <p>{x.description}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        news = <p>Select a source and relevance from the form</p>;
    }

    return (
        <React.Fragment>
            <section>
                <h1>There are {sources.length} sources available now.</h1>
                <h2>PLEASE CHOOSE</h2>
                <form onSubmit={getNews}>
                    <div className="form-control">
                        <label>Source</label>
                        <select onChange={e => setSource(e.target.value)}>
                            <option value="nothing">Select an option...</option>
                            {sources.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        <label>Relevance</label>
                        <select onChange={e => setRelevance(e.target.value)}>
                            <option value="latest">Latest</option>
                            <option value="top">Top</option>
                        </select>
                        <input type="submit" value="Search" />
                    </div>
                </form>
                {news}
            </section>
        </React.Fragment>
    );
};

export default Main;
