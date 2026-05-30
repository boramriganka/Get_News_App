import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ImageWithFallback from './ImageWithFallback';

const DetailContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const BackNav = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
`;

const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$active'].includes(prop),
})`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s;

  ${({ theme, $active }) => $active && `
    background: ${theme.accent};
    color: white;
    border-color: ${theme.accent};
  `}

  &:hover {
    background: ${({ theme, $active }) => $active ? theme.accent : theme.text};
    color: ${({ theme, $active }) => $active ? 'white' : theme.body};
    border-color: ${({ theme, $active }) => $active ? theme.accent : theme.text};
    opacity: ${({ $active }) => $active ? 0.9 : 1};
  }
`;

const BackText = styled.button`
  background: none;
  border: none;
  margin-left: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

const ArticleHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0 4rem;
  max-width: 1000px;
`;

const MetaTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.accent};
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  line-height: 1.1;
  font-weight: 900;
  margin: 0;
`;

const Description = styled.p`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-family: var(--font-serif);
  line-height: 1.4;
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;
  max-width: 800px;
`;

const MetaBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 4rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const AuthorBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .name {
    font-weight: 800;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    span {
        font-weight: 400;
        color: ${({ theme }) => theme.textSecondary};
    }
  }
  .date {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    opacity: 0.6;
    color: ${({ theme }) => theme.text};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const HeroSection = styled.div`
  margin: 0 -1.5rem 4rem;
  height: 70vh;
  min-height: 400px;
  max-height: 800px;

  @media (max-width: 768px) {
    height: 50vh;
    min-height: 300px;
  }
`;

const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 6rem;
`;

const BodyText = styled.div`
  font-size: 1.25rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.text};

  p {
    margin-bottom: 2rem;
  }

  .summary-label {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: ${({ theme }) => theme.accent}11;
    color: ${({ theme }) => theme.accent};
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 1.25rem 2.5rem;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const ArticleDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.Bookmarks.bookmarks);
  const article = state?.article;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <DetailContainer>
        <BackNav>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </BackNav>
        <ArticleHeader>
           <Title>Story not found</Title>
           <Description>We couldn't locate the article you're looking for.</Description>
        </ArticleHeader>
      </DetailContainer>
    );
  }

  const isBookmarked = bookmarks.some(b => b.title === article.title);

  // Clean the content of raw API markers like [+5803 chars]
  const cleanContent = (text) => {
    if (!text) return '';
    return text.replace(/\[\+\d+ chars\]/g, '').trim();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Oct 24, 2026';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
  };

  return (
    <DetailContainer>
      <BackNav>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <BackText onClick={() => navigate(-1)}>Back to stories</BackText>
      </BackNav>

      <ArticleHeader>
        <MetaTop>
          <span>{article.source?.name || 'Top Stories'}</span>
          <span style={{opacity: 0.3}}>|</span>
          <span>5 min read</span>
        </MetaTop>
        <Title>{article.title}</Title>
        {article.description && <Description>{article.description}</Description>}
      </ArticleHeader>

      <MetaBar>
        <AuthorBlock>
          <div className="name"><span>By</span> {article.author || 'Editorial Staff'}</div>
          <div className="date">{formatDate(article.publishedAt)}</div>
        </AuthorBlock>
        <ActionGroup>
          <IconButton onClick={() => {
            if (navigator.share) {
                navigator.share({ title: article.title, url: article.url });
            }
          }} aria-label="Share story">
            <ShareIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={() => dispatch({ type: 'TOGGLE_BOOKMARK', payload: article })}
            aria-label={isBookmarked ? "Remove bookmark" : "Save story"}
            $active={isBookmarked}
          >
            {isBookmarked ? <BookmarkIcon sx={{ fontSize: 20 }} /> : <BookmarkBorderIcon sx={{ fontSize: 20 }} />}
          </IconButton>
        </ActionGroup>
      </MetaBar>

      <HeroSection>
        <ImageWithFallback src={article.urlToImage} alt={article.title} />
      </HeroSection>

      <MainContent>
        <BodyText>
          <span className="summary-label">Story Summary</span>
          <p>{cleanContent(article.content) || article.description}</p>
          <ExternalLink href={article.url} target="_blank" rel="noopener noreferrer">
            Read full story at {article.source?.name || 'source'}
          </ExternalLink>
        </BodyText>
      </MainContent>
    </DetailContainer>
  );
};

export default ArticleDetail;
