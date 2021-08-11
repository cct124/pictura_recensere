/* eslint-disable */
/**
 * 数字前补零
 * @param {*} num 数字
 * @param {*} length 长度
 */
export function prefixInteger(num: number, length: number): string {
  return (Array(length).join("0") + num).slice(-length);
}

/**
 * 节流函数
 * @param {*} fn
 * @param {*} delay
 */
export function throttler(
  fn: (...args: any[]) => void,
  delay: number
): () => void {
  let resizeTimeout: NodeJS.Timeout | null;
  return function resizeThrottler(this: any, ...args: any[]) {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        fn.apply(this, args);
        // The actualResizeHandler will execute at a rate of 15fps
      }, delay);
    }
  };
}

/**
 * 防抖函数
 * @param {*} fn
 * @param {*} delay
 */
export function debounce(fn: any, delay: number) {
  let timer: any = null;

  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray(val: any) {
  return toString.call(val) === "[object Array]";
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
export function isDate(val: any) {
  return toString.call(val) === "[object Date]";
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val: any) {
  return val !== null && typeof val === "object";
}

/**
 * Determine if a value is an Function
 * @param val The value to test
 * @returns {boolean} True if value is an Function, otherwise false
 */
export function isFunction(val: any) {
  return toString.call(val) === "[object Function]";
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
export function forEachFn(obj: ObjKey | any[], fn: any) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === "undefined") {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== "object") {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, (obj as any[])[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, (obj as ObjKey)[key], key, obj);
      }
    }
  }
}

/**
 * 将对象数据转换为query参数
 * @param params
 */
export function queryParams(params: ObjKey) {
  const parts: any[] = [];

  forEachFn(params, function serialize(val: any, key: string) {
    if (val === null || typeof val === "undefined") {
      return;
    }

    if (isArray(val)) {
      key = key + "[]";
    } else {
      val = [val];
    }

    forEachFn(val, function parseValue(v: any) {
      if (isDate(v)) {
        v = v.toISOString();
      } else if (isObject(v)) {
        v = JSON.stringify(v);
      }
      parts.push(encode(key) + "=" + encode(v));
    });
  });

  return parts.join("&");
}

/**
 * 将字符串转换为合法的url
 * @param val
 * @returns
 */
export function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

export function classNames(...args: unknown[]) {
  return args.join(" ");
}
