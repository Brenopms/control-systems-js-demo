import { Complex } from "systems-control-js";

export const complexToString = (value: Complex, precision = 3) => {
  const sign = value?.im < 0 ? "-" : "+";
  return `${value?.re?.toFixed(precision)} ${sign} ${Math.abs(value?.im)?.toFixed(precision)}i`;
};
