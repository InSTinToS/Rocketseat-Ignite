const toBRL = (value: number | string) =>
  `R$ ${Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

export default toBRL;
