import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ImageWithFallback from './ImageWithFallback';
import { BIAS_MAP } from '../data/sourceBias';
import ArticleCard from './ArticleCard';
import { cleanArticleContent } from '../utils/cleanContent';

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

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const SummariseBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 2rem;

  &:hover {
    background: ${({ theme }) => theme.border}44;
  }

  ${({ $loading }) => $loading && css`
    animation: ${pulse} 1.5s ease-in-out infinite;
    cursor: wait;
  `}
`;

const SummaryBox = styled.div`
  background: #FFF8E7;
  border-left: 3px solid #F5A623;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-size: 14px;
  line-height: 1.7;
  color: #333;

  ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-left: 1rem;
  font-weight: 500;
`;

const PerspectiveSection = styled.div`
  margin-top: 6rem;
  padding-top: 4rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const SectionHeading = styled.h3`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 3rem;
`;

const PerspectiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const summaryCache = new Map();

const ArticleDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.Bookmarks.bookmarks);

  const techNews = useSelector(state => state.FetchTech.techNews || []);
  const customNews = useSelector(state => state.CustomSearch.customNews || []);
  const categoryNews = useSelector(state => state.CategoryNews.categoryNews || {});
  const searchNews = useSelector(state => state.Search.searchResults || []);

  const allArticles = useMemo(() => {
    const flattenedCategoryNews = Object.values(categoryNews).flat().filter(a => typeof a === 'object' && a !== null);

    const combined = [
      ...(Array.isArray(techNews) ? techNews : []),
      ...(Array.isArray(customNews) ? customNews : []),
      ...flattenedCategoryNews,
      ...(Array.isArray(searchNews) ? searchNews : [])
    ];
    // Deduplicate by URL
    return combined.filter((v, i, a) => a && a.findIndex(t => t && t.url === v.url) === i);
  }, [techNews, customNews, categoryNews, searchNews]);

  const articleFromStore = useMemo(() => {
    if (state?.article) return state.article;
    const decodedId = decodeURIComponent(id);
    return allArticles.find(a => a.title === decodedId || a.title === id);
  }, [state?.article, id, allArticles]);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedArticle, setSearchedArticle] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!articleFromStore && id) {
      const decodedId = decodeURIComponent(id);
      setIsSearching(true);
      fetch(`/api/news?endpoint=everything&q="${encodeURIComponent(decodedId)}"&pageSize=1`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'ok' && data.articles.length > 0) {
            // Find the best match
            const match = data.articles.find(a => a.title === decodedId) || data.articles[0];
            setSearchedArticle(match);
          }
          setIsSearching(false);
        })
        .catch(err => {
          console.error('Search fallback error:', err);
          setIsSearching(false);
        });
    }
  }, [articleFromStore, id]);

  const activeArticle = articleFromStore || searchedArticle;

  const [summaryStatus, setSummaryStatus] = useState('idle');
  const [summaryText, setSummaryText] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (activeArticle?.url && summaryCache.has(activeArticle.url)) {
      setSummaryStatus('success');
      setSummaryText(summaryCache.get(activeArticle.url));
      setShowSummary(true);
    } else {
      setSummaryStatus('idle');
      setSummaryText('');
      setShowSummary(false);
    }
  }, [activeArticle?.url]);

  const handleSummarise = async () => {
    if (summaryStatus === 'success') {
      setShowSummary(!showSummary);
      return;
    }

    setSummaryStatus('loading');
    try {
      const summaryTextToUse = activeArticle.content || activeArticle.description;
      if (!summaryTextToUse) {
        setSummaryStatus('error');
        return;
      }

      // eslint-disable-next-line no-new-func
      const module = await new Function('return import("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2")')();
      const { pipeline, env } = module;

      env.allowLocalModels = false;

      const summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6', {
        progress_callback: (data) => {
          if (data.status === 'progress') {
            setLoadProgress(Math.round(data.progress));
          }
        }
      });

      const textToSummarize = `Title: ${activeArticle.title}\nDescription: ${activeArticle.description}\nContent: ${cleanArticleContent(activeArticle.content)}`;

      const output = await summarizer(textToSummarize, {
        max_new_tokens: 100,
        iteration_callback: () => {
        }
      });

      const rawSummary = output[0].summary_text;
      const sentences = rawSummary.split(/[.!?]+\s/).filter(s => s.length > 10).slice(0, 3);
      const formattedSummary = (sentences.map(s => `• ${s.trim()}.`).join('\n')) || rawSummary;

      summaryCache.set(activeArticle.url, formattedSummary);
      setSummaryText(formattedSummary);
      setSummaryStatus('success');
      setShowSummary(true);
    } catch (error) {
      console.error('Local summarisation error:', error);
      setSummaryStatus('error');
    }
  };

  if (!activeArticle) {
    return (
      <DetailContainer>
        <BackNav>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </BackNav>
        <ArticleHeader>
           <Title>{isSearching ? 'Searching...' : 'Story not found'}</Title>
           <Description>
             {isSearching ? 'Locating the article in our archives...' : "We couldn't locate the article you're looking for."}
           </Description>
        </ArticleHeader>
      </DetailContainer>
    );
  }

  const isBookmarked = bookmarks.some(b => b.title === activeArticle.title);

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
          <span>{activeArticle.source?.name || 'Top Stories'}</span>
          <span style={{opacity: 0.3}}>|</span>
          <span>5 min read</span>
        </MetaTop>
        <Title>{activeArticle.title}</Title>
        {activeArticle.description && <Description>{activeArticle.description}</Description>}
      </ArticleHeader>

      <MetaBar>
        <AuthorBlock>
          <div className="name"><span>By</span> {activeArticle.author || 'Editorial Staff'}</div>
          <div className="date">{formatDate(activeArticle.publishedAt)}</div>
        </AuthorBlock>
        <ActionGroup>
          <IconButton onClick={() => {
            if (navigator.share) {
                navigator.share({ title: activeArticle.title, url: activeArticle.url });
            }
          }} aria-label="Share story">
            <ShareIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={() => dispatch({ type: 'TOGGLE_BOOKMARK', payload: activeArticle })}
            aria-label={isBookmarked ? "Remove bookmark" : "Save story"}
            $active={isBookmarked}
          >
            {isBookmarked ? <BookmarkIcon sx={{ fontSize: 20 }} /> : <BookmarkBorderIcon sx={{ fontSize: 20 }} />}
          </IconButton>
        </ActionGroup>
      </MetaBar>

      <HeroSection>
        <ImageWithFallback src={activeArticle.urlToImage} alt={activeArticle.title} />
      </HeroSection>

      <MainContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SummariseBtn
              onClick={handleSummarise}
              disabled={summaryStatus === 'loading'}
              $loading={summaryStatus === 'loading'}
            >
              <span>✦</span>
              {summaryStatus === 'loading' ? (loadProgress < 100 ? `Downloading Model (${loadProgress}%)` : 'Summarising…') :
               summaryStatus === 'success' ? (showSummary ? 'Hide summary' : 'Read in 30 sec') :
               'Read in 30 sec'}
            </SummariseBtn>
            {summaryStatus === 'error' && <ErrorText>Summary unavailable</ErrorText>}
          </div>
          {summaryStatus === 'loading' && loadProgress > 0 && loadProgress < 100 && (
            <div style={{ width: '200px', height: '4px', background: '#eee', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${loadProgress}%`, height: '100%', background: '#F5A623', transition: 'width 0.3s' }} />
            </div>
          )}
        </div>

        {showSummary && summaryStatus === 'success' && (
          <SummaryBox>
            <ul>
              {summaryText
                .split('\n')
                .filter(line => line.trim())
                .map(line => {
                  const cleaned = line.trim();
                  if (cleaned.startsWith('•') || cleaned.startsWith('-') || cleaned.startsWith('*')) {
                    return cleaned.substring(1).trim();
                  }
                  return cleaned;
                })
                .map((line, i) => (
                  <li key={i}>{line}</li>
                ))
              }
            </ul>
          </SummaryBox>
        )}

        <BodyText>
          <span className="summary-label">Story Summary</span>
          <p>{cleanArticleContent(activeArticle.content) || activeArticle.description}</p>
          <ExternalLink href={activeArticle.url} target="_blank" rel="noopener noreferrer">
            Read full story at {activeArticle.source?.name || 'source'}
          </ExternalLink>
        </BodyText>

        {(() => {
          if (!activeArticle || !allArticles.length) return null;

          const stopwords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'on', 'that', 'with', 'for', 'was', 'at', 'by', 'as', 'an', 'be', 'this', 'from']);
          const getKeywords = (title) => {
            if (!title) return [];
            return title
              .toLowerCase()
              .replace(/[^\w\s]/g, '')
              .split(/\s+/)
              .filter(word => word.length > 2 && !stopwords.has(word))
              .slice(0, 5);
          };

          const currentKeywords = getKeywords(activeArticle.title);
          const currentSourceId = activeArticle.source?.id || activeArticle.source?.name?.toLowerCase()?.replace(/\s+/g, '-');
          const currentBias = BIAS_MAP[currentSourceId]?.label;

          const perspectives = allArticles
            .filter(a => a.url !== activeArticle.url) // Not the current article
            .filter((a, index, self) => self.findIndex(t => t.url === a.url) === index) // Unique by URL
            .filter(a => {
              const otherSourceId = a.source?.id || a.source?.name?.toLowerCase()?.replace(/\s+/g, '-');
              const otherBias = BIAS_MAP[otherSourceId]?.label;
              if (!otherBias || otherBias === currentBias) return false;

              const otherKeywords = new Set(getKeywords(a.title));
              const intersection = currentKeywords.filter(k => otherKeywords.has(k));
              return intersection.length >= 2;
            })
            .slice(0, 4);

          if (perspectives.length < 2) return null;

          return (
            <PerspectiveSection>
              <SectionHeading>More perspectives on this story</SectionHeading>
              <PerspectiveGrid>
                {perspectives.map((p, i) => (
                  <ArticleCard key={p.url + i} article={p} variant="compact" />
                ))}
              </PerspectiveGrid>
            </PerspectiveSection>
          );
        })()}
      </MainContent>
    </DetailContainer>
  );
};

export default ArticleDetail;
