import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -468px 0 }
  100% { background-position: 468px 0 }
`;

const SkeletonBase = styled.div`
  background: ${({ theme }) => theme.border};
  background-image: linear-gradient(to right, ${({ theme }) => theme.border} 0%, ${({ theme }) => theme.background} 20%, ${({ theme }) => theme.border} 40%, ${({ theme }) => theme.border} 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;
  animation: ${shimmer} 1.5s linear infinite forwards;
  border-radius: 4px;
`;

const SkeletonCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2.5rem;
  `}
  ${({ variant }) => variant === 'featured' && `grid-column: span 6;`}
  ${({ variant }) => variant === 'compact' && `grid-column: span 3;`}
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  aspect-ratio: 16/9;
  ${({ variant }) => variant === 'hero' && `grid-column: span 7; aspect-ratio: 4/3;`}
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  ${({ variant }) => variant === 'hero' && `grid-column: span 5;`}
`;

const SkeletonLine = styled(SkeletonBase)`
  height: ${({ height }) => height || '1rem'};
  width: ${({ width }) => width || '100%'};
`;

const SkeletonCard = ({ variant = 'compact' }) => (
  <SkeletonCardWrapper variant={variant}>
    <SkeletonImage variant={variant} />
    <SkeletonContent variant={variant}>
      <SkeletonLine width="30%" height="0.75rem" />
      <SkeletonLine width="90%" height="1.5rem" />
      <SkeletonLine width="100%" height="3rem" />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        <SkeletonLine width="40%" height="0.8rem" />
        <SkeletonLine width="20px" height="20px" />
      </div>
    </SkeletonContent>
  </SkeletonCardWrapper>
);

export default SkeletonCard;