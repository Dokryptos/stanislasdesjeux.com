import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artType, stillLifeType, filmType],
};

import { artType } from "./artType";
import { filmType } from "./filmType";
import { stillLifeType } from "./stillLifeType";
