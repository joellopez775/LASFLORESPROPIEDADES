import React, { useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { priceFormat, truncate } from '../../util';
import { Site, Surface, Parking, Bath, Rooms } from '../../icons';

const AniLinkCustom = styled(AniLink)`
  color: inherit !important;
  display: block;
  border-radius: 6px;
  overflow: hidden;
  transition: 250ms ease;
  &:hover {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .08),
                0px 2px 4px rgba(0, 0, 0, .08),
                0px 8px 8px rgba(0, 0, 0, .08);
  }
`;

const Card = styled.div`
  width: 95%;
  border: 1px solid rgba(0, 0, 0, .05);
  background-color: #F5F6F7;
  min-height: 496.09px;
  position: relative;
  @media(min-width: 768px){
    width: 100%;
    margin:0;
  }
`;
const Image = styled.div`
  width: 100%;
  padding-top: 75%;
  background-image: url("${props => props.src}");
  background-size: cover;
  background-position: center;
`;
const InfoCont = styled.div`
  padding: 0 1rem; 
`;
const TitleCont = styled.div`
  padding-top: 1rem;
  font-size: .8rem;
`;
const Title = styled.p`
  margin: 0;
  font-family: 'Raleway', sans-serif !important;
  min-height: 50px;
  font-weight: bold;
  color: #3C3C3C;
`;
const Price = styled.p`
  margin: 0;
  font-family: 'Raleway', sans-serif !important;
  font-size: 1rem; /* aumentado para destacar */
  font-weight: 600;
  color: #4B6A78; /* tono más oscuro y sobrio, ligeramente azulado */
`;
const Code = styled.p`
  margin: 0;
  font-family: 'Raleway', sans-serif !important;
  color: #9BA7B4;
`;
const CharsList = styled.ul`
  padding: 1rem 0;
  margin: 0;
  color: #6F6F6F;
  font-size: .8rem;
  font-family: 'Raleway', sans-serif !important;
  span {
    margin-left: .5rem;
  }
`;
const CharItem = styled.li`
  display: flex;
  align-items: center;
  font-family: 'Raleway', sans-serif !important;
  padding-bottom: .3rem;
`;

const Tag = styled.div`
  background-color: #F7D0F4;
  color: #3C3C3C;
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  font-size: 15px;
  padding: .1rem 2rem;
  transform: rotate(-45deg);
  box-shadow: 0px 2px 15px rgba(0,0,0, .3);
`;

const getCategoryByCode = (title) => {
  if (typeof title !== 'string') return 'Categoría Desconocida';
  const categoryMapping = {
    '01': 'Casa', '02': 'Departamento', '03': 'Oficina',
    '04': 'Sitio', '05': 'Local', '08': 'Industrial',
    '09': 'Agrícola', '13': 'Agrícola', '10': 'Agrícola',
    '14': 'Parcela', '15': 'Estacionamiento', '16': 'Terreno',
    '17': 'Bodega', '30': 'Negocio/Patentes/Derechos de llave',
    '31': 'Residencial/Pieza', '32': 'Hotel/Apart',
    '33': 'Complejo Turístico', '34': 'Departamento Amoblado'
  };
  const digits = title.match(/^\d{1,2}/);
  const foundCategory = digits ? digits[0].padStart(2, '0') : null;
  return categoryMapping[foundCategory] || 'Categoría Desconocida';
};

export default ({
  mainImage, title, value, currency, code, valueUf,
  ubication, characteristics, _id, operation, status
}) => {
  const state = useContext(context);
  const visibleTag = status === "VENDIDA" || status === "ARRENDADA";
  return (
    <AniLinkCustom paintDrip hex={state.primaryColor} to={`/property?id=${_id}`} duration={.5}>
      <Card>
        {visibleTag && (
          <Tag top={status === "VENDIDA" ? "22px" : "28px"} left={status === "VENDIDA" ? "-32px" : "-38px"}>
            {status}
          </Tag>
        )}
        <Image src={mainImage} />
        <InfoCont>
          <TitleCont>
            <Title>{getCategoryByCode(title)} {title.replace(/\d+/, '').trim()}</Title>
            <Price>
              {operation === "VENTA" ? `UF ${valueUf}` : operation === "ARRIENDO" ? `CLP ${priceFormat(value)}` : null}
            </Price>
            <Code><strong>{operation} - </strong>{code}</Code>
          </TitleCont>
          <CharsList>
            <CharItem><Site /><span>{ubication.commune}</span></CharItem>
            {characteristics.filter(char => (
              ["Superficie total", "Superficie útil", "Dormitorios", "Baños", "Estacionamientos"].includes(char.name)
            )).map((char, index) => (
              <CharItem key={index}>
                {(char.name.includes("Superficie") && <Surface />) ||
                 (char.name === "Dormitorios" && <Rooms />) ||
                 (char.name === "Baños" && <Bath />) ||
                 (char.name === "Estacionamientos" && <Parking />)}
                <span>{char.name} {char.value} {(char.name.includes("Superficie")) && "mt2"}</span>
              </CharItem>
            ))}
          </CharsList>
        </InfoCont>
      </Card>
    </AniLinkCustom>
  );
};