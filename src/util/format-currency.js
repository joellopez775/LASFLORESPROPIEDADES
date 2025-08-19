const FormatCurrency = (type, number) => {
  switch (type) {
    case "UF":
      return new Intl.NumberFormat().format(
        (Math.round(number * 100) / 100).toFixed(2)
      );
      break;

    case "CLP":
      return new Intl.NumberFormat().format(
        (Math.round(number * 100) / 100).toFixed(0)
      );
      break;

    default:
      return number;
      break;
  }
};

export default FormatCurrency;
