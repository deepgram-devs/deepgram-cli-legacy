import { validateSHA1 } from "./sha1";

export const validateApiKey = (input: string) =>
  validateSHA1(input, "Please provide a valid API key");
