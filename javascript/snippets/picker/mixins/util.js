
export function range(min, max) {
  const r = [];
  for (let i = min; i <= max; i++) {
    r.push(i);
  }
  return r;
}

export function zpadding(n) {
  if (n < 10) {
    return '0' + n;
  } else {
    return '' + n;
  }
}
