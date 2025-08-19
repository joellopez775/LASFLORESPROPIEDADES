import React, { useContext, useState, useEffect, Fragment } from 'react';
import context from '../../context';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { SearchOutlined, UpOutlined, DownOutlined, CheckOutlined } from '@ant-design/icons';
import { gsap } from 'gsap';

import { useUrlForm } from '../../hooks';
import { Autocomplete, Select, Input } from '../inputs';
import PROPERTY_TYPE from '../../constants/PROPERTY_TYPE.json';
import COMMUNES from '../../constants/CITIES.json';
import { Button } from '../../styled-components';
import Link from "../link";

/* ====== estilos ====== */
const Form = styled.form`
  padding: 0;
  font-family: 'Raleway', sans-serif !important;
  margin-top: 1rem;
  @media(min-width: 768px){
    margin-top: 0;
  }
`;

const FormInnerCont = styled.div`
  margin-bottom: ${props => props.first ? "2rem" : "0"};
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(0,0,0,0.05);
  backdrop-filter: blur(2px);
  @media(min-width: 768px){
    padding: 2rem 3rem;
  }
`;

const ButtonCustom = styled(Button)`
  min-height: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #fff;
  color: ${props => props.theme.primaryColor};
  font-size: 1.5rem;
  box-shadow: none !important;
  border: none;
  border-left: 1px solid ${props => props.theme.primaryColor};
  padding: 1px 6px;
`;

const MoreFilterCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.1rem;
`;

const FilterButton = styled.button`
  border: 1px solid #F9A200;
  background-color: #F9A200;
  color: #fff;
  padding: 0.25rem 1rem;   /* más pequeño */
  border-radius: 6px;      /* esquinas rectangulares suaves */
  font-size: 0.8rem;       /* texto más chico */
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .3rem;
  transition: background-color .2s ease, transform .1s ease;

  &:hover { background-color: #e08f00; }
  &:active { transform: translateY(1px); }
`;

/* ====== componente ====== */
export default function SearchForm({ withFilters = true, id }) {
  const state = useContext(context);
  const [filter, setFilter] = useState(false);
  const [byCode, setByCode] = useState("");

  const { values, onChange, getUrl, setValues } = useUrlForm({
    propertyType: '',
    operation: '',
    commune: '',
    stringSearch: '',
    priceMin: '',
    priceMax: '',
    totalAreaFrom: '',
    totalAreaTo: '',
    bedrooms: '',
    bathrooms: '',
    currency: 'CLP',
  });

  const handleFilter = () => {
    // Limpia los filtros numéricos/categóricos al abrir/cerrar
    setValues(v => ({
      ...v,
      priceMin: '',
      priceMax: '',
      totalAreaFrom: '',
      totalAreaTo: '',
      bedrooms: '',
      bathrooms: '',
      currency: 'CLP',
    }));
    setFilter(prev => !prev);
  };

  useEffect(() => {
    if (filter) {
      gsap.from("#filters", { opacity: 0, y: 10, duration: .5, ease: "back.out(1.7)" });
    }
  }, [filter]);

  return (
    <Form id={id} onSubmit={(e) => e.preventDefault()} withFilters={withFilters}>
      {/* Bloque principal */}
      <FormInnerCont first={withFilters}>
        <Row noGutters>
          <Col xs={12} md={3}>
            <Select
              onChange={e => setByCode(e.target.value)}
              default="Buscar por"
              options={["Propiedad", "Código"]}
              value={byCode}
              primary
              capitalize
              noAll
            />
          </Col>

          {byCode === "Código" ? (
            <Col xs={12} md={9}>
              <Autocomplete
                id="stringSearch"
                onSelect={onChange}
                selected={values.commune}
                placeholder="Ingrese el código de la propiedad"
                icon
              />
            </Col>
          ) : (
            <Fragment>
              <Col xs={12} md={3}>
                <Select
                  id="propertyType"
                  onChange={onChange}
                  value={values.propertyType}
                  default="Propiedad"
                  options={PROPERTY_TYPE}
                  primary
                  capitalize
                />
              </Col>

              <Col xs={12} md={2}>
                <Select
                  id="operation"
                  onChange={onChange}
                  value={values.operation}
                  default="Operación"
                  options={["VENTA", "ARRIENDO"]}
                  primary
                  capitalize
                />
              </Col>

              <Col xs={12} md={3}>
                <Autocomplete
                  id="commune"
                  onSelect={onChange}
                  selected={values.commune}
                  options={COMMUNES.map(val => val.name)}
                  placeholder="Comuna"
                />
              </Col>

              <Col xs={12} md={1}>
                <Link fade to={getUrl()} duration={.5}>
                  <ButtonCustom
                    block
                    primary
                    type="submit"
                    title="Buscar"
                    className="d-none d-md-block"
                  >
                    <span className="d-xs-block d-md-none">Buscar</span>
                    <SearchOutlined className="d-none d-md-block" />
                  </ButtonCustom>
                </Link>

                <Link fade to={getUrl()} duration={.5}>
                  <Button
                    block
                    primary
                    type="submit"
                    title="Buscar"
                    className="d-md-none"
                  >
                    <span className="d-xs-block d-md-none">Buscar</span>
                    <SearchOutlined className="d-none d-md-block" />
                  </Button>
                </Link>
              </Col>
            </Fragment>
          )}
        </Row>
      </FormInnerCont>

      {/* Botón Más/Menos filtros SIEMPRE visible si withFilters=true */}
      {withFilters && (
        <MoreFilterCont>
          <FilterButton onClick={handleFilter}>
            {filter ? (
              <>
                Menos filtros <UpOutlined />
              </>
            ) : (
              <>
                Más filtros <DownOutlined />
              </>
            )}
          </FilterButton>
        </MoreFilterCont>
      )}

      {/* Bloque de filtros avanzados */}
      {withFilters && filter && (
        <FormInnerCont first id="filters">
          <Row noGutters>
            <Col xs={12} md={3}>
              <Input
                id="totalAreaFrom"
                onChange={onChange}
                value={values.totalAreaFrom}
                placeholder="Superficie desde m²"
                primary
                type="number"
                min={0}
              />
            </Col>

            <Col xs={12} md={3}>
              <Input
                id="totalAreaTo"
                onChange={onChange}
                value={values.totalAreaTo}
                placeholder="Superficie hasta m²"
                primary
                type="number"
                min={0}
              />
            </Col>

            <Col xs={12} md={2}>
              <Input
                id="priceMin"
                onChange={onChange}
                value={values.priceMin}
                placeholder="Precio desde"
                primary
                type="number"
                min={0}
              />
            </Col>

            <Col xs={12} md={2}>
              <Input
                id="priceMax"
                onChange={onChange}
                value={values.priceMax}
                placeholder="Precio hasta"
                primary
                type="number"
                min={0}
              />
            </Col>

            <Col xs={12} md={1}>
              <Select
                id="currency"
                onChange={onChange}
                value={values.currency}
                default="Moneda"
                options={["CLP", "UF"]}
                primary
                noAll
              />
            </Col>

            <Col xs={12} md={1}>
              <Link fade to={getUrl()} duration={.5}>
                <ButtonCustom
                  block
                  primary
                  type="submit"
                  title="Aplicar"
                  className="d-none d-md-block"
                >
                  <span className="d-xs-block d-md-none">Aplicar</span>
                  <CheckOutlined className="d-none d-md-block" />
                </ButtonCustom>
              </Link>
            </Col>
          </Row>
        </FormInnerCont>
      )}
    </Form>
  );
}