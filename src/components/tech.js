import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchTech } from "../actions/fetch_tech";

const Tech = () => {
    
    //----- redux and dispatch the action
    const techSelector = useSelector((state) => state.FetchTech);
    const dispatch = useDispatch();
    const getTechNews = useCallback(() => dispatch(fetchTech()), [dispatch]);
    

    useEffect(()=>{
       getTechNews();
    }, [getTechNews])


    return(
        <React.Fragment>
            <section>
                <h2>Technology News</h2>
                <div className="news">
                    {techSelector.techNews.map(x => {
                        return (
                            <div className="post" key={x.title}> 
                                <img src={x.urlToImage} alt={x.title} />
                                <h2>{x.title}</h2>
                                <p>{x.description}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </React.Fragment>
    )   
}

export default Tech;