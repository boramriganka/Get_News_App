import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchTech } from "../actions/fetch_tech";
import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.text};
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

const Tech = () => {
    const techSelector = useSelector((state) => state.FetchTech);
    const dispatch = useDispatch();
    const getTechNews = useCallback(() => dispatch(fetchTech()), [dispatch]);

    useEffect(() => {
        getTechNews();
    }, [getTechNews]);

    const articles = techSelector.techNews;

    return (
        <PageContainer>
            <SectionTitle>Technology</SectionTitle>
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
                <Grid>
                    {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                </Grid>
            )}
        </PageContainer>
    );
}

export default Tech;
