import { z } from "zod";

const REPEAT_3_PLUS = /(.)\1{2,}/;
const LETTER = /[A-Za-zÀ-ÖØ-öø-ÿ]/;

const ADDRESS_CHARS = /^[A-Za-z0-9À-ÖØ-öø-ÿ.,'()\-#/ \s]+$/;

export const EmployeeFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Employee name is required" }).max(50, { message: "Employee name must be less than 50 characters" }),
  address: z
    .string()
    .trim()
    .min(10, { message: "Address looks too short (min 10)" })
    .max(100, { message: "Address must be less than 100 characters" })
    .refine((v) => ADDRESS_CHARS.test(v), {
      message: "Address contains invalid characters",
    })
    .refine((v) => LETTER.test(v), { message: "Address must contain letters" })
    .refine(
      (v) => {
        const words = v.split(/\s+/).map((w) => w.match(/[A-Za-zÀ-ÖØ-öø-ÿ]+/g)?.join("") ?? "");
        const letterWords = words.filter((w) => w.length >= 2);
        return letterWords.length >= 2;
      },
      { message: "Address must include at least two words with letters" }
    )
    .refine((v) => !REPEAT_3_PLUS.test(v), { message: "Please avoid repeated characters" })
    .transform((s) => s.replace(/\s+/g, " ")),
  department: z.string().trim().min(1, { message: "Please choose department" }),
});
