/**
 * Used to guarantee an error-free conversion of a string to JSON object.
 * @param str: string
 * @return any
 */
export function safeJSONParse(str: string | undefined): any {
  if (typeof str === "undefined") return null;
  try {
    return JSON.parse(str);
  } catch (_) {
    return null;
  }
}
