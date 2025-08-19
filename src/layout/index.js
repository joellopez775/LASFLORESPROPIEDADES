import React, { useEffect, useReducer } from 'react';
import Context from '../context';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatData } from '../util';
import { WhatsAppOutlined, PhoneOutlined, LoadingOutlined } from '@ant-design/icons';

import MobileHeader from './mobile-header';
import DesktopHeader from './desktop-header';
import Footer from './footer';

const GlobalStyles = createGlobalStyle`
  *{
    //font-family: 'Open Sans', sans-serif;
    font-family: 'Lato', sans-serif !important;
  }
  html{
    font-size: 14px;
    scroll-behavior: none;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
    @media(min-width: 768px){
      font-size: 16px;
    }
    @media(min-width: 1200px){
      font-size: 18px;
    }    
  }
  body{
    color: #333333;
    background-color: rgba(0, 0, 0, .050);
  }
  a{
    text-decoration: none !important;
    &:visited{
      color: hsl(0, 0%, 23%);
    }
  }
  h1, h2, h3, h4, h5, h6{
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
  }
  button, input, select, option, textarea{
    outline: none;
    //font-family: 'Open Sans', sans-serif !important;
  }
  input, select, option, textarea{
    padding-left: .7rem !important;
  }
  .tl-edges {
    width: 100% !important;
  }
  .image-gallery-slide-wrapper{
    @media(min-width:768px){
      width: calc(100% - 80px) !important;
    }
  }
  .image-gallery-thumbnails-wrapper{
    @media(min-width:768px){
      width: 70px !important;
    }    
  }
  .image-gallery-thumbnails-container{
    //width: 70px !important;
  }
  .thumbnail-custom{
    @media(min-width:768px){
      width: 70px !important;
    }    
    img{
      max-height: 70px;
    }
  }
`

const MainCont = styled.div`
  padding-top: 95.38px;
  overflow-x: visible !important;
  @media(min-width: 992px){
    padding-top: 0px;
  }
`
const LoadingCont = styled.div`
  min-height: 100vh;
  background-color: hsl(0, 0%, 23%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;  
  color: #ffffff;
`
const ContactButton = styled.a`
display: none;
@media(min-width: 768px){
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: ${props => props.phone ? "50%" : "calc(50% + 45px + 1rem)"};;
  right:.5rem;
  background-color: #fff;
  //background-color: #06d755;
  color: #212121;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  transition: 250ms ease;
  font-size: 1.5rem;
  border: 1px solid rgba(0, 0, 0, .12);
  z-index: 1000;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, .12),
              0px 2px 2px rgba(0, 0, 0, .12),
              0px 4px 4px rgba(0, 0, 0, .12),
              0px 8px 8px rgba(0, 0, 0, .12);
  &:hover{
    color: ${props => props.phone ? props.theme.primaryColor : "#06d755"};
  }
}
`

export default ({ children, location }) => {
  const [data, setData] = useReducer((current, next) => ({ ...current, ...next }),{
    loading: true,
    error: false,
    data: null,
  });

  const runtimeData = useStaticQuery(
    graphql`
      query{
        initial{
          data
        }
      }
    `    
  );

  const getFeatured = async(email, id, typeId, maxProperties)=> {
    try{
      const data = await fetch(`https://wsnzm.clasihome.com:3443/api/conv/properties?email=contacto@iaga.cl&id=${id}&typeId=${typeId}&status=PUBLICADA&limit=${maxProperties}`);
      //const data = await fetch(`https://api.clasihome.com/rest/properties?id=${id}&typeId=${typeId}&status=PUBLICADA&limit=${maxProperties}`);
      const result = await data.json();
      return result;
    }catch(e){
      console.log("ERROR PROPIEDADES DESTACADAS ", e);

    }
  }
  const handleData = async()=> {
    const preview = /builderId/.test(location.search);
    const builderId = preview && location.search.match('[?&]' + "builderId" + '=([^&]+)')[1];
    try{
      if(runtimeData.initial.data){
        const dataEval = formatData(JSON.parse(runtimeData.initial.data));
        console.log("DATA SIN FORMATO", JSON.parse(runtimeData.initial.data));
        const featuredProperties = await getFeatured(dataEval.officeId, dataEval.typeId, dataEval.home.properties.maxProperties);
        dataEval.featuredProperties = featuredProperties.properties;
        console.log("RUNTIME DATA", dataEval);
        setData({ loading: false, data: dataEval });
      }
      else if(builderId){
          const data = await fetch(`https://api.clasihome.com/rest/builders?builderId=${builderId}`);
          const result = await data.json();
          const dataEval = formatData(result);
          const featuredProperties = await getFeatured(dataEval.officeId, dataEval.typeId, dataEval.home.properties.maxProperties);
          dataEval.featuredProperties = featuredProperties.properties;
          console.log("PREVIEW DATA");
          setData({ loading: false, data: dataEval });
      }
      else{
        console.log("NO DATA", dataEval);
        const dataEval = formatData({ office: "5e8e36b31c9d440000d35090" });
        const featuredProperties = await getFeatured(dataEval.officeId, dataEval.typeId, dataEval.home.properties.maxProperties);
        dataEval.featuredProperties = featuredProperties.properties;
        setData({ loading: false, data: dataEval });
      }
    }catch(e){
      console.log("ERROR", e);
      setData({ loading: false, error: e });
    }
  }

  useEffect(()=>{
    handleData();
  },[]);

  if(data.loading) return(
    <LoadingCont>
      <LoadingOutlined spin />
    </LoadingCont>
  );

  if(data.error) return(
    <LoadingCont>
      Error de conexion
    </LoadingCont>
  );

  return(
    <Context.Provider value={data.data}>
      <ThemeProvider theme={data.data}>
        <MainCont>
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content="Conectamos clientes con propiedades. Optimiza, gestiona y vende más. La nueva plataforma inmobiliaria que te ayuda a optimizar tu tiempo de trabajo y obtener mejores resultados. Pruébalo gratis por 15 días." />
            <meta name="keywords" content="clasihome, clasipro, clasihome propiedades chile, tecnología chile, software" />
            <title>Clasihome - Software Inmobilario de Chile</title>
            <link rel="canonical" href="https://clasihome.com/" />
            <meta property="og:url" content="https://clasihome.com/" />
            <meta property="og:title" content="Clasihome - Software Inmobilario de Chile" />
            <meta property="og:description" content="Conectamos clientes con propiedades. Optimiza, gestiona y vende más. La nueva plataforma inmobiliaria que te ayuda a optimizar tu tiempo de trabajo y obtener mejores resultados. Pruébalo gratis por 15 días." />
            <meta property="og:image" content="https://clasihome.com/logotipo_full.png" />
            <meta name="og:type" content="website" />
            <meta name="theme-color" content={data.data.primaryColor} /> 
          </Helmet>                       
          <GlobalStyles />
          <MobileHeader />
          <DesktopHeader dark={location.pathname !== "/" && location.pathname !== "/about" ? true : false} />
          {children}
          <ContactButton title="Enviar WhatsApp" rel="noopener" target="_blank" href={`https://api.whatsapp.com/send?phone=${data.data.movil.replace(/\s/g,'')}&text=Hola,%20estoy%20visitando%20su%20sitio%20Web%20y%20quisiera%20comunicarme%20con%20uestedes.`}>
            <WhatsAppOutlined />
          </ContactButton>
          <ContactButton title="Llamar" phone href={`tel:${data.data.phone.replace(/\s/g,'')}`}>
            <PhoneOutlined />
          </ContactButton>             
          <Footer />
        </MainCont>
      </ThemeProvider>
    </Context.Provider>
  )
}