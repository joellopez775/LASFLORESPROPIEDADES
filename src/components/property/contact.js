import React, { useContext, useState, useReducer } from 'react';
import styled from 'styled-components';
import context from '../../context/property';
import officeContext from '../../context';
import { LoadingOutlined, CheckCircleFilled, WhatsAppOutlined} from '@ant-design/icons';

import { Section } from '../../styled-components';
import { Input, Textarea } from '../inputs';
import { Button } from '../../styled-components';

const SectionCustom = styled(Section)`
  background-color: #fff;
  padding: 2rem;
  border: 1px solid #ebebeb;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //box-shadow: 0px 1px 1px rgba(0, 0, 0, .12), 0px 2px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12), 0px 16px 16px rgba(0, 0, 0, .12);
`
const Title = styled.p`
  color: ${props => props.theme.primaryColor};
  font-size: 1.5rem;
`
const UserCont = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0;
`
const Avatar = styled.img`
  object-fit: cover;
  object-position: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  @media(min-width: 768px){
    min-height: 76px;
    min-width: 76px;
    height: 120px;
    width: 120px;
    flex-grow: 0;
    flex-shrink: 1;
  }
`
const NoAvatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  @media(min-width: 768px){
    font-size: 1.5rem;
    height: 80px;
    width: 80px;
  }
`
const UserInfoCont = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: .8rem;
  font-size: .8rem;
`
const UserInfoItem = styled.li`
  
`

const Form = styled.form`

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
const IconButton = styled.a`
  color: #919191;
  transition: 250ms ease;
  display: flex;
  align-items: center;
  text-align: left;
  margin-top: 2rem;
  font-size: .8rem;
  cursor: pointer;
  &:visited{
    color: rgba(255, 255, 255, .7);
  }  
  &:hover{
    color: #06d765;
  }
`

export default ()=> {
  const state = useContext(context);
  const officeState = useContext(officeContext);
  const user = { ...state._comercialUser[0], ...state._comercialUser_person[0] };
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useReducer((current, next) => ({ ...current, ...next }), {
    name: "",
    email: "",
    mobile: "",
    message: `Hola ${state._office[0].name}, Estoy interesado en COD: ${state.code}, por favor comunícate conmigo. ¡Gracias!`,
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
        body: JSON.stringify({
          ...values,
          nameAgent: `${user.firstName} ${user.lastName}`,
          emailAgent: user.email,
        }),
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
    <SectionCustom>
      {console.log("CONTACT STATE", state)}
      <div>
      <Title>Contacto</Title>
      <UserCont>
      {
          user.avatar?(
            <Avatar src={user.avatar} alt={user.lastName} />
          )
          :(
            <NoAvatar>
              <span>{user.firstName.charAt(0).toUpperCase()}</span>
              <span>{user.lastName.charAt(0).toUpperCase()}</span>
            </NoAvatar>
          )
        }
        <UserInfoCont>
          <UserInfoItem>
            {user.firstName + " " + user.lastName }
            {user.position ? " - " + user.position : ""}
          </UserInfoItem>
          <UserInfoItem>
            {user.phone && user.phone.countryCode + " " + user.phone.areaCode + " " + user.phone.phoneNumber}
            {user.mobile && " / " + user.mobile.countryCode + " " + user.mobile.areaCode + " " + user.mobile.phoneNumber}
          </UserInfoItem>
          <UserInfoItem>
            {user.email}
          </UserInfoItem>
        </UserInfoCont>
      </UserCont>
      <Form onSubmit={onSubmit}>
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

        <Textarea
          rows="6"
          placeholder="Mensaje"
          gray   
          disabled={loading} 
          id="message"
          onChange={handleChange}
          value={values.message}                                   
        />
        <br />
        <br />
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
      </Form>
      </div>
      <div>
      <IconButton href={`https://api.whatsapp.com/send?phone=${officeState.phone}&text=${values.message}`} alt="send whatsapp message">
        <WhatsAppOutlined style={{ marginRight: 8, fontSize: "2rem" }} />
        <span>¿Deseas contactarme por teléfono o enviarme un WhatsApp?</span>
      </IconButton>        
      </div>
    </SectionCustom>
  )
}