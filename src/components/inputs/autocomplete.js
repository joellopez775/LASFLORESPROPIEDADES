import React, { useReducer, useState, useEffect, useContext } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { removeAccent, truncate } from '../../util';
import { navigate } from 'gatsby';

const InputLabel = styled.label`
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  width: 100%;
  margin-bottom: 1rem;
  border: ${props => props.gray ? "1px solid #000000" : "none" };
  padding-right: 16px;
  color: ${props => props.primary ? props.theme.primaryColor : "#212121"};
  border-radius: 6px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, .12), 0px 0px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12);
  @media(min-width: 768px){
    margin-bottom: ${props => props.vertical ? "1rem" : "0"};
    box-shadow: ${props => props.shadow ? "0px 0px 1px rgba(0, 0, 0, .12), 0px 0px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12)" : "none"};
  }
`

const Input = styled.input`
  background-color: transparent;
  //box-shadow: 0px 0px 1px rgba(0, 0, 0, .12), 0px 0px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12);
  border-radius: 3px;
  padding: 5px;
  height: 44px;
  width: 100%;
  border: none;
  font-size: 1rem;
  color: ${props => props.primary ? props.theme.primaryColor : "#878787"};
  &::placeholder{
    color: ${props => props.gray ? "#8695A1" : "#5a5a5a"};
  } 
`
const OptionsMainCont = styled.ul`
  background-color: #fff;
  color: initial;
  width: 100%;
  position: absolute;
  left: 0;
  top: 44px;
  padding: 1rem 5px;
  border: 1px solid #cecece;
  z-index: 100;
`
const Option = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 250ms ease;
  display: flex;
  text-align: left;
  &:hover{
    color: ${props => props.theme.primaryColor} !important;
  }
`
const PropertyImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 2px;
  object-fit: cover;
  object-position: center;
`
const PropertyInfoCont = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: .5rem;
`
const PropertyInfoCode = styled.span`
  font-size: 12px;
  color: ${props => props.theme.primaryColor};
`
const PropertyInfoTitle = styled.span`
  font-size: 14px;
`
const PropertyInfoDescription = styled.span`
  font-size: 12px;
  color: #666;
`


export default ({ selected, onSelect, id, placeholder, options, gray, shadow, primary, icon }) => {
  const contextData = useContext(context);
  const [value, setValue] = useState(selected)
  const [state, setState] = useReducer((current, next) => ({ ...current, ...next }),{
    loading: false,
    data: [],
  });

  useEffect(()=>{
    if(selected){
      setValue(selected);
    }
  },[selected])

  const onSearch = async(e) => {
    const value = e.target.value;
    if(options){
      setValue(value);
      onSelect(e);
      const valueLen = value.length;
      const compare = removeAccent(value).toUpperCase();
      const newData = valueLen === 0 ? [] : options.filter(item => removeAccent(item).toUpperCase().indexOf(compare) !== -1);
      setState({ data: newData });      
    }
    else{
      setState({ loading: true });
      try{
        setValue(value);
        const propertiesUrl = `https://api.clasihome.com/rest/properties?id=${contextData.officeId}&typeId=${contextData.typeId}&status=PUBLICADA&stringSearch=${value}`;
        const data = await fetch(propertiesUrl);
        const result = await data.json();
        setState({ data: value.length ? result.properties : [], loading: false });
      }
      catch(e){
        console.log(e);
        setState({ loading: false });
      }
    }
  }

  const onClick = e => {
    setState({ data: [] });
    if(options){
      setValue(e.target.value);
      onSelect(e);
    }
    else{
      navigate(`/property?id=${e.currentTarget.id}`);
    }
  }

  return (
    <InputLabel htmlFor={id} gray={gray} shadow={shadow} primary={primary}>
      <Input
        id={id}
        name={id}
        value={value}
        onChange={onSearch}
        type="text"
        placeholder={placeholder}
        gray
        autoComplete="off"
        primary={primary}
      />
      {console.log("NO ICON", icon)}
      {
        icon ? state.loading
          ?<LoadingOutlined />
          :<SearchOutlined />
        :null
      }
      {
        options
        ?(
          state.data.length !== 0 &&
          (<OptionsMainCont>
            {
              state.data.map(item => (
                <li>
                  <Option
                    type="button"
                    id={id}
                    value={item}
                    onClick={onClick}
                  >
                    {item}
                  </Option>
                </li>               
             ))
            }
          </OptionsMainCont>)
        )        
        :(
          state.data.length !== 0 &&
          (<OptionsMainCont>
            {
              state.data.map(item => (
                <li>
                  <Option key={item._id} id={item._id} type="button" onClick={onClick}>
                    <PropertyImg src={item.mainImage} alt={item.code} />
                    <PropertyInfoCont>
                      <PropertyInfoCode>
                        { item.operation + " - CODE: " + item.code}
                      </PropertyInfoCode>
                      <PropertyInfoTitle>
                        {item.title}
                      </PropertyInfoTitle>
                      <PropertyInfoDescription>
                        {truncate(item.publicObservations, 220)}
                      </PropertyInfoDescription>
                    </PropertyInfoCont>
                  </Option>
                </li>
              ))
            }
          </OptionsMainCont>)
        )
      }
    </InputLabel>
  )
}