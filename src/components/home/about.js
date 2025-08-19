import React, { useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { Container } from 'react-bootstrap';

const Wrap = styled.section`
  position: relative;
  color: #fff;
  /* imagen de fondo + overlay oscuro */
  background-image:
    linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)),
    url("${p => p.bg || ''}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* altura tipo hero */
  min-height: clamp(420px, 72vh, 760px);
  display: flex;
  align-items: center;

  /* una “línea” sutil a la izquierda como en el diseño */
  &:before{
    content:'';
    position:absolute;
    left: 48px;
    top: 48px;
    bottom: 48px;
    width: 2px;
    background: rgba(255,255,255,.18);
    pointer-events:none;
  }

  @media (max-width: 575px){
    &:before{ left: 20px; top: 24px; bottom: 24px; }
  }
`;

const Content = styled.div`
  max-width: 780px;
  padding: 24px 0;
  margin-left: 72px;

  @media (max-width: 991px){
    margin-left: 32px;
  }
  @media (max-width: 575px){
    margin-left: 0;
  }
`;

const Brand = styled.div`
  display:flex;
  align-items:flex-end;
  gap: 14px;
  margin-bottom: 10px;

  img{
    height: 64px;
    width: auto;
    object-fit: contain;
  }

  .tagline{
    font-size: .95rem;
    opacity: .9;
  }

  @media (max-width: 575px){
    img{ height: 52px; }
  }
`;

const Overline = styled.div`
  display:flex;
  align-items:center;
  gap:.6rem;
  font-size:.95rem;
  letter-spacing:.12em;
  font-weight:700;
  color: rgba(255,255,255,.9);
  margin: 8px 0 14px;

  &:before{
    content:'';
    display:inline-block;
    width:12px; height:12px;
    border-left: 6px solid ${p => p.theme.primaryColor};
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 0;
  }
`;

const H1 = styled.h2`
  font-size: clamp(2.2rem, 5vw, 5rem);
  line-height: 1.05;
  font-weight: 800;
  margin: 0 0 18px;
  letter-spacing: .01em;
`;

const Lead = styled.p`
  font-size: clamp(1.05rem, 1.3vw, 1.35rem);
  line-height: 1.6;
  margin: 0 0 26px;
  max-width: 56ch;
  color: rgba(255,255,255,.92);
`;

const CTA = styled(AniLink)`
  display:inline-flex;
  align-items:center;
  gap:16px;
  text-decoration:none;
  font-weight:800;
  color:#fff;

  .square{
    width:64px; height:64px;
    background:#F9A200;   /* amarillo del diseño */
    display:grid; place-items:center;
    border-radius:4px;
  }
  .arrow{
    width: 0; height: 0;
    border-left: 16px solid #111;   /* flecha “play” negra */
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .label{
    font-size:1.05rem;
    letter-spacing:.06em;
  }

  &:hover .square{
    filter:brightness(.95);
  }
`;

export default function AboutBanner(){
  const state = useContext(context);
  const data = state?.home?.about?.banner || {};

  return (
    <Wrap bg={data.image}>
      <Container>
        <Content>
          {/* Si tienes un logo en tu state, muéstralo arriba */}
          {state?.brand?.logo && (
            <Brand>
              <img src={state.brand.logo} alt="Las Flores" />
              {state?.brand?.tagline && <span className="tagline">{state.brand.tagline}</span>}
            </Brand>
          )}

          <Overline>NOSOTROS</Overline>

          <H1>{data.title}</H1>
          <Lead>{data.subTitle}</Lead>

          <CTA paintDrip hex={state.primaryColor} to="/about" duration={.5}>
            <span className="square"><span className="arrow" /></span>
            <span className="label">{data.buttonText || 'LEER MÁS'}</span>
          </CTA>
        </Content>
      </Container>
    </Wrap>
  );
}