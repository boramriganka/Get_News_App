import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
`;

const Skeleton = styled.div`
  background: ${({ theme }) => theme.border};
  animation: ${pulse} 1.5s infinite ease-in-out;
  border-radius: 4px;
`;

const SkeletonWrapper = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
`;

const SkeletonImage = styled(Skeleton)`
  aspect-ratio: 16 / 9;
`;

const SkeletonText = styled(Skeleton)`
  height: 1rem;
  width: ${({ width }) => width || '100%'};
`;

const SkeletonCard = () => (
  <SkeletonWrapper>
    <SkeletonImage />
    <SkeletonText width="40%" />
    <SkeletonText />
    <SkeletonText width="80%" />
  </SkeletonWrapper>
);

export default SkeletonCard;
