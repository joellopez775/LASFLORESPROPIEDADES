export default (x) => {
  return parseFloat(x.toString()).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}