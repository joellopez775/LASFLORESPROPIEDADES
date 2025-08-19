import React, { Fragment } from 'react';

import Hero from '../components/about/hero';
import History from '../components/about/history';
import Description from '../components/about/description';
import Stats from '../components/about/stats';
import Team from '../components/about/team';
import Ubication from '../components/ubication';
import Contact from '../components/contact';

export default ()=> {

  return(
    <Fragment>
      <Hero />
      <History />
      <Description />
      <Stats />
      <Team />
      <Ubication />
      <Contact />
    </Fragment>
  )
}