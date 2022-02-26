export const validateSHA1 = (
  input: string,
  errorMessage: string = "Please provide a valid SHA1 value"
) => {
  if (/([a-f0-9]{40})/g.test(input)) {
    return true;
  }

  throw Error(errorMessage);
};
