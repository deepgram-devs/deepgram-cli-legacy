import { validateNotBlank } from "./notBlank";

export const validateApiKeyName = (input: string) =>
  validateNotBlank(input, "Please provide a name for the API key.");
