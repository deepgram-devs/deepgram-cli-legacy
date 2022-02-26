const uuidPattern =
  /\b[a-f0-9]{8}\b-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-\b[a-f0-9]{12}\b/;

export const validateUuid = (
  input: string,
  errorMessage: string = "Please provide a valid UUID value"
) => {
  if (uuidPattern.test(input)) {
    return true;
  }

  throw Error(errorMessage);
};
