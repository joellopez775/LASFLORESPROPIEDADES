import React, { useContext } from 'react';
import context from '../context';
import styled from 'styled-components';
import Contact from './contact';

import { Section } from '../styled-components';

import Map from './map';

const MainCont = styled(Section)`
  margin-bottom: 0;
`
const Title = styled.p`
  background-color: ${props => props.theme.primaryColor};
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  margin: 0;
  color: #fff;
`

export default ()=> {
  const state = useContext(context);
  return(
    <MainCont>
      <Title>
        {state.contact.map.title}
      </Title>
      {
        state.lat && (
          <Map
          lat={parseFloat(state.lat)}
          lng={parseFloat(state.lng)}
          height={300}
          zoom={3}
        />         
        )
      } 
    </MainCont>
  )
}