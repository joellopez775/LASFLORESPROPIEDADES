import styled from 'styled-components';

export default styled.section`
  min-height: ${props => props.first ? `calc(${props.height} - 60px)` : `calc(${props.height} - 40px)`};
  position: relative;
  margin-bottom: ${props => props.noMargin ? "0" : "0rem"};
  
  @media(min-width: 768px){
    min-height: ${props => props.first ? `calc(${props.height} - 80px)` : `calc(${props.height} - 40px)`};
    padding-top: ${props => props.first ? "80px" : "0"};
  }
`;