import * as z from "zod";

 export const createPostSchema = z.object({
  petName: z
    .string()
    .nonempty("Pet name is required")
    .max(12, "Pet name is too long"),
  species: z.enum(["Cat", "Dog", "Bird", "Other"], "Please select a species"),
  sex: z.enum(["Male", "Female", "Unknown"], "Please select a gender"),
  dateLastSeen: z
    .coerce
    .date("Invalide date")
    .min(new Date("2015-01-01"), { error: "Date cannot before 2015-01-01" })
    .max(new Date(), { error: "Date cannot be after today" }),
  email: z
    .email("Invalid email")
    .nonempty("Contact email is required")
    .trim(),
  city: z
    .string()
    .nonempty("City is required")
    .max(20, "City name is too long"),
  state: z.enum([
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE',
    'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
    'WI', 'WY'
  ], "Please select a state"),
  zipcode: z
    .string()
    .regex(/^\d{5}$/, "Invalid ZIP code")
    .nonempty("ZIP code is required")
    .trim(),
  description: z
    .string()
    .max(500, "Description is too long, no more than 500 characters")
    .optional(),
  image: z
    .file("Invalid file")
    .optional(),
});
