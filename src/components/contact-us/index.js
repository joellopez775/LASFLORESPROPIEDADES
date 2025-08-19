import React, { useContext, useState, useReducer } from 'react';
import context from '../../context';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { LoadingOutlined, CheckCircleFilled} from '@ant-design/icons';

import { Section, Button } from '../../styled-components';
import { Input, Textarea } from '../inputs';

const Form = styled.form`

`
const Title = styled.h2`
  padding: 2rem 0;
  @media(min-width: 768px){
    width: 50%;
  }
`
const SubTitle = styled.p`
  color: gray;
  @media(min-width: 768px){
    width: 50%;
  }
`
const MailParagraph = styled.p`

`
const MailAdress = styled.a`
  color: ${props => props.theme.primaryColor} !important;
  &:hover{
    text-decoration: underline !important;
  }
`

const SuccessText = styled.p`
  margin: 0;
  margin-top: 1rem;
  font-size: .8rem;
  color: #28a745;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ()=> {
  const state = useContext(context);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useReducer((current, next) => ({ ...current, ...next }), {
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = e => {
    setValues({ [e.target.id]: e.target.value });
  }

  const onSubmit = async(e)=> {
    e.preventDefault();
    setLoading(true);
    try{
      const options = {
        headers: { "Content-type" : "application/json" },
        method: "POST",
        body: JSON.stringify(values),
        mode: "cors",
      }

      const data = await fetch("/sendmail.php", options);
      const result = await data.text();
      
      if(result === "success"){
        console.log("MAIL API RESULT", result);
        setLoading(false);
        setSuccess(true);
        setTimeout(()=> {
          setSuccess(false);
        }, 5000);
      }
      setLoading(false);
      setValues({
        name: '',
        mobile: '',
        email: '',
        message: '',          
      })              
    }catch(e){
      setLoading(false);
      console.log("error", e);
    }
  }
    
  return(
    <Section first>
      <Container>
        <Title>
          {state.contact.title}
        </Title>
        <SubTitle>
          {state.contact.subTitle}
        </SubTitle>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col xs={12}>
              <Row>
                <Col xs={12} md={6}>
                  <Input 
                    placeholder="Nombre"
                    gray
                    withMargin
                    disabled={loading}
                    id="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                  <Input 
                    placeholder="Email"
                    gray
                    withMargin
                    disabled={loading}
                    id="email"
                    onChange={handleChange}
                    value={values.email}                    
                  />                  
                  <Input 
                    placeholder="Teléfono"
                    gray
                    withMargin
                    disabled={loading}
                    id="mobile"
                    onChange={handleChange}
                    value={values.mobile}                    
                  />                                    
                </Col>
                <Col xs={12} md={6}>
                  <Textarea
                    rows="6"
                    placeholder="Mensaje"
                    gray   
                    disabled={loading} 
                    id="message"
                    onChange={handleChange}
                    value={values.message}                                   
                  />
                </Col>                
              </Row>
            </Col>
            <Col xs={12}>
              <Row>
                <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
                  <Button
                    primary
                    block
                    disabled={loading} 
                  >
                    Enviar
                    {
                      loading && <LoadingOutlined style={{ marginLeft: "1rem" }} />
                    }
                  </Button>
                {
                  success && (
                    <SuccessText>Su mensaje fue enviado con éxito <CheckCircleFilled style={{ marginLeft: ".3rem" }} /></SuccessText>
                  )
                }                  
                </Col>
                <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 1 }}>
                  <MailParagraph>
                    <span>También puede escribirnos a </span>
                    <MailAdress href={`tel:${state.phone}`}>{state.email}</MailAdress>
                  </MailParagraph>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </Section>
  )
}