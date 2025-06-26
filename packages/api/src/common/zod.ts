import * as z from "zod/v4";

export const StringDecimal = z.string();

export const NumberString = z.number().transform(String);

export const StringNumber = z.string().transform(Number);

export const NonEmptyString = z.string().nonempty();

export const NonEmptyArray = <T>(type: z.ZodType<T>) =>
  z.array(type).nonempty();

export const PaginationQuery = z.object({
  offset: z.number().int().positive().catch(0),
  limit: z.number().int().positive().catch(100),
});
