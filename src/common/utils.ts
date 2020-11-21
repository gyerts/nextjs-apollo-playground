// ============STRINGS============ //
export type HandlerFunc = <F>(x: F) => F;
/**
 * @function strHandlingCompositor - is used as function "compose" of util functions operating on target strng 
 * @param {Array} handlers - functions that handle target string param
 * @returns {(arg: string) => string}
 */

export const strHandlingCompositor = (...handlers: Array<HandlerFunc>) => (str: string) => handlers.reduceRight((prevHandler, nextHandler) => nextHandler(prevHandler), str);
export const capitilizeString = (str: string): string => str[0].toUpperCase() + str.slice(1);
export const splitBySpace = (str: string) => str.replace(/\-/g, ' ');
export const repeatStr = (fraction: string, times: number) => fraction.repeat(times);