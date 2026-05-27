import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchNews } from '../actions/search_actions';
import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.text};

  span {
      font-weight: 400;
      opacity: 0.6;
      font-style: italic;
  }
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

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const dispatch = useDispatch();
    const { searchResults, loading, error } = useSelector(state => state.Search);

    useEffect(() => {
        if (query) {
            dispatch(searchNews(query));
        }
    }, [query, dispatch]);

    return (
        <PageContainer>
            <SectionTitle>Search Results <span>"{query}"</span></SectionTitle>

            {loading ? (
                <Grid>
                    {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                </Grid>
            ) : error ? (
                <div style={{textAlign: 'center', padding: '4rem 0'}}>
                    <p style={{color: 'red'}}>{error}</p>
                </div>
            ) : searchResults.length > 0 ? (
                <Grid>
                    {searchResults.map((article, index) => (
                        <ArticleCard
                            key={article.title + index}
                            article={article}
                            variant={index === 0 ? 'hero' : index < 3 ? 'featured' : 'compact'}
                        />
                    ))}
                </Grid>
            ) : (
                <div style={{textAlign: 'center', padding: '4rem 0'}}>
                    <p style={{fontSize: '1.25rem', opacity: 0.6}}>No results found for your search.</p>
                </div>
            )}
        </PageContainer>
    );
};

export default SearchResults;
