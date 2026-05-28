import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import EmptyState from './EmptyState';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.text};
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: ${({ theme }) => theme.text};
  line-height: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2.5rem 2rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SavedArticles = () => {
    const bookmarks = useSelector(state => state.Bookmarks.bookmarks);

    return (
        <PageContainer>
            <SectionHeader>
                <SectionTitle>Saved Articles</SectionTitle>
            </SectionHeader>
            {bookmarks.length > 0 ? (
                <Grid>
                    {bookmarks.map((article, index) => (
                        <ArticleCard
                            key={(article.url || article.title) + index}
                            article={article}
                            variant={index === 0 ? 'hero' : index < 3 ? 'featured' : 'compact'}
                        />
                    ))}
                </Grid>
            ) : (
                <EmptyState
                  title="No saved stories"
                  message="Bookmark articles to read them later. Your saved stories will appear here."
                />
            )}
        </PageContainer>
    );
};

export default SavedArticles;
