export const validateNotBlank = (
  input: string,
  errorMessage: string = "Please provide a string that isn't blank"
) => {
  if ("" !== input) {
    return true;
  }

  throw Error(errorMessage);
};
