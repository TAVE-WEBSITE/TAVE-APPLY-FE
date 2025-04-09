import { useEffect, useState } from "react";

type ValidationFn<T> = (value: T) => string;
type ValidationFnWithCompare<T> = (value: T, compareValue: T) => string;

const useValidation = <T extends string | number>(
  value: T,
  validator: ValidationFn<T> | ValidationFnWithCompare<T>,
  compareValue?: T
) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const hasValue = typeof value === "string" && value.length > 0;
    const hasCompare =
      typeof compareValue === "string" ? compareValue.length > 0 : false;
    if (compareValue !== undefined) {
      if (hasValue && hasCompare) {
        setError(
          (validator as ValidationFnWithCompare<T>)(value, compareValue)
        );
      } else setError("");
    } else {
      if (hasValue) {
        setError((validator as ValidationFn<T>)(value));
      } else {
        setError("");
      }
    }
  }, [value, compareValue]);

  return error;
};

export { useValidation };
