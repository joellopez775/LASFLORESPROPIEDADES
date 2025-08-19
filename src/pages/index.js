import React, { Fragment } from 'react';

import Hero from '../components/home/hero';
import Hero2 from '../components/home/hero2';
import Properties from '../components/home/properties';
import About from '../components/home/about';
import OfficeInfo from '../components/home/office-info';
import Contact from '../components/contact';

export default ()=> {

  return(
    <Fragment>
      <Hero2 />
      <Hero />
 
      <Properties />
      <About />
      <OfficeInfo />
      <Contact />
    </Fragment>
  )
}