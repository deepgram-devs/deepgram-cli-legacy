import { PathLike } from "fs";

export const validatePathLike = (
  input: PathLike,
  errorMessage: string = "Please provide a file or path"
) => {
  if ("" !== input) {
    return true;
  }

  throw Error(errorMessage);
};
