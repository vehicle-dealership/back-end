import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  requestAddressSchema,
  returnAddressSchema,
} from "../schemas/addresses.schemas";

export type IRequestAddress = z.infer<typeof requestAddressSchema>;
export type IReturnAddress = z.infer<typeof returnAddressSchema>;
export type TUpdateAddress = DeepPartial<IRequestAddress>;
