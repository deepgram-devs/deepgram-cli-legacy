import { validateUuid } from "./uuid";

export const validateRequestID = (input: string) =>
  validateUuid(input, "Please provide a valid Request ID");
