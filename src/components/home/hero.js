import React, { useContext, useState, useEffect } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Container } from 'react-bootstrap';
import { DownOutlined } from '@ant-design/icons';

import { Section } from '../../styled-components';
import FormProperty from '../forms/properties'
import FormCode from '../forms/code';
import { Agro } from '../../icons';

const MainCont = styled(Section)`
  background-image: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url("${props => props.src}");
  background-attachment: fixed;
  background-position: top;
  background-size: cover;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  text-align: center;
`

const SearchOptionCont = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  @media(min-width: 768px){

  }
`
const SearchOption = styled.button`
  background: transparent;
  width: 100%;
  padding: 1rem 0;
  color: ${props => props.active ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, .6)" };
  position: relative;
  border: none;
  font-weight: bold;
  display: flex;
  justify-content: center;
  transition: 250ms ease;
  @media(min-width: 768px){
    width: 25%;
  }
`
const ButtonLine = styled.div`
  position: absolute;
  bottom: .5rem;
  //left: 0;
  transition: 250ms ease;
  width: ${props => props.active ? "50%" : "0"};
  height: 3px;
  background-color: ${props => props.active ? props.theme.primaryColor : "transparent"};
`
const DownLink = styled.a`
  text-decoration: none;
  color: #fff !important;
  background-color: ${props => props.theme.primaryColor};
  transition: 250ms ease;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    filter: brightness(1.1);
  }
`

export default ()=> {
  const state = useContext(context);
  const [byCode, setByCode] = useState(false);
  useEffect(()=>{
    const tl = gsap.timeline();
    tl.from("#title", { opacity: 0, y: 10, duration: 1.5, ease:"back.out(1.7)" })
      .from("#search", { opacity: 0, y: 10, duration: 1, ease:"back.out(1.7)" }, "-=1")
      .from("#formSearch", { opacity: 0, y: 10, duration: 1.5, ease:"back.out(1.7)" }, "-=.5")
      .from("#downButton", { opacity: 0, y: 10, duration: 1.5, ease:"back.out(1.7)" }, "-=.5")
      .from("#downButton", { y: 5, repeat: -1, duration: 1.5, yoyo: true });
    
    return ()=> {
      tl.kill();
    }
  },[]);

  return(
    <MainCont 
      src={state.home.hero.background} first height="100vh"
    >
      <Container>
        <Title id="title" dangerouslySetInnerHTML={{ __html: state.home.hero.title }} />
        <SearchOptionCont id="search">
          <SearchOption active={!byCode} onClick={()=> setByCode(false)}>
            Buscar propiedad
            <ButtonLine active={!byCode} />
          </SearchOption>
          <SearchOption active={byCode} onClick={()=> setByCode(true)}>
            Buscar por código
            <ButtonLine active={byCode} />
          </SearchOption>          
        </SearchOptionCont>
        {
          byCode          
          ?<FormCode />
          :<FormProperty id="formSearch" />
        }
      </Container>
      <DownLink id="downButton" href="#properties">
        <DownOutlined />
      </DownLink>
    </MainCont>
  )
}