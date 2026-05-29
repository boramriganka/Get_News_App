import React from 'react';
import styled from 'styled-components';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageWithFallback from './ImageWithFallback';
import { estimateReadingTime } from '../utils/readingTime';
import { addToQueue, removeFromQueue } from '../store/readQueueSlice';
import Tooltip from '@mui/material/Tooltip';
import BiasLabel from './BiasLabel';

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  height: 100%;
  cursor: pointer;
  background: transparent;

  &:hover .card-image {
    transform: scale(1.03);
  }

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 3rem;
    align-items: flex-start;
    border-bottom: 2px solid ${({ theme }) => theme.text};
    padding-bottom: 3.5rem;
    margin-bottom: 1.5rem;

    @media (max-width: 968px) {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `}

  ${({ variant }) => variant === 'featured' && `
    grid-column: span 6;
    @media (max-width: 768px) {
      grid-column: span 12;
    }
  `}

  ${({ variant }) => variant === 'compact' && `
    grid-column: span 3;
    @media (max-width: 1024px) {
      grid-column: span 4;
    }
    @media (max-width: 768px) {
      grid-column: span 12;
    }
  `}
`;

const ImageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  overflow: hidden;
  position: relative;
  border-radius: 2px;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.border}22;

  .card-image {
     transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 8;
    aspect-ratio: 3 / 2;
    @media (max-width: 1280px) {
        aspect-ratio: 16 / 9;
    }
  `}
`;

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 4;
    padding-top: 0.5rem;
  `}
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.accent};

  span.dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: ${({ theme }) => theme.textSecondary};
    opacity: 0.4;
  }
`;

const Headline = styled.h2.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  font-size: ${({ variant }) =>
    variant === 'hero' ? 'clamp(2.5rem, 4vw, 3.5rem)' :
    variant === 'featured' ? '1.75rem' : '1.35rem'};
  color: ${({ theme }) => theme.text};
  margin: 0;
  line-height: 1.1;
  font-weight: 900;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: ${({ variant }) => variant === 'hero' ? '2.25rem' : '1.25rem'};
  }
`;

const Summary = styled.p.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  font-size: ${({ variant }) => variant === 'hero' ? '1.15rem' : '0.95rem'};
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: ${({ variant }) => variant === 'hero' ? '4' : '3'};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
`;

const AuthorInfo = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1rem;

  span {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
`;

const ReadingTime = styled.span`
  font-size: 12px;
  color: #888;
  margin-right: auto;
`;

const BookmarkBtn = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin: -8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $isBookmarked }) => $isBookmarked ? theme.accent : theme.textSecondary};
  opacity: ${({ $isBookmarked }) => $isBookmarked ? 1 : 0.6};
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.accent};
  }
`;

const ArticleCard = ({ article, variant = 'compact' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.Bookmarks.bookmarks);
  const queueItems = useSelector(state => state.ReadQueue.items);

  if (!article) return null;

  const isBookmarked = bookmarks.some(b => b.title === article.title);
  const isInQueue = queueItems.some(item => item.url === article.url);

  const readingTime = estimateReadingTime((article.description || '') + (article.content || ''));
  const sourceId = article.source?.id || article.source?.name?.toLowerCase().replace(/\s+/g, '-');

  const handleCardClick = (e) => {
    if (e.target.closest('.no-nav')) return;
    navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  const toggleBookmark = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: article });
  };

  const toggleQueue = (e) => {
    e.stopPropagation();
    if (isInQueue) {
      dispatch(removeFromQueue(article.url));
    } else {
      dispatch(addToQueue(article));
    }
  };

  return (
    <Card variant={variant} onClick={handleCardClick}>
      <ImageContainer variant={variant}>
        <ImageWithFallback
          src={article.urlToImage}
          alt={article.title}
          className="card-image"
        />
      </ImageContainer>
      <Content variant={variant}>
        <Meta>
          <span>{article.source?.name || 'News'}</span>
          <BiasLabel sourceId={sourceId} />
          <span className="dot" />
          <span>{readingTime} min read</span>
        </Meta>
        <Headline variant={variant}>{article.title}</Headline>
        {(variant === 'hero' || variant === 'featured') && (
          <Summary variant={variant}>{article.description}</Summary>
        )}
        <Footer>
          <AuthorInfo>
            By <span>{article.author || 'Editorial Staff'}</span>
          </AuthorInfo>
          <ReadingTime>{readingTime} min read</ReadingTime>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Tooltip title={isInQueue ? "Remove from queue" : "Read later"}>
              <BookmarkBtn
                className="no-nav"
                onClick={toggleQueue}
                $isBookmarked={isInQueue}
                aria-label={isInQueue ? "Remove from queue" : "Read later"}
              >
                {isInQueue ? (
                    <BookmarkIcon sx={{ fontSize: 22 }} />
                ) : (
                    <BookmarkBorderIcon sx={{ fontSize: 22 }} />
                )}
              </BookmarkBtn>
            </Tooltip>
            <Tooltip title={isBookmarked ? "Remove bookmark" : "Save article"}>
              <BookmarkBtn
                className="no-nav"
                onClick={toggleBookmark}
                $isBookmarked={isBookmarked}
                aria-label={isBookmarked ? "Remove bookmark" : "Save article"}
              >
                {isBookmarked ? (
                    <BookmarkIcon sx={{ fontSize: 22 }} />
                ) : (
                    <BookmarkBorderIcon sx={{ fontSize: 22 }} />
                )}
              </BookmarkBtn>
            </Tooltip>
          </div>
        </Footer>
      </Content>
    </Card>
  );
};

export default ArticleCard;
