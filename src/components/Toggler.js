import React from 'react';
import { func, string } from 'prop-types';
import styled from "styled-components";
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

const Toggle = ({theme,  toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} title="Toggle Dark/Light Mode">
            <Brightness4Icon/>
        </Button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;
