import * as math from './math'
export { math }
export const Compare = (num1, num2) => {
  let res = true
  if (num1 < num2) res = false
  return res
}
