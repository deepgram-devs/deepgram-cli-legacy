import { validateUuid } from "./uuid";

export const validateProjectID = (input: string) =>
  validateUuid(input, "Please provide a valid Project ID");
