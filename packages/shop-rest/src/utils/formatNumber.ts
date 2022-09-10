export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function formatMoney(value: number) {
  // Nine Zeroes for Billions
  return Math.abs(Number(value)) >= 1.0e9
    ? {
        value: Number((Math.abs(Number(value)) / 1.0e9).toFixed(2)),
        unit: "billion",
      }
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? {
        value: Number((Math.abs(Number(value)) / 1.0e6).toFixed(2)),
        unit: "million",
      }
    : {
        value: Number((Math.abs(Number(value)) / 1.0e3).toFixed(2)),
        unit: "thousand",
      };
}
