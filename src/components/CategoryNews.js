import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryNews } from '../actions/category_actions';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const CategoryTitle = styled.h1`
  font-size: clamp(3rem, 10vw, 6rem);
  line-height: 1;
  text-transform: capitalize;
  margin: 0;
  letter-spacing: -0.04em;
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

const CategoryNews = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const categoryNewsMap = useSelector(state => state.CategoryNews.categoryNews);

    // Get articles for current category or empty array
    const articles = categoryNewsMap[id.toLowerCase()] || [];

    useEffect(() => {
        const loadCategoryNews = async () => {
            setLoading(true);
            await dispatch(fetchCategoryNews(id));
            setLoading(false);
            window.scrollTo(0, 0);
        };
        loadCategoryNews();
    }, [id, dispatch]);

    return (
        <PageContainer>
            <SectionHeader>
                <CategoryTitle>{id}</CategoryTitle>
                <p style={{color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.1rem', fontWeight: 500}}>
                    Latest updates from {id} world.
                </p>
            </SectionHeader>

            {loading ? (
                <Grid>
                    {[...Array(6)].map((_, i) => (
                        <SkeletonCard key={i} variant={i === 0 ? 'hero' : i < 3 ? 'featured' : 'compact'} />
                    ))}
                </Grid>
            ) : articles.length > 0 ? (
                <Grid>
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={(article.url || article.title) + index}
                            article={article}
                            variant={index === 0 ? 'hero' : index < 3 ? 'featured' : 'compact'}
                        />
                    ))}
                </Grid>
            ) : (
                <div style={{textAlign: 'center', padding: '6rem 0'}}>
                    <p style={{fontSize: '1.5rem', opacity: 0.4, fontStyle: 'italic', fontFamily: 'var(--font-serif)'}}>
                        No articles found for this category.
                    </p>
                </div>
            )}
        </PageContainer>
    );
};

export default CategoryNews;
