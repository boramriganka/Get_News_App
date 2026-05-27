import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomNews } from "../actions/fetch_custom_news";
import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const HeaderSection = styled.div`
  margin-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-top: 2rem;
  flex-wrap: wrap;

  .form-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 200px;
    flex: 1;

    @media (max-width: 480px) {
      min-width: 100%;
    }
  }

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textSecondary};
  }

  select {
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: inherit;
    width: 100%;
  }

  input[type="submit"] {
    padding: 0.75rem 2rem;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    border: none;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
    height: 48px;

    @media (max-width: 480px) {
      width: 100%;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;

const Main = () => {
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState("");
    const [loading, setLoading] = useState(true);

    const customNewsSelector = useSelector((state) => state.CustomSearch);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        // Fetch sources
        fetch(`/api/news?endpoint=top-headlines/sources`)
            .then(res => res.json())
            .then(response => {
                if (response.status === 'ok') {
                    setSources(response.sources);
                }
            })
            .catch(err => {
                console.error('Sources Fetch Error:', err);
            });

        // Fetch initial top headlines if articles are empty
        fetch(`/api/news?endpoint=top-headlines&country=us`)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'ok') {
                    dispatch({ type: 'FETCH_CUSTOM_NEWS', payload: res.articles });
                } else {
                    console.error('Initial News Fetch Error:', res.message);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Initial News Fetch Error:', err);
                setLoading(false);
            });
    }, [dispatch]);

    const getNews = (e) => {
        e.preventDefault();
        if (source && source !== "nothing") {
            dispatch(fetchCustomNews(source));
        }
    }

    const articles = customNewsSelector.customNews;

    return (
        <PageContainer>
            <HeaderSection>
                <h1>Journal Dispatch</h1>
                <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>
                    {sources.length} curated sources at your fingertips.
                </p>

                <Form onSubmit={getNews}>
                    <div className="form-control">
                        <label>Select Publication</label>
                        <select onChange={e => setSource(e.target.value)} value={source}>
                            <option value="nothing">Choose a source...</option>
                            {sources.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" value="Update Feed" />
                </Form>
            </HeaderSection>

            {articles.length > 0 ? (
                <Grid>
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={article.title + index}
                            article={article}
                            variant={index === 0 ? 'hero' : index < 3 ? 'featured' : 'compact'}
                        />
                    ))}
                </Grid>
            ) : (
                <div style={{textAlign: 'center', padding: '4rem 0'}}>
                    {loading ? (
                        <Grid>
                            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                        </Grid>
                    ) : (
                        <p style={{fontSize: '1.25rem', opacity: 0.6}}>Select a source to begin your reading experience.</p>
                    )}
                </div>
            )}
        </PageContainer>
    );
}

export default Main;
