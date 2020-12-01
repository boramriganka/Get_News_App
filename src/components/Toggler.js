import React from 'react';
import { func, string } from 'prop-types';
import styled from "styled-components";
import Brightness4Icon from '@material-ui/icons/Brightness4';

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  flex-direction : column;
  justify-content : center;
  align-content : center;
  font-size:0.8rem;
  padding: 1rem;
  margin:1rem;
  `;
  const Text = styled.div`
  padding-top : 1rem;
  margin-bottom : 1rem;
  font : 1rem;
  font-weight :800;
  `;
const Toggle = ({theme,  toggleTheme }) => {
    return (
        <>
        <Button onClick={toggleTheme} >
            <Brightness4Icon/>
        </Button>
        <Text>Swich theme</Text>
        </>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;
