import { ENVIRONMENT_CONSTANT } from "./environment";
import { IMAGE_CONSTANT } from "./image";
import { LAYOUT_CONSTANT } from "./layout";

export const CONSTANT = {
  ...LAYOUT_CONSTANT,
  ...IMAGE_CONSTANT,
  ...ENVIRONMENT_CONSTANT,
};
