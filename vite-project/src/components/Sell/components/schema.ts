import * as z from "zod";
const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  image: z.instanceof(File).nullable(),
  description: z
    .string()
    .min(25, "Description is too short")
    .max(1000, "Description is too long"),
  category: z.string().nonempty("Required"),
  price: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n > 0, { message: "Invalid price" }),
  quantity: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n >= 0, { message: "Invalid quantity" }),
  color: z.string(),
  sizes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  payment_options: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  subtitle: z.string().min(2, "This field is required").max(250, "Too long"),
  brand: z
    .string()
    .min(2, "This field is required")
    .max(50, "Brand name is too long"),
});

export const schemaDefaultValues = {
  name: "",
  image: new File([], "image"),
  description: "",
  subtitle: "",
  brand: "",
  category: "",
  price: 20,
  quantity: 1,
  color: "beige",
  sizes: [],
  payment_options: [],
};

export default formSchema;
