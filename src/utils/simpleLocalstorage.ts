export function setL(index: string, value: any): void {
  localStorage.setItem(index, JSON.stringify(value));
}

export function getL(index: string): any {
  let extract = localStorage.getItem(index);
  return extract ? JSON.parse(extract) : null;
}
