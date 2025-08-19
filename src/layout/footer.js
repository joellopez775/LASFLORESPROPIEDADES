import React, { useContext } from 'react';
import context from '../context';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { MailOutlined, PhoneOutlined, WhatsAppOutlined, EnvironmentOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined, UpOutlined } from '@ant-design/icons';

import Logo from './logo';
import { NavLink } from '../styled-components';
import Map from '../components/map';

const Footer = styled.footer`
  padding: 1rem 0 0;
`
const FooterText = styled.p`
  color: gray;
  font-size: .8rem;
  text-align: justify;
`
const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 1rem;
`
const InfoItem = styled.li`
  color: gray;
  font-size: .8rem;
  margin-bottom: .5rem;
  display: flex;
  align-items: center;
  span{
    margin-right: .3rem;
  }
`
const InfoLink = styled.a`
  color: gray !important;
  &:hover{
    text-decoration: underline !important;
  }
`
const NavCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  margin-bottom: 1rem;
`
const NavItem = styled.li`
font-size: .8rem;
`
const SocialCont = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media(min-width: 992px){
    margin-bottom: 0;
  }
`
const SocialItem = styled.span`
  color: ${props => props.icon ? "#fff" : "gray"};
  font-size: .8rem;
`
const SocialLink = styled.a`
  color: gray;
  margin-left: .5rem;
  &:hover{
    color: ${props => props.theme.primaryColor};
  }
`
const BackTop = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.theme.primaryColor};
  margin-bottom: 1rem;
  transition: 250ms ease;
  color: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, .12),
              0px 2px 2px rgba(0, 0, 0, .12),
              0px 4px 4px rgba(0, 0, 0, .12),
              0px 8px 8px rgba(0, 0, 0, .12);
  &:hover{
    filter: brightness(1.1);
  };
  &:active{
    box-shadow: none;
  }
`

const CopyrightCont = styled.div`
  padding: .3rem 0;
  color: #fff;
  background-color: ${props => props.theme.primaryColor};
  font-size: .7rem;
  margin-top: 1rem;
`
const CopyrightInnerCont = styled.div`
  display: flex;
  justify-content: space-between;
`
const DevelopedBy = styled.a`
  color: #fff !important;
  transition: 250ms ease;
  font-weight: bold;
  &:hover{
    text-decoration: underline !important;
  }
`

export default ()=> {
  const state = useContext(context);

  return(
    <Footer>
      <Container>
        <Row className="align-items-center">
          <Col xs={{ span: 6, order: 6 }} md={{ span: 6, order: 0 }} lg={4}>
            <AniLink paintDrip hex={state.primaryColor} to="/" duration={.5}>
              <Logo dark />
            </AniLink>
            <InfoList>
              {
                state.address && (
                  <InfoItem>
                    <EnvironmentOutlined />
                    {state.address}
                  </InfoItem>                  
                )
              }
              {
                state.email && (
                  <InfoItem>
                    <MailOutlined />
                    <InfoLink title="Enviar un email" href={`mailto:${state.email}`}>
                      {state.email}
                    </InfoLink>
                  </InfoItem>                  
                )
              }
              {
                state.phone && (
                  <InfoItem>
                    <PhoneOutlined />
                    <InfoLink title="Llamar" href={`tel:${state.phone.replace(/\s/g,'')}`}>
                      {state.phone}
                    </InfoLink>
                  </InfoItem>                
                )
              }
              {
                state.movil && (
                  <InfoItem>
                    <WhatsAppOutlined />
                    <InfoLink title="Enviar WhatsApp" rel="noopener" target="_blank" href={`https://api.whatsapp.com/send?phone=${state.movil.replace(/\s/g,'')}&text=Hola,%20estoy%20visitando%20su%20sitio%20Web%20y%20quisiera%20comunicarme%20con%20uestedes.`}>
                      {state.movil}
                    </InfoLink>
                  </InfoItem>                      
                )
              }          
            </InfoList>
          </Col>
          <Col xs={12} md={6} lg={5}>
            <NavCont>
              <NavList>
                <NavItem>
                  <AniLink paintDrip hex={state.primaryColor} to="/properties" duration={.5}>
                    <NavLink first>
                      Propiedades
                    </NavLink>
                  </AniLink>            
                </NavItem>
                <NavItem>
                  <AniLink paintDrip hex={state.primaryColor} to="/about" duration={.5}>
                    <NavLink>
                      Nosotros
                    </NavLink>
                  </AniLink>            
                </NavItem>                  
                <NavItem>
                  <AniLink paintDrip hex={state.primaryColor} to="/contact" duration={.5}>
                    <NavLink >
                      Contacto
                    </NavLink>
                  </AniLink>                                    
                </NavItem>
                 
              </NavList>            
              <FooterText>
                {state.footerText}
              </FooterText>
            </NavCont>
          </Col>                          
          <Col xs={{ span: 6, order: 12 }} md={12} lg={3}>
            <NavCont className="align-items-end">
              <BackTop onClick={()=> window.scrollTo(0, 0)} href="#top">
                <UpOutlined />
              </BackTop>                        
              <SocialCont>
                <SocialItem>Síguenos en:</SocialItem>
                <SocialLink href={state.facebook} rel="noopener" target="_blank">
                  <FacebookOutlined />
                </SocialLink>
                <SocialLink href={state.facebook} rel="noopener" target="_blank">
                  <InstagramOutlined />
                </SocialLink>
                <SocialLink href={state.facebook} rel="noopener" target="_blank">
                  <TwitterOutlined />
                </SocialLink>                                    
              </SocialCont>                  
            </NavCont>
          </Col>
        </Row>
      </Container>
      <CopyrightCont>
        <Container>
          <CopyrightInnerCont>
            <span>{new Date().getFullYear()} © Todos los derechos reservados</span>
            <div>
              Desarrollado por <DevelopedBy href="https://nexxoschile.cl" rel="noopener" target="_blank">Nexxos Chile</DevelopedBy>
            </div>
          </CopyrightInnerCont>
        </Container>
      </CopyrightCont>
    </Footer>
  )
}