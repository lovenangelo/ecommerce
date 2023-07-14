import { useAppSelector } from "@/redux/hooks";
import { Redirect } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  image: z.instanceof(File),
  description: z
    .string()
    .min(25, "Description is too short")
    .max(200, "Description is too long"),
  category: z.enum([
    "handbags",
    "watches",
    "skincare",
    "jewellery",
    "apparels",
  ]),
  price: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n > 0, { message: "Invalid price" }),
  quantity: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n >= 0, { message: "Invalid quantity" }),
});
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: new File([], "image"),
      description: "",
      category: "handbags",
      price: 20,
      quantity: 1,
    },
  });
  const user = useAppSelector((state) => state.user.value);
  if (user == null) {
    return <Redirect to="/auth" />;
  }

  type FormSchemaType = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setSubmitted(true);
    console.log(submitted, selectedFile);

    console.log(data);
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-[#9dc4b8] to-[#17494D] items-center py-16">
      <Form {...form}>
        <form
          className="bg-white p-8 rounded space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Add a new product</h1>
            <hr />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel
                  className={cn(
                    submitted && !selectedFile && "text-destructive"
                  )}
                >
                  Product Image
                </FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                {submitted && !selectedFile ? (
                  <p
                    className={cn("text-[0.8rem] font-medium text-destructive")}
                  >
                    Upload a photo of your product
                  </p>
                ) : (
                  <></>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Select name="category" defaultValue="handbags">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="handbags">Handbags</SelectItem>
                        <SelectItem value="watches">Watches</SelectItem>
                        <SelectItem value="skincare">Skincare</SelectItem>
                        <SelectItem value="jewellery">Jewellery</SelectItem>
                        <SelectItem value="apparels">Apparels</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" id="product-price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" id="product-price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              className="w-96 mt-8"
              onClick={() => {
                setSubmitted(true);
              }}
              type="submit"
            >
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Index;