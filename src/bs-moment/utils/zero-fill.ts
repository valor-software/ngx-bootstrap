export function zeroFill(num: number,
                         targetLength: number,
                         forceSign?: boolean): string {
  const absNumber = `${Math.abs(num)}`;
  const zerosToFill = targetLength - absNumber.length;
  const sign = num >= 0;
  const _sign = sign ? (forceSign ? '+' : '') : '-';
  // todo: this is crazy slow
  const _zeros = Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1);

  return (_sign + _zeros + absNumber);
}
