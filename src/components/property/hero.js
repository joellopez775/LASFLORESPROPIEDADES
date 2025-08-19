import React, { Fragment, useEffect, createContext, useReducer, useContext } from 'react';
import styled from 'styled-components';
import context from '../../context/property';
import { Container, Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { truncate, priceFormat } from '../../util';

import { Section } from '../../styled-components';
import { Site, Surface, Rooms, Bath, Parking } from '../../icons';

const ImageGalleryCustom = styled(ImageGallery)`

`

const Image = styled.div`
  width: 100%;
  padding-top: 75%;
  position: relative;
  background-image: url("${props => props.src}");
  background-color: #000;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  ::before{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    backdrop-filter: blur(6px);
  }
  ::after{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    background-image: url("${props => props.src}");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }  
`
const IframeCont = styled.div`
  width: 100%;
  padding-top: 75%;
  position: relative;
`
const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  height:100%;
  width:100%;
  border: 0;
`

const InteractiveCont = styled.div`
  margin:0px;
  padding:0px;
  @media(min-width:768px){
    min-height: 50vh;
  }
`
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  z-index: 500;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.theme.primaryColor};
  border: none;
  transition: 250ms ease;
  margin: 0 .5rem;
  color: #fff;
  @media(min-width:768px){

  }
  &:hover{
    filter: brightness(1.1);
  }
`
const NavButtonLeft = styled(NavButton)`

`
const NavButtonRight = styled(NavButton)`
  right: 0;
`
const InfoContainer = styled.div`
  width: 100%;
  padding-top: 93.33%;
  position: relative;
`
const InfoContainerInner = styled.div` 
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  //border: 1px solid red;
`
const Code = styled.p`
  font-size: .8rem;
  text-transform: capitalize;
  font-weight: bold;
`
const Title = styled.h2`
  color: ${props => props.theme.primaryColor};
  font-weight: 500;

`
const Price = styled(Title)`
  span{
    font-size: 1.5rem;
  }
`
const CharsCont = styled.div`

`
const CharList = styled.ul`
  list-style: none;
  padding: 0;
`
const CharItem = styled.p`
  color: ${props => props.theme.primaryColor};
  display: flex;
  align-items: center;
  margin: 0;
  margin-top: .5rem;
  span{
    color: #979797;
    margin-left: .3rem;
    font-size: .8rem;
  }
`

const InteractiveAsset = (item, interactive, provider)=> {

  return(
    <InteractiveCont>
      {
        item.provider
        ?(
          <IframeCont>
            <Iframe
              height="100%" width="100%"
              src={item.url}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen=""
            />
          </IframeCont>
        )
        :(
          <Image src={item.url} />
        )
      }
    </InteractiveCont>
  )
}
const getCategoryByCode = (title) => {
  if (typeof title !== 'string') {
    return 'Categoría Desconocida';
  }

  const categoryMapping = {
    '01': 'Casa',
    '02': 'Departamento',
    '03': 'Oficina',
    '04': 'Sitio',
    '05': 'Local',
    '08': 'Industrial',
    '09': 'Agrícola',
    '13': 'Agrícola',
    '10': 'Agrícola',
    '14': 'Parcela',
    '15': 'Estacionamiento',
    '16': 'Terreno',
    '17': 'Bodega',
    '30': 'Negocio/Patentes/Derechos de llave',
    '31': 'Residencial/Pieza',
    '32': 'Hotel/Apart',
    '33': 'Complejo Turístico',
    '34': 'Departamento Amoblado'
  };

  // Extrae los dos primeros dígitos del título
  const digits = title.match(/^\d{1,2}/);

  // Busca la categoría correspondiente a esos dígitos
  const foundCategory = digits ? digits[0].padStart(2, '0') : null;

  return categoryMapping[foundCategory] || 'Categoría Desconocida';
};
export default ()=> {
  const state = useContext(context);
  const {
    mainImage,
    operation,
    currency,
    images,
    videos,
    characteristics,
    title,
    ubication,
    value,
    valueUf,
    propertyType,
    code,
  } = state;
  
  const gallery = [ ...images].map(item => ({
    thumbnail: item.provider ? item.interactive ? "/360-degrees.svg" : "/video.svg" : item.url,
    thumbnailClass: "thumbnail-custom",
    renderItem: () => <InteractiveAsset {...item} />,
  }));

  return(
    <Section height="50vh" first>
      <Container>
      <br></br>
          <br></br>
           
   
           
        <Row className="pt-3">
          <Col xs={12} md={7} className="d-none d-md-block">
            <ImageGalleryCustom
              items={gallery}
              showPlayButton={false}
              thumbnailPosition="left"
              renderLeftNav={(onClick, disabled)=> <NavButtonLeft onClick={onClick} disabled={disabled}><LeftOutlined /></NavButtonLeft>}
              renderRightNav={(onClick, disabled)=> <NavButtonRight onClick={onClick} disabled={disabled}><RightOutlined /></NavButtonRight>}
            />
          </Col>
          <Col xs={12} md={7} className="d-md-none">
            <ImageGalleryCustom
              items={gallery}
              showPlayButton={false}
              thumbnailPosition="bottom"
              renderLeftNav={(onClick, disabled)=> <NavButtonLeft onClick={onClick} disabled={disabled}><LeftOutlined /></NavButtonLeft>}
              renderRightNav={(onClick, disabled)=> <NavButtonRight onClick={onClick} disabled={disabled}><RightOutlined /></NavButtonRight>}
            />
          </Col>          
          <Col xs={12} md={5}>
            <InfoContainer>
              <InfoContainerInner>
                <div>
                  <Code>
                    {operation.toLowerCase() + " - COD: " + code }
                  </Code>
                  <Title>
                  {getCategoryByCode(title)} {title.replace(/\d+/, '').trim()}
                  </Title>
                </div>
                <div>
                  <Price>
                    {currency === "UF" ? currency + " " + value : currency + " "+"$ " +priceFormat(value)}<br />
                    <span>{currency !== "UF" && <span>UF {valueUf}</span>}</span>
                  </Price>
                </div>
                <Row>
                  <Col xs={6}>
                    <CharItem>
                      <Site />
                      <span>{ubication.commune}</span>
                    </CharItem>
                  </Col>
                  {
                    characteristics.filter(char => (
                      char.name === "Superficie total" ||
                      char.name === "Superficie útil" ||
                      char.name === "Dormitorios" ||
                      char.name === "Baños" ||
                      char.name === "Estacionamientos"

                    ) ).map((char, index) => (
                      <Col xs={6}>
                      <CharItem key={index}>
                        {
                          char.name === "Superficie total" && <Surface /> ||
                          char.name === "Superficie útil" && <Surface />  ||
                          char.name === "Dormitorios" && <Rooms /> ||
                          char.name === "Baños" && <Bath /> ||
                          char.name === "Estacionamientos" && <Parking />
                        }
                        <span>{char.name} {char.value} {char.name === "Superficie total" && "mt2" || char.name === "Superficie útil" && "mt2"}</span>
                      </CharItem>
                      </Col>
                    ))
                  }                     
                </Row>
              </InfoContainerInner>
            </InfoContainer>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}