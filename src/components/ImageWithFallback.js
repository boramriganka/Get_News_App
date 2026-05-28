import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.border}44;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const Fallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textSecondary};
  font-family: var(--font-serif);
  font-weight: 700;
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.border}22;

  span {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    font-family: var(--font-sans);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
    } else {
        setError(false);
        setLoaded(false);
    }
  }, [src]);

  return (
    <Wrapper className={className}>
      {error ? (
        <Fallback>
          JOURNAL<span>No image available</span>
        </Fallback>
      ) : (
        <Img
          src={src}
          alt={alt}
          $loaded={loaded}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </Wrapper>
  );
};

export default ImageWithFallback;
