import React, { useContext } from 'react';
import context from '../context';
import styled from 'styled-components';

const Logo = styled.img`
  width: 80%;
  max-width: 280px;
  height: auto;
  object-fit: contain;
  object-position: center;
  position: relative;
  top: -10px;   /* lo sube */
  left: -10px;  /* lo mueve a la izquierda */

  @media (min-width: 768px) {
    max-width: 400px;
    top: -20px;
    left: -20px; /* más hacia la izquierda en pantallas grandes */
  }
`

export default ({ dark, mobile })=> {
  const state = useContext(context);
  return(
      <Logo src={dark ? state.logoDark : mobile ? require("../images/logo-light-mobil.png") : state.logo} alt="Logo" />
  )
}