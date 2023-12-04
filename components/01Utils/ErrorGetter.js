export const ErrorGetter = (errorObject) => {
  if (typeof errorObject === "string") return errorObject;
  else if (Array.isArray(errorObject)) return errorObject[0];
  else if (typeof errorObject === "object") {
    const firstErrorKey = Object.keys(errorObject)[0];
    const firstErrorMessage = errorObject[firstErrorKey];
    return firstErrorMessage;
  }
};
