import React, { Fragment, useEffect, createContext, useReducer, useRef } from 'react';
import styled from 'styled-components';
import Context from '../context/property';
import { LoadingOutlined } from '@ant-design/icons';
import { Container, Row, Col } from 'react-bootstrap';

import { Section } from '../styled-components';
import Hero from '../components/property/hero';
import Property from '../components/property/property';
import Contact from '../components/property/contact';
import FeaturedProperties from '../components/carousels/properties';

const SectionCustom = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`
const Title = styled.p`
  color: ${props => props.theme.primaryColor};
  font-size: 1.5rem;
  margin: 2rem 0;
  text-align: center;
`

export default ({ location })=> {
  const params = new URLSearchParams(location.search);
  const url = `https://wsnzm.clasihome.com:3443/api/conv/property?propertyId=${params.get("id")}`;
  const [query, setQuery] = useReducer((current, next) => ({ ...current, ...next }),{
    loading: true,
    error: false,
    data: null,
  });

  const getProperty = async()=> {
    try{
      setQuery({ loading: true });
      const data = await fetch(url);
      const result = await data.json();
      setQuery({ loading: false, error: false, data: result });
      window.scrollTo(0, 0);
    }
    catch(e){
      console.log("ERROR EN PROPIEDAD", e);
      setQuery({ loading: false, error: true, data: null });
    }
  }

  useEffect(()=>{
    getProperty();
  },[location.search]);

  if(query.loading) return(
    <SectionCustom height="100vh" first>
      <LoadingOutlined />
    </SectionCustom>
  )

  if(query.error) return(
    <SectionCustom height="100vh" first>
      <span>Error de conexión</span>
    </SectionCustom>
  )
  
  return(
    <Context.Provider value={query.data}>
      <Fragment>
        <Hero />
        <Container>
          <Row>
            <Col xs={12} md={7}>
              <Property />
            </Col>
            <Col xs={12} md={5}>
              <Contact />
            </Col>            
            <Col xs={12}>
              <Title>Propiedades que podrían interesarte</Title>
              <FeaturedProperties />
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </Fragment>
    </Context.Provider>
  )
}