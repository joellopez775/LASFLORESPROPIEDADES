import { useContext, useReducer } from 'react';
import context from '../context';
import { useLocation } from '@reach/router';

export default (values)=> {
  const location = useLocation();
  const { typeId, officeId } = useContext(context);
  let searchParams = {};
  for(let [key, value] of new URLSearchParams(location.search).entries()){
    searchParams[key] = value;
  }
  const [params, setParams] = useReducer((current, next) => ({ ...current, ...next }), { ...values, ...searchParams });

  const onChange = (e) => {
    setParams({ [e.target.id]: e.target.value });
  }

  const getUrl = ()=> {
    const fixedParams = `/properties/?status=PUBLICADA,ARRENDADA,VENDIDA&limit=12&typeId=${typeId}&id=${officeId}`;
    if(params.stringSearch !== ''){
      return fixedParams + `searchString=${params.searchString}`;
    }
    return fixedParams + "&" + new URLSearchParams(params).toString();
  }

  return {
    values: params,
    setValues: setParams,
    onChange,
    getUrl,
  };
}