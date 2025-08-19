export default (baseUrl, params) => {
  params.status = "PUBLICADA";
  params.limit = 9;
  let i = 0;
  baseUrl = baseUrl + '?';
  for(let key in params){
    i++;
    const more = i !== 1 ? '&' : ''; 
    baseUrl = baseUrl + more + `${key}=${params[key]}`;
  }
  return baseUrl;
}