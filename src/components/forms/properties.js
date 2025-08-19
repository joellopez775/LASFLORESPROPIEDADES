import React, { useContext, useState, useEffect } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { SearchOutlined, SlidersOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { gsap } from 'gsap';

import { useUrlForm } from '../../hooks';
import { Autocomplete, Select, Input } from '../inputs';
import PROPERTY_TYPE from '../../constants/PROPERTY_TYPE.json';
import COMMUNES from '../../constants/CITIES.json';
import { Button } from '../../styled-components';
import AniLink from "gatsby-plugin-transition-link/AniLink";


const Form = styled.form`
  padding: 0;
  margin-top: 1rem;
  @media(min-width: 768px){
    padding: 0 5%;
    margin-top: 0;
  }
`
const FormInnerCont = styled.div` 
    margin-bottom: ${props => props.first ? "2rem" : "0" };
  @media(min-width: 768px){
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #D8D8D8;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .12), 0px 2px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12), 0px 16px 16px rgba(0, 0, 0, .12);
  }
`
const MoreFilterCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const FilterButton = styled.button`
  border: none;
  background-color: transparent;
  display :flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primaryColor};
  transition: 250ms ease;
  font-size: .8rem;
  &:hover{
    filter: brightness(1.1);
  } 
`

export default ({ withFilters, id })=> {
  const state = useContext(context);
  const [filter, setFilter] = useState(false);
  const { values, onChange, getUrl, setValues } = useUrlForm({
    propertyType: '',
    operation: '',
    commune: '',
    stringSearch: '',
    priceMin: '',
    priceMax: '',
    totalAreaFrom: '',
    totalAreaTo: '',    
    bedrooms: '',
    bathrooms: '',
    currency: 'CLP',    
  });

  const handleFilter = ()=> {
    setValues({
      priceMin: '',
      priceMax: '',
      totalAreaFrom: '',
      totalAreaTo: '',    
      bedrooms: '',
      bathrooms: '',
      currency: 'CLP',          
    });
    setFilter(!filter);
  }

  useEffect(()=>{
    if(filter){
      gsap.from("#filters", { opacity: 0, y: 10, duration: .5, ease:"back.out(1.7)" });
    }
  },[filter])

  return(
    <Form
      id={id}
      onSubmit={(e)=> e.preventDefault()}
      withFilters={withFilters}
    >
      <FormInnerCont first>
      <Row noGutters>
        <Col xs={12} md={3}>
          <Select
            id="propertyType"
            onChange={onChange}
            value={values.propertyType}
            default="Propiedad"
            options={PROPERTY_TYPE}
            primary
            capitalize
          />           
        </Col>
        <Col xs={12} md={3}>
          <Select
            id="operation"
            onChange={onChange}        
            value={values.operation}          
            default="Operación"
            options={["VENTA", "ARRIENDO"]}
            primary
            capitalize
          />          
        </Col>
        <Col xs={12} md={5}>
          <Autocomplete
            id="commune"
            onSelect={onChange}
            selected={values.commune}
            options={COMMUNES.map(val => val.name)}
            placeholder="Comuna"
          />          
        </Col>      
        <Col xs={12} md={1}>
          <AniLink fade to={getUrl()} duration={.5}>
            <Button
              block
              primary
              type="submit"
              icon
              title="Buscar"
            >
              <span className="d-xs-block d-md-none">Buscar</span>
              <SearchOutlined className="d-none d-md-block" />
            </Button>
          </AniLink>
        </Col>
      </Row>
      </FormInnerCont>
      {
        withFilters && filter && (
          <FormInnerCont first id="filters">
            <Row noGutters>
              <Col xs={12} md={3}>
                <Input
                  id="totalAreaFrom"
                  onChange={onChange}
                  value={values.totalAreaFrom}
                  placeholder="Superficie desde m²"
                  primary
                  type="number"
                  min={0}
                >
                </Input>
              </Col>
              <Col xs={12} md={3}>
                <Input
                  id="totalAreaTo"
                  onChange={onChange}
                  value={values.totalAreaTo}
                  placeholder="Superficie hasta m²"
                  primary
                  type="number"
                  min={0}
                >
                </Input>
              </Col>   
              <Col xs={12} md={2}>
                <Input
                  id="priceMin"
                  onChange={onChange}
                  value={values.priceMin}
                  placeholder="Precio desde"
                  primary
                  type="number"
                  min={0}
                >
                </Input>
              </Col>
              <Col xs={12} md={2}>
                <Input
                  id="priceMax"
                  onChange={onChange}
                  value={values.priceMax}
                  placeholder="Precio hasta"
                  primary
                  type="number"
                  min={0}
                >
                </Input>
              </Col>        
              <Col xs={12} md={1}>
                <Select
                  id="currency"
                  onChange={onChange}
                  value={values.currency}
                  default="Propiedad"
                  options={["CLP", "UF"]}
                  primary
                  noAll
                />           
              </Col>   
              <Col xs={12} md={1}>
                <AniLink fade to={getUrl()} duration={.5}>
                  <Button
                    block
                    primary
                    type="submit"
                    icon
                    title="Aplicar filtros"
                  >
                    <span className="d-xs-block d-md-none">Aplicar</span>
                    <SlidersOutlined className="d-none d-md-block" />
                  </Button>
                </AniLink>
              </Col>                              
            </Row>
          </FormInnerCont>
        )
      }
      <MoreFilterCont>
        {
          withFilters && (
            <FilterButton>
              {
                filter
                ? (
                  <FilterButton onClick={handleFilter}>
                    Menos filtros                
                    <UpOutlined style={{ marginLeft: ".3rem" }} />
                  </FilterButton>
                )
                : (
                  <FilterButton onClick={handleFilter}>
                    Más filtros
                    <DownOutlined style={{ marginLeft: ".3rem" }} />
                  </FilterButton>
                )
              }
            </FilterButton>            
          )
        }
      </MoreFilterCont>
    </Form>
  )
}