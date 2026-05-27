import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryNews } from '../actions/category_actions';
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
  text-transform: capitalize;
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

const CategoryNews = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const categoryNews = useSelector(state => state.CategoryNews.categoryNews);

    useEffect(() => {
        if (id) {
            dispatch(fetchCategoryNews(id));
        }
    }, [id, dispatch]);

    const articles = categoryNews[id?.toLowerCase()] || [];

    return (
        <PageContainer>
            <SectionTitle>{id}</SectionTitle>
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
};

export default CategoryNews;
