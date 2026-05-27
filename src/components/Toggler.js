import React from 'react';
import styled from 'styled-components';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ToggleContainer = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 3rem;
  height: 1.5rem;
  align-items: center;

  svg {
    height: auto;
    width: 1rem;
    transition: all 0.3s linear;
  }
`;

const Toggle = ({theme, toggleTheme}) => {
    return (
        <ToggleContainer onClick={toggleTheme} >
            {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </ToggleContainer>
    );
};

export default Toggle;
