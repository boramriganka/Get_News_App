import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';

const DetailContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  margin-bottom: 3rem;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const Category = styled.span`
  color: ${({ theme }) => theme.accent};
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
`;

const Title = styled.h1`
  font-size: 4rem;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-family: var(--font-serif);
  line-height: 1.4;
  color: ${({ theme }) => theme.textSecondary};
  font-style: italic;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 3rem;
`;

const AuthorBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;

  .name {
    font-weight: 700;
  }
  .date {
    opacity: 0.6;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeroImage = styled.img`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: 70vh;
  object-fit: cover;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const Content = styled.div`
  font-size: 1.25rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.text};

  p {
    margin-bottom: 2rem;
  }

  blockquote {
    font-family: var(--font-serif);
    font-size: 2rem;
    line-height: 1.3;
    font-style: italic;
    border-left: 4px solid ${({ theme }) => theme.accent};
    padding-left: 2rem;
    margin: 3rem 0;
    color: ${({ theme }) => theme.text};
  }
`;

const ArticleDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  if (!article) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Home
        </BackButton>
        <h1>Article not found</h1>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Home
      </BackButton>

      <Header>
        <Category>{article.source?.name || 'Top Stories'}</Category>
        <Title>{article.title}</Title>
        <Subtitle>{article.description}</Subtitle>
      </Header>

      <Meta>
        <AuthorBlock>
          <span className="name">By {article.author || 'Editorial Staff'}</span>
          <span className="date">Published Oct 24, 2026 • 6 min read</span>
        </AuthorBlock>
        <Actions>
          <ShareIcon sx={{ cursor: 'pointer', opacity: 0.7 }} />
          <BookmarkBorderIcon sx={{ cursor: 'pointer', opacity: 0.7 }} />
        </Actions>
      </Meta>

      <HeroImage src={article.urlToImage} alt={article.title} />

      <Content>
        <p>{article.content || article.description}</p>
        <blockquote>
          "In the world of fast news, the journal experience brings back the depth and rhythm of quality storytelling."
        </blockquote>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
        </p>
      </Content>
    </DetailContainer>
  );
};

export default ArticleDetail;