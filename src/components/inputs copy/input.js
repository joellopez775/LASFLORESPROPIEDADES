import styled from 'styled-components';

export default styled.input`
  width: 100%;
  height: 44px;
  margin-bottom: 1rem;
  padding-left: .5rem;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: ${props => props.gray ? "none" : "0px 1px 1px rgba(0, 0, 0, .12), 0px 2px 2px rgba(0, 0, 0, .12), 0px 4px 4px rgba(0, 0, 0, .12), 0px 8px 8px rgba(0, 0, 0, .12)"};
  border: ${props => props.gray ? "1px solid #dee2e6" : "none"};        
  &:disabled      {
    background-color: rgba(0, 0, 0, .1);
    cursor: not-allowed;
  }
  @media(min-width: 768px){
    margin-bottom: 0;
    box-shadow: none;
    margin-bottom: ${props => props.withMargin ? "1rem" : "0"};
  }
`