module.exports = extend = (obj, props) =>
  for k, v of props then obj[k] = v
  obj
