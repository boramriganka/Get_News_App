import React from 'react';
import styled from 'styled-components';
import { BIAS_MAP } from '../data/sourceBias';

const Pill = styled.span`
  background: ${props => props.$color}26; // 15% opacity
  color: ${props => props.$color};
  border: 1px solid ${props => props.$color}4D; // 30% opacity
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
  white-space: nowrap;
`;

const BiasLabel = ({ sourceId }) => {
  const bias = BIAS_MAP[sourceId];

  if (!bias) return null;

  return (
    <Pill $color={bias.color}>
      {bias.label}
    </Pill>
  );
};

export default BiasLabel;
