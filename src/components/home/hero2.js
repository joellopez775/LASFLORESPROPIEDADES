import React, { useContext, useState, useEffect } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Container } from 'react-bootstrap';
import { DownOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { Section } from '../../styled-components';
// Si más adelante usas estos, puedes reactivarlos:
// import FormProperty from '../forms/properties'
// import FormCode from '../forms/code';

const MainCont = styled(Section)`
  background-image: linear-gradient(rgba(0, 0, 0, .55), rgba(0, 0, 0, .55)), url("${props => props.src}");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const HeroContent = styled.div`
  max-width: 880px;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  margin: 0 0 1rem 0;
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: 0.5px;
  /* Responsive: de ~36px a ~96px */
  font-size: clamp(2.25rem, 6vw, 6rem);
`;

const HeroText = styled.p`
  margin: 0 0 1.5rem 0;
  max-width: 46rem;
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  line-height: 1.6;
  color: rgba(255,255,255,.9);
`;

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: .9rem;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  letter-spacing: .5px;
  font-size: .95rem;
  transition: transform .15s ease;

  &:hover { transform: translateY(-1px); }
`;

const CtaSquare = styled.span`
  width: clamp(40px, 4.5vw, 56px);
  height: clamp(40px, 4.5vw, 56px);
  border-radius: 4px;
  background: #F9A200;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .anticon {
    font-size: clamp(18px, 2.2vw, 24px);
    color: #fff;
  }
`;

const DownLink = styled.a`
  text-decoration: none;
  color: #fff !important;
  background-color: ${props => props.theme.primaryColor};
  transition: 250ms ease;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{ filter: brightness(1.1); }
`;

export default () => {
  const state = useContext(context);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from("#heroTitle", { opacity: 0, y: 10, duration: 1.2, ease: "back.out(1.7)" })
      .from("#heroText", { opacity: 0, y: 10, duration: 1, ease: "back.out(1.7)" }, "-=.6")
      .from("#heroCta", { opacity: 0, y: 10, duration: .9, ease: "back.out(1.7)" }, "-=.6")
      .from("#downButton", { opacity: 0, y: 10, duration: 1, ease: "back.out(1.7)" }, "-=.5")
      .to("#downButton", { y: 6, repeat: -1, yoyo: true, duration: 1.4, ease: "power1.inOut" });

    return () => tl.kill();
  }, []);

  return (
    <MainCont src={state.home.hero.background} first height="100vh">
      <Container>
        <HeroContent>
          {/* Título (puedes reemplazar por state.home.hero.title si prefieres HTML) */}
          <HeroTitle id="heroTitle">DOS RÍOS</HeroTitle>

          {/* Descripción */}
          <HeroText id="heroText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Ubicada a solo 20 minutos de Pucón.
          </HeroText>

          {/* Botón VER MÁS */}
          <CtaButton id="heroCta" href="#properties">
            <CtaSquare><ArrowRightOutlined /></CtaSquare>
            VER MÁS
          </CtaButton>
        </HeroContent>
      </Container>

      {/* Flecha abajo flotante */}
      <DownLink id="downButton" href="#properties">
        <DownOutlined />
      </DownLink>
    </MainCont>
  );
};