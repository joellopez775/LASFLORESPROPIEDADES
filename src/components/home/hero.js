import React, { useContext, useEffect } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Container } from 'react-bootstrap';
import FormProperty from '../forms/properties';

const MainCont = styled.div`
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0; 
`;

export default ()=> {
  const state = useContext(context);

  useEffect(()=>{
    const tl = gsap.timeline();
    tl.from("#formSearch", { opacity: 0, y: 10, duration: 1.2, ease:"back.out(1.7)" });

    return ()=> {
      tl.kill();
    }
  },[]);

  return(
    <MainCont>
      <Container>
        <FormProperty id="formSearch" />
      </Container>
    </MainCont>
  )
}