import React, { useContext, useState, useReducer, Fragment } from 'react';
import styled from 'styled-components';
import context from '../../context/property';
import { Container, Row, Col } from 'react-bootstrap';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import { Section } from '../../styled-components';
import * as Icons from '../../icons';
import Map from '../map';

const SectionCustom = styled(Section)`
  background-color: #fff;
  padding: 2rem;
  border: 1px solid #ebebeb;
  //box-shadow: 0px 1px 1px rgba(0, 0, 0, .12), 0px 2px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12), 0px 16px 16px rgba(0, 0, 0, .12);
`
const CharsContainer = styled.div`
  height: ${props => props.more ? "auto" : "250px"};
  overflow: hidden;
  transition: 250ms ease;
  position: relative;
  background-color: #fff;
  padding: 2rem;
  padding-bottom: 2rem;
  border: 1px solid #ebebeb;
  margin-bottom: 2rem;
  //box-shadow: 0px 1px 1px rgba(0, 0, 0, .12), 0px 2px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12), 0px 16px 16px rgba(0, 0, 0, .12);
`
const MoreButton = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(to top, rgba(255, 255, 255) 10%, transparent);
  //border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: 250ms ease;
  color: ${props => props.theme.primaryColor};
  height: 2rem;
  padding-right: 1rem;
  font-size: .8rem;
  &:hover{
    filter: brightness(1.1);
  }
`
const Title = styled.p`
  color: ${props => props.theme.primaryColor};
  font-size: 1.5rem;
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
const PublicObs = styled.p`
  white-space: pre-line;
`
const MapContainer = styled.div`
  //height: 5;
  //overflow: hidden;
  transition: 250ms ease;
  //position: relative;
  background-color: #fff;
  border: 1px solid #ebebeb;
  padding-bottom: 2rem;
  //box-shadow: 0px 1px 1px rgba(0, 0, 0, .12), 0px 2px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12), 0px 16px 16px rgba(0, 0, 0, .12);
`
const MapTitle = styled(Title)`
  padding: 2rem;
  margin: 0;
`

export default ()=> {
  const state = useContext(context);
  const [more, setMore] = useReducer((current, next)=> ({ ...current, ...next }),{
    chars: false,
    obs: false,
  });
  return(    
    <Fragment>
      <CharsContainer more={more.chars}>
        <Title>Caracteristicas</Title>  
        <Row>
          {
            state.characteristics.map((char, index) => (
              <Col xs={6}>
              <CharItem key={index}>
                {
                  (()=> {
                    const Icon = Icons[char.icon];
                    return <Icon />
                  })()
                }
                <span>{char.name} {char.value} {char.name === "Superficie total" && "mt2" || char.name === "Superficie útil" && "mt2"}</span>
              </CharItem>
              </Col>
            ))
          }       
        </Row>  
        <MoreButton onClick={()=> setMore({ chars: !more.chars })}>
          {
            more.chars ? "Ver menos" : "Ver más"
          }
                    {
            more.chars ? <UpOutlined style={{ marginLeft: ".5rem" }} /> : <DownOutlined style={{ marginLeft: ".5rem" }} />
          }
        </MoreButton>
      </CharsContainer>
      <CharsContainer more={more.obs}>
        <Title>Observaciones</Title>  
        <PublicObs>
            {state.publicObservations}
        </PublicObs>        
        <MoreButton onClick={()=> setMore({ obs: !more.obs })}>
          {
            more.obs? "Ver menos" : "Ver más"
          }
          {
            more.obs ? <UpOutlined style={{ marginLeft: ".5rem" }} /> : <DownOutlined style={{ marginLeft: ".5rem" }} />
          }
        </MoreButton>
      </CharsContainer>
        {
        state.ubication && state.ubication.location && state.ubication.location.coordinates && (
          <MapContainer>
            <MapTitle>
              Ubicación   
            </MapTitle>
              <Map
              lat={parseFloat(state.ubication.location.coordinates[0])}
              lng={parseFloat(state.ubication.location.coordinates[1])}
              height={300}
              zoom={18}
            />      
          </MapContainer>   
          )
        }         
    </Fragment>
  )
}