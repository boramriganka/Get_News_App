import React from 'react';
import styled from 'styled-components';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  height: 100%;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover img {
    transform: scale(1.05);
  }

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2.5rem;
    align-items: center;
    border-bottom: 2px solid #000;
    padding-bottom: 3rem;
    margin-bottom: 2rem;

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
    @media (max-width: 768px) {
      grid-column: span 12;
    }
  `}
`;

const ImageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.border};

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 7;
    aspect-ratio: 4 / 3;
  `}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
`;

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 5;
  `}
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.accent};
`;

const Headline = styled.h2.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  font-size: ${({ variant }) => variant === 'hero' ? '3rem' : variant === 'featured' ? '1.75rem' : '1.25rem'};
  color: ${({ theme }) => theme.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ variant }) => variant === 'hero' ? '2.25rem' : '1.25rem'};
  }
`;

const Summary = styled.p.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  font-size: ${({ variant }) => variant === 'hero' ? '1.1rem' : '0.9rem'};
  color: ${({ theme }) => theme.textSecondary};
  display: -webkit-box;
  -webkit-line-clamp: 3;
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
  span {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
`;

const ArticleCard = ({ article, variant = 'compact' }) => {
  const navigate = useNavigate();
  if (!article) return null;

  const handleCardClick = () => {
    navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  return (
    <Card variant={variant} onClick={handleCardClick}>
      <ImageWrapper variant={variant}>
        <Image src={article.urlToImage} alt={article.title} loading="lazy" />
      </ImageWrapper>
      <Content variant={variant}>
        <Meta>
          <span>{article.source?.name || 'News'}</span>
          <span>•</span>
          <span>5 min read</span>
        </Meta>
        <Headline variant={variant}>{article.title}</Headline>
        {(variant === 'hero' || variant === 'featured') && (
          <Summary variant={variant}>{article.description}</Summary>
        )}
        <Footer>
          <AuthorInfo>
            By <span>{article.author || 'Editorial Staff'}</span>
          </AuthorInfo>
          <BookmarkBorderIcon sx={{ fontSize: 20, cursor: 'pointer', opacity: 0.6 }} />
        </Footer>
      </Content>
    </Card>
  );
};

export default ArticleCard;
