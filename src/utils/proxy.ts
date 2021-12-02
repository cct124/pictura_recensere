export default function overload<T extends { [key: string]: unknown }>(
  target: T,
  proxy: { [key: string]: (value: unknown) => unknown }
): T {
  function get(target: T, propKey: string, receiver: unknown) {
    return Reflect.get(target, propKey, receiver);
  }

  function set(target: T, propKey: string, value: unknown, receiver: unknown) {
    return Reflect.set(target, propKey, proxy[propKey](value), receiver);
  }

  return new Proxy(target, { get, set }) as T;
}

class Over<T extends { [key: string]: unknown }> {
  proxy: { [key: string]: (value: unknown) => unknown };
  [key: string]: unknown;

  constructor(
    target: T,
    proxy: { [key: string]: (value: unknown) => unknown }
  ) {
    this.proxy = proxy;
    for (const [key, value] of Object.entries(target)) {
      this[key] = value;
    }
  }

  get(target: T, propKey: string, receiver: unknown) {
    return Reflect.get(target, propKey, receiver);
  }

  set(target: T, propKey: string, value: unknown, receiver: unknown) {
    if (this.proxy[propKey])
      return Reflect.set(target, propKey, this.proxy[propKey](value), receiver);
    return Reflect.set(target, propKey, value, receiver);
  }
}

export const Overload = new Proxy(Over, {
  construct(target, args) {
    const overload = new target(args[0], args[2]);
    return new Proxy(overload, {
      get: overload.get,
      set: overload.set,
    });
  },
});
