import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artType, stillLifeType, filmType, homepageType],
};

import { artType } from "./artType";
import { filmType } from "./filmType";
import { stillLifeType } from "./stillLifeType";
import { homepageType } from "./homepageType";
