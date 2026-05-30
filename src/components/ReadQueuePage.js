import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearQueue } from '../store/readQueueSlice';
import ArticleCard from './ArticleCard';
import EmptyState from './EmptyState';
import { estimateReadingTime } from '../utils/readingTime';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  line-height: 1;
  margin: 0;
  font-weight: 900;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const ClearButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.text};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
`;

const ReadQueuePage = () => {
  const dispatch = useDispatch();
  const queueItems = useSelector(state => state.ReadQueue.items);

  const totalMinutes = useMemo(() => {
    return queueItems.reduce((acc, item) => {
      const text = (item.description || '') + (item.content || '');
      return acc + estimateReadingTime(text);
    }, 0);
  }, [queueItems]);

  return (
    <PageContainer>
      <Header>
        <TitleGroup>
          <Title>Your reading queue</Title>
          {queueItems.length > 0 && (
            <Subtitle>
              [{queueItems.length} articles · {totalMinutes} min total]
            </Subtitle>
          )}
        </TitleGroup>
        {queueItems.length > 0 && (
          <ClearButton onClick={() => dispatch(clearQueue())}>
            Clear all
          </ClearButton>
        )}
      </Header>

      {queueItems.length > 0 ? (
        <Grid>
          {queueItems.map((article, index) => (
            <ArticleCard
              key={article.url + index}
              article={article}
              variant="compact"
            />
          ))}
        </Grid>
      ) : (
        <EmptyState
          message="Nothing queued yet. Add articles with the bookmark icon."
        />
      )}
    </PageContainer>
  );
};

export default ReadQueuePage;
