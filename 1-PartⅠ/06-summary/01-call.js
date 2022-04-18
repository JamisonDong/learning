Function.prototype.mycall = (context, ...rest) => {
  context.fun = this;
  const r = context.fun(...rest);
  delete context.fun;
  return r;
}