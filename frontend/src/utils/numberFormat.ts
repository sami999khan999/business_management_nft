export function formatNumberWithCommas(number: number | undefined) {
  if (number) {
    return new Intl.NumberFormat("en-US").format(number);
  }
}
