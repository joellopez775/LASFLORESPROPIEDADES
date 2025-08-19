import React, { useContext, useState, Fragment } from 'react';
import context from '../context';
import styled from 'styled-components';
import HamburgerMenu from 'react-hamburger-menu';
import { Container } from 'react-bootstrap';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

import Logo from './logo';
import RateBar from './ratebar';
import { NavLink } from '../styled-components';

const Header = styled.header`
  //overflow: hidden;
  background-color: ${props => props.theme.primaryColor};
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: .5rem 0;
  z-index: 1000;
`
const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const NavPanel = styled.div`
  background-color: ${props => props.theme.primaryColor};
  height: calc(100vh - 81.38px);
  width: 100vw;
  transition: 500ms ease;
  position: fixed;
  left: ${props => props.visible ? "0" : "100vw"};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const NavList = styled.ul`
  list-style: none;
  padding: 0mm;
  margin: 0;
  display: ${props => props.horizontal ? "flex" : "block"};
  text-align: center;
`
const NavItem = styled.li`
  font-size: 2rem;
`

export default ()=> {
  const [open, setOpen] = useState(false);
  const state = useContext(context);
  return(
    <Fragment>
    <Header className="d-lg-none">
      <Container>
        <Navigation>
          <AniLink paintDrip hex={state.primaryColor} to="/" duration={.5}>
            <Logo mobile/>
          </AniLink>
          <HamburgerMenu
            isOpen={open}
            menuClicked={()=> setOpen(!open)}
            width={24}
            height={15}
            strokeWidth={2}
            rotate={0}
            color="#ffffff"
            borderRadius={0}
            animationDuration={0.5}
          />          
        </Navigation>
      </Container>
    </Header>
    <NavPanel visible={open}>
      <RateBar />
      <NavList>
        <NavItem>
          <AniLink paintDrip hex={state.primaryColor} to="/properties" onClick={()=> setOpen(false)} duration={.5}>
            <NavLink light>
              Propiedades
            </NavLink>
          </AniLink>
        </NavItem>
        <NavItem>
          <AniLink paintDrip hex={state.primaryColor} to="/about" onClick={()=> setOpen(false)} duration={.5}>
            <NavLink light>
              Nosotros
            </NavLink>
          </AniLink>
        </NavItem>
        <NavItem>
          <AniLink paintDrip hex={state.primaryColor} to="/contact" onClick={()=> setOpen(false)} duration={.5}>
            <NavLink light>
              Contacto
            </NavLink>
          </AniLink>
        </NavItem>                
      </NavList>
      <NavList horizontal>
        <NavItem>
          <AniLink href={state.facebook} target="_blank" rel="noopener">
            <NavLink light>
              <FacebookOutlined />
            </NavLink>
          </AniLink>
        </NavItem>           
        <NavItem>
          <AniLink href={state.instagram} target="_blank" rel="noopener">
            <NavLink light>
              <InstagramOutlined style={{ margin: "0 1rem" }} />
            </NavLink>
          </AniLink>
        </NavItem>           
        <NavItem>
          <AniLink href={state.twitter} target="_blank" rel="noopener">
            <NavLink light>
              <TwitterOutlined />
            </NavLink>
          </AniLink>
        </NavItem>                           
      </NavList>
    </NavPanel>
  </Fragment>      
  )
}