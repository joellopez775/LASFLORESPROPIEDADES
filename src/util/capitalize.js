export default str =>{
  const first = str.charAt(0);
  str.toLowerCase();
  return first + str.toLowerCase().slice(1);
}