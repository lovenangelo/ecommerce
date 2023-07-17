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
import productsApi from "@/lib/api/products";
import { useEffect } from "react";
const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  image: z.instanceof(File),
  description: z
    .string()
    .min(25, "Description is too short")
    .max(1000, "Description is too long"),
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
import { toast } from "../ui/use-toast";

const Index = () => {
  const user = useAppSelector((state) => state.user.value);
  useEffect(() => {
    if (!user)
      toast({
        title: "Login to your account",
        description: "You need to log in to post a product.",
      });
  }, [user]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log(file);

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

  type FormSchemaType = z.infer<typeof formSchema>;

  const addProduct = async (data: FormSchemaType) => {
    if (selectedFile) {
      const product = { ...data, image: selectedFile };
      await productsApi.addNewProduct(product);
    }
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setSubmitted(true);
    addProduct(data);
  };

  if (user == null) {
    return <Redirect to="/auth" />;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center py-16 bg-gradient-to-r from-[#9dc4b8] to-[#17494D]"
      )}
    >
      <Form {...form}>
        <form
          className="bg-white p-8 rounded space-y-4 grid grid-cols-2 gap-4 auto-rows"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4 col-span-2">
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
                  <Textarea className="h-48" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-5">
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
          </div>
          <div className="col-span-2">
            <Button
              className="w-full mt-8"
              onClick={() => {
                setSubmitted(true);
              }}
              type="submit"
            >
              Add Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Index;
