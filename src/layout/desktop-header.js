import React, { useContext, useState, Fragment } from 'react';
import context from '../context';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import AniLink from "gatsby-plugin-transition-link/AniLink";

import RateBar from './ratebar';
import Logo from './logo';
import { NavLink, NavButton } from '../styled-components';

const Header = styled.header`
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`
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
                <NavLink dark={dark} light={!dark}>
                  Contacto
                </NavLink>
              </AniLink>                                    
            </NavItem>
          </NavList>
        </Navigation>
      </Container>
    </Header>    
  )
}