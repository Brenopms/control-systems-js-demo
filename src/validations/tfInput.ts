import { isStable } from "control-systems-js";
import * as z from "zod";

const semicolonSeparatedNumbersRegex = /^-?[0-9]+(;-?[0-9]+)*$/;
const transformIntoArray = (value: string) =>
  value
    ?.trim()
    ?.split(";")
    ?.map((v) => Number(v)) || [];

// Define the validation schema using zod
export const tfFormInputSchema = z
  .object({
    numerator: z
      .string()
      .regex(
        semicolonSeparatedNumbersRegex,
        "Numerator must be a string of semicolon-separated numbers"
      ),
    denominator: z
      .string()
      .regex(
        semicolonSeparatedNumbersRegex,
        "Denominator must be a string of semicolon-separated numbers"
      ),
  })
  .transform((value, ctx) => {
    const denominator = transformIntoArray(value.denominator);
    const numerator = transformIntoArray(value.numerator);

    if (!(numerator?.length <= denominator.length)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Numerator should have same or lower order than Denominator",
        path: ["numerator"],
      });

      return z.NEVER;
    }

    if (!isStable(denominator)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This transfer function is not stable. Please try another one",
        path: ["denominator"],
      });

      return z.NEVER;
    }

    return { numerator, denominator };
  });
