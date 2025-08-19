const truncateString = (str, num)  => {
  if(str){
    return str.length > num ? str.slice(0, num) + "..." : str;
  }
}

export default truncateString;