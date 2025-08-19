import React, { useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import { Section } from '../../styled-components';
import { ChartYears, ChartProperties, ChartTansactions, ChartTeam } from '../../icons'

const Card = styled.div`
  width: 95%;
  height: 281px;
  background-color: ${props => props.theme.primaryColor};
  font-size: 3rem;
  display :flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-bottom: 3rem;
  @media(min-width: 768px){
    width: 100%;
    margin:0;
  }
`
const Description = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  @media(min-width: 768px){
    font-size: .8rem;
  }
`

export default ()=> {
  const state = useContext(context);
  return(
    <Section>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <Card>
              <ChartYears />
              <span>{state.about.stats.years}</span>
              <Description>
                Años en el mercado
              </Description>
            </Card>
          </Col>
          <Col xs={12} md={3}>
            <Card>
              <ChartTansactions />
              <span>{state.about.stats.transactions}</span>
              <Description>
                Ventas y arriendos anuales
              </Description>
            </Card>            
          </Col>
          <Col xs={12} md={3}>
            <Card>
              <ChartProperties />
              <span>{state.about.stats.properties}</span>
              <Description>
                Años en el mercado
              </Description>
            </Card>            
          </Col>
          <Col xs={12} md={3}>
            <Card>
              <ChartTeam />
              <span>{state.about.stats.proffesionals}</span>
              <Description>
                Años en el mercado
              </Description>
            </Card>            
          </Col>                              
        </Row>
      </Container>
    </Section>
  )
}