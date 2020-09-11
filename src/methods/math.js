import Decimal from "decimal.js"

const builder = (method) => {
  const fn = (...args) => {
    if (!args.length) return 0
    if (args.length === 1) return args[0]
    if (args.length === 2) return Decimal[method](args[0], args[1]).toNumber()
    return args.reduce((prev, next) => prev[method](next), new Decimal(0)).toNumber()
  }

  if (method === 'mul') {
    return (...args) => {
      if (args.some(item => item === 0)) return 0
      return fn(...args)
    }
  }

  if (method === 'div') {
    return (first, ...args) => {
      const hasZero = args.some(item => item === 0)

      if (hasZero && first) return first * Infinity
      if (hasZero && !first) return NaN
      if (!first) return 0
      return fn(first, ...args)
    }
  }

  return fn
}



const add = builder('add')
const sub = builder('sub')
const mul = builder('mul')
const div = builder('div')
const $sum = (...args) => {
  let sum = 0
  args.forEach(item => {
    const current = parseFloat(item)
    if (!isNaN(current)) sum = add(sum, current)
  })
  return sum
}

export {
  add,
  sub,
  mul,
  div,
  add as sum,
  $sum
}
