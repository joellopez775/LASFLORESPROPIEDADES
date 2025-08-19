import styled from 'styled-components';

export default styled.span`
    min-width: 160px;
    min-height: 44px;
    padding: 1px 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.primary ? props.theme.primaryColor : "#fff"};
    background-color: ${props => props.outlined ? "transparent" : props.theme.primaryColor};    
    color: ${props => props.outlined && props.primary ? props.theme.primaryColor : "#000"};
    border-radius: 6px;
    transition: 250ms ease;
    cursor: pointer;
    &:hover{
      background-color: ${props => props.outlined && props.primary ? props.theme.primaryColor : props.primary ? props.theme.primaryColor: "#fff"};
      color: ${props => props.outlined && props.primary ? "#000" : props.primary ? "#000" : props.theme.primaryColor};
      filter: brightness(1.1);
    }
`