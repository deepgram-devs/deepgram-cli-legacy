import { validateNotBlank } from "./notBlank";

export const validateTemplateName = (input: string) =>
  validateNotBlank(input, "Please provide a valid template name");
