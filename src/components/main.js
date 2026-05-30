import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomNews } from "../actions/fetch_custom_news";
import styled from 'styled-components';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const PageContainer = styled.div`
  padding: 2rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h1`
  font-size: clamp(3rem, 10vw, 6rem);
  line-height: 1;
  margin: 0;
  letter-spacing: -0.04em;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
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

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 3rem;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex: 1;
  min-width: 300px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .form-control {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  label {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: '↓';
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-weight: 900;
    opacity: 0.5;
  }
`;

const CustomSelect = styled.select`
  appearance: none;
  padding: 0.85rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.text};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.text}11;
  }
`;

const UpdateButton = styled.button`
  padding: 0 2rem;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  border: none;
  border-radius: 4px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  height: 48px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingGrid = () => (
    <Grid>
        {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} variant={i === 0 ? 'hero' : i < 3 ? 'featured' : 'compact'} />
        ))}
    </Grid>
);

const Main = () => {
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleInfoClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleInfoClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const customNewsSelector = useSelector((state) => state.CustomSearch);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        // Fetch sources
        fetch(`/api/news?endpoint=top-headlines/sources`)
            .then(res => res.json())
            .then(response => {
                if (response.status === 'ok') {
                    setSources(response.sources);
                }
            })
            .catch(err => {
                console.error('Sources Fetch Error:', err);
            });

        // Fetch initial top headlines if articles are empty
        fetch(`/api/news?endpoint=top-headlines&country=us`)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'ok') {
                    dispatch({ type: 'FETCH_CUSTOM_NEWS', payload: res.articles });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Initial News Fetch Error:', err);
                setLoading(false);
            });
    }, [dispatch]);

    const getNews = async (e) => {
        e.preventDefault();
        if (source && source !== "nothing") {
            setUpdating(true);
            await dispatch(fetchCustomNews(source));
            setUpdating(false);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    }

    const articles = customNewsSelector.customNews;

    return (
        <PageContainer>
            <HeaderSection>
                <Title>
                  Journal Dispatch
                  <InfoButton onClick={handleInfoClick}>
                    <InfoIcon sx={{ fontSize: 32 }} />
                  </InfoButton>
                </Title>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleInfoClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    sx: {
                      p: 3,
                      maxWidth: 350,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      borderRadius: '12px'
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontFamily: 'Inter' }}>
                    About Political Bias Labels
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    These labels represent approximations of news source positioning (Left, Centre-Left, Centre, Centre-Right, Right) for informational context. They are not editorial judgments and should be used to understand diverse perspectives.
                  </Typography>
                </Popover>
                <Subtitle>
                    {sources.length || '...'} curated sources at your fingertips.
                </Subtitle>

                <Controls>
                    <Form onSubmit={getNews}>
                        <div className="form-control">
                            <label>Select Publication</label>
                            <SelectWrapper>
                                <CustomSelect onChange={e => setSource(e.target.value)} value={source}>
                                    <option value="nothing">Choose a source...</option>
                                    {sources.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </CustomSelect>
                            </SelectWrapper>
                        </div>
                        <UpdateButton type="submit" disabled={updating || !source || source === "nothing"}>
                            {updating ? 'Updating...' : 'Update Feed'}
                        </UpdateButton>
                    </Form>
                </Controls>
            </HeaderSection>

            {loading || updating ? (
                <LoadingGrid />
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
                    <p style={{fontSize: '1.5rem', opacity: 0.4, fontFamily: 'var(--font-serif)', fontStyle: 'italic'}}>
                        Select a source to begin your reading experience.
                    </p>
                </div>
            )}
        </PageContainer>
    );
}

export default Main;
