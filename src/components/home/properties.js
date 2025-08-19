import React, { useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Container, Row, Col } from 'react-bootstrap';
import { EnvironmentOutlined } from '@ant-design/icons';

import { Section, Button } from '../../styled-components';
import Carousel from '../carousels/properties';

const Title = styled.p`
  font-size: 1.5rem;
  //color: ${props => props.theme.primaryColor};
  text-align: center;
  margin-bottom: 2rem;
`
const PropertiesCarouselCont = styled.div`
  min-height: 50vh;
  margin-bottom: 1rem;
`
const Banner = styled.div`
  background-color: ${props => props.theme.primaryColor};
  padding: 3rem 2rem;
  color: #fff;
`

const BannerText = styled.p`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`


export default ()=>{
  const state = useContext(context);

  return(
    <Section id="properties">
      <Container>
        <Title>
          {state.home.properties.title}
        </Title>
        <PropertiesCarouselCont>
          <Carousel />
        </PropertiesCarouselCont>
        <Banner>
          <Row>
            <Col xs={12} md={9}>              
              <BannerText>
                <EnvironmentOutlined style={{ marginRight: "1rem", fontSize: "1.5rem" }} />
                {state.home.properties.footer}
              </BannerText>
            </Col>
            <Col xs={12} md={3}>
              <AniLink paintDrip hex={state.primaryColor} to="/properties" duration={.5}>
                <Button
                  block
                >
                  {state.home.properties.buttonText}
                </Button>
              </AniLink>
            </Col>            
          </Row>
        </Banner>
      </Container>
    </Section>
  )
}