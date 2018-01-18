

export function mod(n: number, x: number): number {
  return (n % x + x) % x;
}

export function absFloor(num: number): number {
  return num < 0 ? Math.ceil(num) || 0 : Math.floor(num);
}

