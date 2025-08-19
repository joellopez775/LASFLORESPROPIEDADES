import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import { Section } from '../../styled-components';
import ReviewsCarousel from '../carousels/reviews';
import { ClasiQuote } from '../../icons';

const Reviews = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const ReviewInner = styled.div`
  width: 100%;
  @media(min-width: 992px){
    width: 50%;
  }
`
const Quote = styled.p`
  color: ${props => props.theme.primaryColor};
  font-size: 4rem;
  //margin: 4rem 0;
  //margin-top: auto;
  //justify-self: center;
`

export default ()=>{

  return(
    <Section>
      <Container>
        <Row>
          <Col xs={12}>
            <Reviews>
              <ReviewInner>
                <Quote>
                  <ClasiQuote />
                </Quote>              
                <ReviewsCarousel />
              </ReviewInner>
            </Reviews>
          </Col>       
        </Row>
      </Container>
    </Section>
  )
}