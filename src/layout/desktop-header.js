import React, { useContext, useState, Fragment } from 'react';
import context from '../context';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import AniLink from "gatsby-plugin-transition-link/AniLink";

import RateBar from './ratebar';
import Logo from './logo';
import { NavLink, NavButton } from '../styled-components';

const Header = styled.header`
  background-color:  ${props => props.theme.primaryColor};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;


  `

const ContactButton = styled(NavLink)`
  background-color: #F9A200;
  color: #fff !important;
  padding: 0.6rem 1.5rem;
  border-radius: 999px; /* Esto lo convierte en óvalo */
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e08f00;
    text-decoration: none;
  }
`;
const Navigation = styled.nav`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${props => props.horizontal ? "flex" : "block"};
  text-align: center;
`
const NavItem = styled.li`
  
`

export default ({ dark })=> {
  const state = useContext(context);

  return(
    <Header className="d-none d-lg-block">
      <RateBar />
      <Container>
        <Navigation>
          <AniLink paintDrip hex={state.primaryColor} to="/" duration={.5}>
            <Logo dark={dark} light={!dark} />
          </AniLink>
          <NavList horizontal>
            <NavItem>
              <AniLink paintDrip hex={state.primaryColor} to="/properties" duration={.5}>
                <NavLink dark={dark} light={!dark}>
                  Propiedades
                </NavLink>
              </AniLink>            
            </NavItem>
            <NavItem>
              <AniLink paintDrip hex={state.primaryColor} to="/about" duration={.5}>
                <NavLink dark={dark} light={!dark}>
                  Nosotros
                </NavLink>
              </AniLink>            
            </NavItem>
            <NavItem>
              <AniLink paintDrip hex={state.primaryColor} to="/contact" duration={.5}>
               <ContactButton dark={dark} light={!dark}>
               Contacto
               </ContactButton>
              </AniLink>                                    
            </NavItem>
          </NavList>
        </Navigation>
      </Container>
    </Header>    
  )
}