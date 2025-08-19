import React from 'react';
import Link from 'gatsby-plugin-transition-link';
import { gsap } from 'gsap';
import styled from 'styled-components';

const LinkCustom = styled(Link)`
  color: inherit !important;
  font-family: 'Raleway', sans-serif !important;
`

export default (props)=> {
  
  const { children, to } = props;

  const exitAnimation = (exit, node)=> {
    gsap.to(node, {
      opacity: 0,
    })
  }

  const entryAnimation = (entry, node) => {
    gsap.from(node, {
      opacity: 0,
    })
  }

  return(
    <LinkCustom
      to={to}
      exit={{
        trigger: ({ exit, node }) => exitAnimation(exit, node),
        length: 1
      }}
      entry={{
        trigger: ({ entry, node }) => entryAnimation(entry, node),
        delay: 0.6
      }}    
      {...props}
    >
      {children}
    </LinkCustom>
  )
}