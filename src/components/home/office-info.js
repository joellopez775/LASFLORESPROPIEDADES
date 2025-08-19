import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import { Section } from '../../styled-components';
import ServiceCarousel from '../carousels/services';
import ReviewsCarousel from '../carousels/reviews';
import { ClasiQuote } from '../../icons';

const Title = styled.h2`
  color: ${props => props.theme.primaryColor};
`
const SubTitle = styled.p`
  font-weight: bold;
  margin: 3rem 0;
`

const Services = styled.div`
  margin-bottom: 4rem;
  @media(min-width: 768px){
    margin-bottom: 0;
  }
`
const Reviews = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Quote = styled.p`
  color: ${props => props.theme.primaryColor};
  font-size: 4rem;
  margin: 4rem 0;
  //margin-top: auto;
  //justify-self: center;
`


export default ()=>{

  return(
    <Section>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Title>Ofrecemos un servicio ajustado a las necesidades de cada cliente</Title>  
            <SubTitle>Estas son algunas de las cosas que podemos hacer por vos:</SubTitle>     
            <Services>
              <ServiceCarousel />
            </Services>
          </Col>
          <Col xs={12} md={6}>
            <Reviews>
              <Quote>
                <ClasiQuote />
              </Quote>              
              <ReviewsCarousel />
            </Reviews>
          </Col>       
        </Row>
      </Container>
    </Section>
  )
}