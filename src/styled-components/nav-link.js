import styled from 'styled-components';

export default styled.span`
  color: ${props => props.light ? "#fff" : props.dark ? "#333333" : "gray"};
  text-decoration: none;
  transition: 250ms ease;
  margin-left: ${props => props.first ? "0" : "1rem"};
  &:visited{
    color: ${props => props.light ? "#fff" : props.dark ? "#333333" : "gray"};
  }
  &:hover{
    color: ${props => props.light ? "#fff" : props.theme.primaryColor};
    text-decoration: ${props => props.light && "underline"};
  }  
  @media(min-width: 992px){
    margin-left: ${props => props.first ? "0" : "2rem"};
    color: ${props => props.light ? "rgba(255, 255, 255, .7)" : props.dark ? "#333333" : "gray"};
    &:hover{
      color: ${props => props.light ? "#fff" : props.theme.primaryColor};
      text-decoration: ${props => props.light && "none"};
    }
  }
`