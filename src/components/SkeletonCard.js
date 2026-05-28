import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const SkeletonBase = styled.div`
  background: ${({ theme }) => theme.border}44;
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  width: 100%;

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 3rem;
    padding-bottom: 3.5rem;
    @media (max-width: 968px) {
      display: flex;
      flex-direction: column;
    }
  `}

  ${({ variant }) => variant === 'featured' && `
    grid-column: span 6;
  `}

  ${({ variant }) => variant === 'compact' && `
    grid-column: span 3;
    @media (max-width: 1024px) { grid-column: span 4; }
  `}
`;

const SkeletonImage = styled(SkeletonBase).withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  aspect-ratio: 16 / 10;
  width: 100%;

  ${({ variant }) => variant === 'hero' && `
    grid-column: span 8;
    aspect-ratio: 3 / 2;
  `}
`;

const SkeletonContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ variant }) => variant === 'hero' && `grid-column: span 4;`}
`;

const SkeletonMeta = styled(SkeletonBase)`
  width: 100px;
  height: 12px;
`;

const SkeletonTitle = styled(SkeletonBase)`
  width: 100%;
  height: 24px;
`;

const SkeletonText = styled(SkeletonBase)`
  width: 90%;
  height: 14px;
`;

const SkeletonCard = ({ variant = 'compact' }) => {
  return (
    <SkeletonWrapper variant={variant}>
      <SkeletonImage variant={variant} />
      <SkeletonContent variant={variant}>
        <SkeletonMeta />
        <SkeletonTitle />
        <SkeletonTitle style={{ width: '80%' }} />
        {(variant === 'hero' || variant === 'featured') && (
            <>
                <SkeletonText />
                <SkeletonText />
                <SkeletonText style={{ width: '60%' }} />
            </>
        )}
      </SkeletonContent>
    </SkeletonWrapper>
  );
};

export default SkeletonCard;
