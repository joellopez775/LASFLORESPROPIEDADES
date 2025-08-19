import React, { useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { v1 as uuid } from 'uuid';

import { Section } from '../../styled-components';

const Title = styled.h2`
  color: ${props => props.theme.primaryColor};
  text-align: center;
  margin-bottom: 4rem;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: space-between;
  height: 100%;
  padding-bottom: 3rem;
  @media(min-width: 768px){
    padding: 0;
  }
`
const Avatar = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 2rem;
`
const NoAvatar = styled.div`
  width: 160px;
  height: 160px;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  user-select: none;
  span{
    font-size: .6rem;
  }
  //color: #fff;
`
const Info = styled.p`
  margin: 0;
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
`
const Resume = styled.p`
  margin: 2rem 0;
  text-align: center;
  flex: 1;
`
const User = ({ avatar, cv, email, fullName, phone }) => (
  <Card>
    {
      avatar
      ?<Avatar src={avatar} alt={fullName} />
      :<NoAvatar>{fullName}<span>Sin avatar</span></NoAvatar>
    }
    <Info>{fullName}</Info>
    <Resume>
      {cv}
    </Resume>
    <Info>{email}</Info>
    <Info>{phone}</Info>
  </Card>
)

export default ()=> {
  const state = useContext(context);
  return(
    <Section>
      <Container>
        <Row>
          <Col xs={12}>
            <Title>
              Quienes somos
            </Title>
          </Col>
          {
            state.about.team.items.map(item => (
              <Col key={uuid()} xs={12} md={4} lg={3}>
                <User {...item} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </Section>
  )
}