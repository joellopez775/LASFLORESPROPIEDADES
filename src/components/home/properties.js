import React, { useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Container } from 'react-bootstrap';
import { RightOutlined } from '@ant-design/icons';
import Carousel from '../carousels/properties';

// ---------- estilos (idénticos a tu mock de diseño) ----------
const Wrap = styled.section`
  background:#fff;
  padding: 48px 0 56px;
`;

const Overline = styled.div`
  display:flex;
  align-items:center;
  gap:.6rem;
  font-size:.95rem;
  letter-spacing:.12em;
  font-weight:700;
  color:#6b7280;
  margin-bottom: 8px;

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
  font-size: clamp(2rem, 3.6vw, 4.2rem);
  line-height: 1.05;
  font-weight: 800;
  color:#222;
  margin: 0 0 28px;
`;

const CTA = styled(AniLink)`
  display:inline-flex;
  align-items:center;
  gap:16px;
  text-decoration:none;
  font-weight:800;
  color:#111;
  margin: 10px 0 36px 0;

  .square{
    width:64px; height:64px;
    background:#F9A200;
    display:grid; place-items:center;
    border-radius:4px;
  }
  .label{
    font-size:1.05rem;
    letter-spacing:.06em;
  }

  &:hover .square{
    filter:brightness(0.95);
  }
`;

// contenedor para el carrusel (espaciado y alto mínimo como en el diseño)
const CarouselHolder = styled.div`
  margin-top: 8px;
  margin-bottom: 28px;
  min-height: 420px; /* asegura altura mientras carga */
`;

// ---------- componente ----------
export default function PropertiesFeatured(){
  const state = useContext(context);

  return (
    <Wrap id="properties">
      <Container>
        <Overline>NUESTRO SERVICIO</Overline>
        <H1>Propiedades Destacadas</H1>

        {/* CTA a la izquierda */}
        <CTA paintDrip hex={state.primaryColor} to="/properties" duration={.5}>
          <span className="square">
            <RightOutlined style={{ fontSize: 22, color: '#111' }} />
          </span>
          <span className="label">VER MÁS</span>
        </CTA>

        {/* Carrusel (aquí queda la llamada a la API) */}
        <CarouselHolder>
          <Carousel />
        </CarouselHolder>
      </Container>
    </Wrap>
  );
}