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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import sellUtils from "@/lib/sell";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import productsApi from "@/lib/api/products";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import Icons from "@/lib/icons";
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
  const [isLoading, setIsLoading] = useState(false);

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
      subtitle: "",
      brand: "",
      category: "handbags",
      price: 20,
      quantity: 1,
      color: "beige",
      sizes: [],
      payment_options: [],
    },
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const addProduct = async (data: FormSchemaType) => {
    const prepare = {
      ...data,
      payment_options: data.payment_options.join(),
      sizes: data.sizes.join(),
    };
    if (selectedFile) {
      setIsLoading(true);
      const product = { ...prepare, image: selectedFile };
      console.log(product);

      await productsApi
        .addNewProduct(product)
        .then((res) => {
          console.log(res);
          toast({
            title: "Successfuly posted a new product",
            description: new Date().toString(),
          });
          setSelectedFile(null);
          form.reset();
          setIsLoading(false);
        })
        .catch((e) =>
          toast({
            title: "Oops! Item cannot be posted.",
            description: e,
          })
        );

      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setSubmitted(true);
    if (selectedFile) {
      addProduct(data);
    }
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
          className="bg-white p-8 rounded space-y-4 grid grid-cols-3 gap-8 auto-rows m-24"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4 col-span-3">
            <h1 className="font-bold text-2xl">Add a new product</h1>
            <hr />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={(field) => (
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
                      disabled={isLoading}
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      {...field}
                    />
                  </FormControl>
                  {submitted && !selectedFile ? (
                    <p
                      className={cn(
                        "text-[0.8rem] font-medium text-destructive"
                      )}
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
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="h-48"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-5">
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel>Product Category</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      name="category"
                      defaultValue="handbags"
                    >
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
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
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
                    <Input
                      disabled={isLoading}
                      type="number"
                      id="product-price"
                      {...field}
                    />
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
                    <Input
                      disabled={isLoading}
                      type="number"
                      id="product-price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe your product in one sentence.</FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="mb-4">
                  <FormLabel className="text-base">Color</FormLabel>
                  <FormDescription>
                    Select the color that fit best your product.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 row-auto">
                  {sellUtils.colors.map((item, index) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="color"
                      render={({ field }) => {
                        return (
                          <>
                            <FormItem key={item.id}>
                              <div className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    disabled={isLoading}
                                    checked={field.value == item.id}
                                    onCheckedChange={() => {
                                      field.onChange(item.id);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.label}
                                </FormLabel>
                              </div>
                              {index == sellUtils.colors.length - 1 && (
                                <div className="col-span-2">
                                  <FormMessage />
                                </div>
                              )}
                            </FormItem>
                          </>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <FormLabel className="text-base">Sizes</FormLabel>
                  <FormDescription>
                    Select the sizes available in your product.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 row-auto">
                  {sellUtils.sizes.map((item, index) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="sizes"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id}>
                            <div className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  disabled={isLoading}
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </div>

                            {index == sellUtils.sizes.length - 1 && (
                              <FormMessage />
                            )}
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-4">
                <FormLabel className="text-base">Payment Options</FormLabel>
              </div>
              <div className="grid grid-cols-2 row-auto">
                {sellUtils.deliveryOptions.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="payment_options"
                    render={({ field }) => {
                      return (
                        <>
                          <FormItem key={item.id}>
                            <div className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  disabled={isLoading}
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </div>
                            {index == sellUtils.deliveryOptions.length - 1 && (
                              <FormMessage />
                            )}
                          </FormItem>
                        </>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <hr className="col-span-3" />
          <div className="col-span-3 flex w-full justify-center">
            <Button
              className="w-48 mt-8 align-middle"
              onClick={() => {
                setSubmitted(true);
              }}
              type="submit"
              disabled={isLoading}
            >
              Add Product{" "}
              {isLoading && (
                <span className="ml-2">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Index;
