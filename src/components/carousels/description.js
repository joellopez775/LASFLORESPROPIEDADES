import React, { Fragment, useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { chunkArray } from '../../util';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { v1 as uuid } from 'uuid';

const SliderCustom = styled(Slider)`
  padding-bottom: 1.5rem;
`
const DotsCont = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex; 
  align-items: center;
  padding: 1rem 0;
  button:nth-child(1){
    margin-left: 0;
  }
  @media(min-width: 768px){
    position: relative;
    bottom: auto;
    left: auto;
    padding: 0;
  }
`
const ButtonBackCustom = styled(ButtonBack)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .5);
  color: #fff;
  transition: 250ms ease;
  border:none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color: #fff;
    color: ${props => props.theme.primaryColor};
  }
`
const ButtonNextCustom = styled(ButtonNext)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .5);
  color: #fff;
  transition: 250ms ease;
  border:none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  &:hover{
    background-color: #fff;
    color: ${props => props.theme.primaryColor};
  }
`
const Card = styled.div`
  margin-left: 0 .5rem;
  color: #fff;
`;
const Title = styled.p`
  font-size: 1.5rem;
`
const Description = styled.p`
  padding-bottom: 2rem;
  @media(min-width: 768px){
    padding-bottom: 0;
  }
`

const Service = ({ title, description }) => (
  <Card>
    <Title>
      {title}
    </Title>
    <Description>
      {description}
    </Description>
  </Card>
)


export default ()=>{
  const state = useContext(context);
  const items = state.about.description.items;
  console.log("SERVICES", items);
  return(
    <Fragment>
      <CarouselProvider
        naturalSlideWidth={100}
        //naturalSlideHeight={60}
        isIntrinsicHeight={true}
        totalSlides={items.length}
        visibleSlides={1}
        orientation="horizontal"       
        //className="d-lg-none d-xl-none" 
      >
          <SliderCustom>
            {
              items.map((item, index) => (
                <Slide key={uuid()} index={index}>
                  <Service {...item} index={index} />
                </Slide>
              ))
            }
          </SliderCustom>
          <DotsCont>
              <ButtonBackCustom>
                <LeftOutlined />
              </ButtonBackCustom>
              <ButtonNextCustom>
                <RightOutlined />
              </ButtonNextCustom>    
          </DotsCont>       
      </CarouselProvider>                     
    </Fragment>
  )
}