import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;
  gap: 1.5rem;
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 12px;
  margin: 2rem 0;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.border}44;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textSecondary};
`;

const Title = styled.h3`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.text};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  max-width: 400px;
  line-height: 1.6;
`;

const BrowseButton = styled.button`
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  border: none;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EmptyState = ({ title, message, icon: Icon = BookmarkBorderIcon }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <IconWrapper>
        <Icon sx={{ fontSize: 40 }} />
      </IconWrapper>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <BrowseButton onClick={() => navigate('/')}>Explore Stories</BrowseButton>
    </Container>
  );
};

export default EmptyState;
