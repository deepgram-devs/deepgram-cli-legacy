import { validateUuid } from "./uuid";

export const validateApiKeyID = (input: string) =>
  validateUuid(input, "Please provide a valid API key ID");
