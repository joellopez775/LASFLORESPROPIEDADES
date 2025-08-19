import React from 'react';
import styled from 'styled-components';
import { v1 as uuid } from 'uuid';
import { capitalize } from '../../util';

const DefaultOption = styled.option`
  color: #212121;
  font-family: 'Rubik', sans-serif;
`
const AllOption = styled(DefaultOption)`
  font-weight: bold;
`
const Option = styled.option`
  color: #212121;
  font-size: 1rem;
  font-family: 'Rubik', sans-serif;
`

const Select = styled.select`
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: 'Rubik', sans-serif;
  color: ${props => props.primary ? props.theme.primaryColor : "#212121"};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; 
  background-color: #fff;
  border-radius: 6px;
  padding: 5px;
  height: 44px;
  width: 100%;
  background-image: ${props => props.primary
  //? `url('data:image/svg+xml;utf8,<svg stroke="%23${props.theme.primaryColor.substring(1)}" width="28" height="6.633" fill="none" version="1.1" viewBox="0 0 28 6.633" xmlns="http://www.w3.org/2000/svg"><path d="m11.368 0.63261-5.3678 5.3678-5.3678-5.3678"/></svg>')`
  ? `url('data:image/svg+xml;utf8,<svg stroke="%23333" width="28" height="6.633" fill="none" version="1.1" viewBox="0 0 28 6.633" xmlns="http://www.w3.org/2000/svg"><path d="m11.368 0.63261-5.3678 5.3678-5.3678-5.3678"/></svg>')`
  : `url('data:image/svg+xml;utf8,<svg stroke="%23FFFFFF" width="28" height="6.633" fill="none" version="1.1" viewBox="0 0 28 6.633" xmlns="http://www.w3.org/2000/svg"><path d="m11.368 0.63261-5.3678 5.3678-5.3678-5.3678"/></svg>')`};
  background-repeat: no-repeat;
  background-position: right center;
  margin-bottom: 1rem;
  color: #878787;
  cursor: pointer;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, .12), 0px 0px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12);
  &::-ms-expand{
    background: transparent;
  }  
  @media(min-width: 768px){
    margin-bottom: 0;
    box-shadow: ${props => props.shadow ? "0px 0px 1px rgba(0, 0, 0, .12), 0px 0px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12)" : "none"};
  }
`

export default (props)=> {
  return(
      <Select
        defaultChecked={props.default}
        {...props}
      >
        <DefaultOption value="" disabled selected hidden>{props.default}</DefaultOption>
        {
          props.noAll ? null : <AllOption value="">Todo</AllOption>
        }
        {
          props.options.map((o, index) => <Option value={o} key={uuid()}>{props.capitalize ? capitalize(o): o}</Option>)
        }       
      </Select>    
  )
}