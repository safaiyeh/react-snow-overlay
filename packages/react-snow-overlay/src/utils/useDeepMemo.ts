import { useRef } from "react";

export const useDeepMemo = <T, V>(memoFn: () => T, key: V): T => {
  const ref = useRef<{ key: V; value: T }>();

  if (!ref.current || !simpleDeepEqual(key, ref.current.key))
    ref.current = { key, value: memoFn() };

  return ref.current.value;
};

/** Primitive/lightweight deep equal implementation for our useDeepMemo hook,
 * since we know it'll only be used for SnowOptions. This is alternative to
 * importing more sophisticated library in effort to keep minimal bundle size.
 */
const simpleDeepEqual = <T>(obj1: T, obj2: T): boolean => {
  if (obj1 === obj2) return true;

  if (
    obj1 === null ||
    obj2 === null ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) return false;

  if (
    keys1.some(
      (key) => !keys2.includes(key) || !simpleDeepEqual(obj1[key], obj2[key])
    )
  ) {
    return false;
  }

  return true;
};
