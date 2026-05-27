import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ArticleCard from './ArticleCard';

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

const SavedArticles = () => {
    const bookmarks = useSelector(state => state.Bookmarks.bookmarks);

    return (
        <PageContainer>
            <SectionTitle>Saved Articles</SectionTitle>
            {bookmarks.length > 0 ? (
                <Grid>
                    {bookmarks.map((article, index) => (
                        <ArticleCard
                            key={article.title + index}
                            article={article}
                            variant={index === 0 ? 'hero' : index < 3 ? 'featured' : 'compact'}
                        />
                    ))}
                </Grid>
            ) : (
                <div style={{textAlign: 'center', padding: '4rem 0'}}>
                    <p style={{fontSize: '1.25rem', opacity: 0.6}}>You haven't saved any articles yet.</p>
                </div>
            )}
        </PageContainer>
    );
};

export default SavedArticles;
