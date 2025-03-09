export const isFunction = (fn: unknown): fn is Function => {
  return typeof fn === 'function';
};
