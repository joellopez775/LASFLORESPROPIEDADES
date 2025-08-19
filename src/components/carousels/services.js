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
  button:nth-child(1){
    margin-left: 0;
  }
  @media(min-width: 768px){
    position: relative;
    bottom: auto;
    left: auto;
  }
`
const DotCustom = styled(Dot)`
  border-radius: 50%;
  border: none;
  margin-left: .5rem;
  background-color: #D8D8D8;
  width: 8px;
  height: 8px;
  padding: 0;
  &:hover{
    filter: brightness(1.1);
  }
  &:disabled{
    width: 12px;
    height: 12px;
    background-color: ${props => props.theme.primaryColor};
  }
`
const ButtonsCont = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex; 
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 2rem;
  button:nth-child(1){
    margin-left: 0;
  }
`
const ButtonBackCustom = styled(ButtonBack)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.theme.primaryColor};
  transition: 250ms ease;
  border:none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &:hover{
    filter: brightness(1.1);
  }
`
const ButtonNextCustom = styled(ButtonNext)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.theme.primaryColor};
  transition: 250ms ease;
  border:none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-left: 1rem;
  &:hover{
    filter: brightness(1.1);
  }
`
const Card = styled.div`
  margin-left: 0 .5rem;
`;
const Title = styled.p`
  color: ${props => props.theme.primaryColor};
`
const Description = styled.p`

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
  const items = state.home.services.items;
  const chunkedItemsDesktop = chunkArray(items.map(item => item), 2);
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
        className="d-lg-none d-xl-none" 
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
            {
              items.map((item, index) => <DotCustom key={uuid()} slide={index} />)
            }
          </DotsCont>       
      </CarouselProvider>      
      <CarouselProvider
        naturalSlideWidth={100}
        //naturalSlideHeight={60}
        isIntrinsicHeight={true}
        totalSlides={chunkedItemsDesktop.length}
        visibleSlides={1}
        orientation="horizontal"       
        className="d-none d-lg-block" 
      >
          <SliderCustom>
            {
              chunkedItemsDesktop.map((mainItem, mainIndex) => (
                <Slide key={uuid()} index={mainIndex}>
                  <Row style={{ marginRight: "1rem" }}>
                    {
                      mainItem.map((item, index) => (
                        <Col key={uuid()} md={6}>
                          <Service {...item} index={index} />
                        </Col>
                      ))
                    }
                  </Row>
                </Slide>
              ))
            }
          </SliderCustom>
          <ButtonsCont>
            <div>
              <DotsCont>
                {
                  chunkedItemsDesktop.map((item, index) => <DotCustom slide={index} />)
                }
              </DotsCont>                    
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ButtonBackCustom>
                <LeftOutlined />
              </ButtonBackCustom>
              <ButtonNextCustom>
                <RightOutlined />
              </ButtonNextCustom>            
            </div>
          </ButtonsCont>                
      </CarouselProvider>                
    </Fragment>
  )
}