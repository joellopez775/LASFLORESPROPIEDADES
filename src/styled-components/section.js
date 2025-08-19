import styled from 'styled-components';

export default styled.section`
  min-height: ${props => props.first ? `calc(${props.height} - 95.38px)` : props.height};
  position: relative;
  margin-bottom: ${props => props.noMargin ? "0" : "6rem"};
  @media(min-width: 768px){
    //min-height: ${props => props.first ? `calc(${props.height} - 126.38px)` : props.height};
    min-height: ${props => props.height};
    padding-top: ${props => props.first ? "126.38px" : "0"};
  }
`