import React, { Fragment, useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { chunkArray } from '../../util';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { v1 as uuid } from 'uuid';

import PropertyCard from '../cards/property';

const SliderCustom = styled(Slider)`
  padding-bottom: 1.5rem;
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
  position: absolute;
  top: 50%;
  left: -1rem;
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
  position: absolute;
  top: 50%;
  right: -1rem;
  &:hover{
    filter: brightness(1.1);
  }
`

export default ()=>{
  const state = useContext(context);
  const items = state.featuredProperties;
  const chunkedItemsDesktop = chunkArray(items.map(item => item), 4);
  const chunkedItemsTablet = chunkArray(items.map(item => item), 3);
  return(
    <Fragment>
      <CarouselProvider
        naturalSlideWidth={100}
        //naturalSlideHeight={60}
        isIntrinsicHeight={true}
        totalSlides={items.length}
        visibleSlides={1}
        orientation="horizontal"       
        className="d-md-none d-lg-none d-xl-none" 
      >
          <SliderCustom>
            {
              items.map((item, index) => (
                <Slide key={item.id} index={index}>
                  <PropertyCard {...item} />
                </Slide>
              ))
            }
          </SliderCustom>
      </CarouselProvider>        
      <CarouselProvider
        naturalSlideWidth={100}
        //naturalSlideHeight={60}
        isIntrinsicHeight={true}
        totalSlides={chunkedItemsTablet.length}
        visibleSlides={1}
        orientation="horizontal"       
        className="d-none d-md-block d-lg-none" 
      >
        <SliderCustom>
          {
            chunkedItemsTablet.map((mainItem, index) => (
              <Slide key={uuid()} index={index}>
                <Row 
                  style={{ margin: "0 1rem" }}
                >
                  {
                    mainItem.map(item => (
                      <Col xs={1} md={4}>
                        <PropertyCard {...item} />
                      </Col>
                    ))
                  }
                </Row>
              </Slide>
            ))
          }
        </SliderCustom>
        <ButtonBackCustom>
          <LeftOutlined />
        </ButtonBackCustom>
        <ButtonNextCustom>
          <RightOutlined />
        </ButtonNextCustom>
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
            chunkedItemsDesktop.map((mainItem, index) => (
              <Slide key={uuid()} index={index}>
                <Row 
                  style={{ margin: "0 1rem" }}
                >
                  {
                    mainItem.map(item => (
                      <Col xs={1} md={3}>
                        <PropertyCard {...item} />
                      </Col>
                    ))
                  }
                </Row>
              </Slide>
            ))
          }
        </SliderCustom>
        <ButtonBackCustom>
          <LeftOutlined />
        </ButtonBackCustom>
        <ButtonNextCustom>
          <RightOutlined />
        </ButtonNextCustom>
      </CarouselProvider>   
    </Fragment>
  )
}