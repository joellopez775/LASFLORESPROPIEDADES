import React, { useContext, useEffect } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { gsap } from 'gsap';

import { useUrlForm } from '../../hooks';
import { Autocomplete } from '../inputs';


const Form = styled.form`
  @media(min-width: 768px){
    padding: 0 5%;
  }
`

export default ({ withFilters })=> {
  const state = useContext(context);
  const { values, onChange, getUrl } = useUrlForm({
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

  useEffect(()=>{
    gsap.from("#formCode", { opacity: 0, y: 10, duration: 1.5, ease:"back.out(1.7)" });
  },[])

  return(
    <Form id="formCode" onSubmit={(e)=> e.preventDefault()}>
      <Row>
        <Col xs={12}>
          <Autocomplete
            id="stringSearch"
            onSelect={onChange}
            selected={values.commune}
            placeholder="Ingrese el código de la propiedad"
            icon
          />          
        </Col>     
      </Row>
    </Form>
  )
}