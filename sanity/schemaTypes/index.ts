import { type SchemaTypeDefinition } from "sanity";
import { categoryTypes } from "./categoryTypes";
import { addressType } from "./addressType";
import { brandType } from "./brandTypes";
import { orderType } from "./orderTypes";
import { productType } from "./productTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryTypes, addressType, brandType, orderType, productType],
};
