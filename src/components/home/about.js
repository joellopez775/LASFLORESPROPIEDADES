import React, { useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Container, Row, Col } from 'react-bootstrap';

import { Section, Button } from '../../styled-components';

const SectionCustom = styled(Section)`
  background-color: ${props=> props.theme.primaryColor};
`
const InfoCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-width: 540px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;    
  padding-top: 1rem;  
  color: #fff;
  @media (min-width: 768px){
    max-width: 720px;
    padding: 2rem 15px;
  }    
  @media (min-width: 992px){
    max-width: 480px;
    padding: 2rem 15px;
  }
`
const Title = styled.h2`

`
const SubTitle = styled.p`

`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export default ()=> {
  const state = useContext(context);
  return(
    <SectionCustom>
      <Row noGutters>
        <Col xs={12} md={12} lg={6}>
          <InfoCont>
            <Title>
              {state.home.about.banner.title}
            </Title>
            <SubTitle>
              {state.home.about.banner.subTitle}
            </SubTitle>
            <AniLink paintDrip hex={state.primaryColor} to="/about" duration={.5}>
              <Button block>
                {state.home.about.banner.buttonText}
              </Button>
            </AniLink>
          </InfoCont>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <Image src={state.home.about.banner.image} />
        </Col>
      </Row>
    </SectionCustom>
  )
}