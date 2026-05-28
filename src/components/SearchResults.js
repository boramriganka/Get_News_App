import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchNews } from '../actions/search_actions';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const SearchHeader = styled.div`
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const QueryTitle = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  line-height: 1.1;
  margin: 0;

  span {
    color: ${({ theme }) => theme.accent};
    font-style: italic;
  }
`;

const ResultCount = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3rem 2rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const searchResults = useSelector(state => state.Search.searchNews);

    useEffect(() => {
        if (query) {
            const performSearch = async () => {
                setLoading(true);
                await dispatch(searchNews(query));
                setLoading(false);
                window.scrollTo(0, 0);
            };
            performSearch();
        }
    }, [query, dispatch]);

    return (
        <PageContainer>
            <SearchHeader>
                <QueryTitle>Search Results for <span>"{query}"</span></QueryTitle>
                {!loading && (
                    <ResultCount>
                        Found {searchResults.length} relevant articles.
                    </ResultCount>
                )}
            </SearchHeader>

            {loading ? (
                <Grid>
                    {[...Array(6)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </Grid>
            ) : searchResults.length > 0 ? (
                <Grid>
                    {searchResults.map((article, index) => (
                        <ArticleCard
                            key={(article.url || article.title) + index}
                            article={article}
                            variant="compact"
                        />
                    ))}
                </Grid>
            ) : (
                <div style={{textAlign: 'center', padding: '6rem 0'}}>
                    <p style={{fontSize: '1.5rem', opacity: 0.4, fontStyle: 'italic', fontFamily: 'var(--font-serif)'}}>
                        No results found for your search.
                    </p>
                </div>
            )}
        </PageContainer>
    );
};

export default SearchResults;
