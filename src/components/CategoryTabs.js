import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ChipsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1rem 1.5rem;
  gap: 0.75rem;
  background: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 769px) {
    justify-content: center;
  }
`;

const Chip = styled(Link)`
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid ${({ theme, $active }) => $active ? theme.text : theme.border};
  background: ${({ theme, $active }) => $active ? theme.text : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.body : theme.textSecondary};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.text};
  }
`;

const categories = [
  { name: 'All', path: '/' },
  { name: 'Tech', path: '/category/technology' },
  { name: 'Business', path: '/category/business' },
  { name: 'Science', path: '/category/science' },
  { name: 'Health', path: '/category/health' },
  { name: 'Entertainment', path: '/category/entertainment' },
  { name: 'Sports', path: '/category/sports' }
];

const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
  return (
    <ChipsContainer>
      {categories.map(cat => (
        <Chip
          key={cat.name}
          to={cat.path}
          $active={activeCategory === cat.name}
          onClick={() => setActiveCategory && setActiveCategory(cat.name)}
        >
          {cat.name}
        </Chip>
      ))}
    </ChipsContainer>
  );
};

export default CategoryTabs;
