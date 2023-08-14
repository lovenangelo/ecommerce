import { useAppSelector } from "@/redux/hooks";
import { Redirect } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/form";

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
import { toast } from "@/components/ui/use-toast";
import Icons from "@/lib/icons";
import { useQuery } from "react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SkeletonLoading from "./skeleton";
import formSchema, { schemaDefaultValues } from "./schema";
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

// If id !== null, the user is using form to edit
const SellForm = ({ id }: { id?: string }) => {
  const user = useAppSelector((state) => state.user.value);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const product = useQuery(
    ["get-product-details"],
    () => productsApi.getProductItem(id),
    {
      retry: 2,
      enabled: Boolean(id),
      cacheTime: 0,
    }
  );

  const productData = product.data?.data;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: schemaDefaultValues,
  });

  useEffect(() => {
    if (productData) {
      form.reset({
        name: productData?.name ?? "",
        image: new File([], "image"),
        description: productData?.description ?? "",
        subtitle: productData?.subtitle ?? "",
        brand: productData?.brand ?? "",
        category: productData?.category ?? "",
        price: productData?.price ?? 20,
        quantity: productData?.quantity ?? 1,
        color: productData?.color ?? "beige",
        sizes: productData?.sizes.split(",") ?? [],
        payment_options: productData?.payment_options.split(",") ?? [],
      });
    }
  }, [productData, user, form]);

  if (product.isLoading) {
    return (
      <div className="bg-white w-full h-screen rounded">
        <SkeletonLoading />
      </div>
    );
  }

  if (user == null) {
    return <Redirect to="/auth" />;
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile !== null) {
      try {
        const compressedFile = await imageCompression(imageFile, options);
        setSelectedFile(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

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

      await productsApi
        .addNewProduct(product)
        .then(() => {
          toast({
            title: "Successfuly posted a new product",
            description: new Date().toString(),
          });
          setSelectedFile(null);
          setSubmitted(false);
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

  const updateProduct = async (data: FormSchemaType) => {
    let product = {
      ...data,
      payment_options: data.payment_options.join(),
      sizes: data.sizes.join(),
      _method: "put",
    };
    if (id) {
      setIsLoading(true);
      if (!selectedFile) {
        product = { ...product, image: null };
      } else {
        product = { ...product, image: selectedFile };
      }
      try {
        await productsApi.updateProduct(id, product);
        toast({
          title: "Successfuly updated!",
          description: new Date().toString(),
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Oops! Item cannot be updated.",
        });
      }

      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (selectedFile && !id) {
      setSubmitted(true);
      addProduct(data);
    }
    if (id) {
      updateProduct(data);
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-white p-4 lg:p-8 rounded space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 auto-rows"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="md:col-span-2 space-y-4 lg:col-span-3">
          {!id && <h1 className="font-bold lg:text-2xl">Add a new product</h1>}
          {id && <h1 className="font-bold text-2xl">Edit Product</h1>}
          <hr />
        </div>
        <div className="space-y-4 flex flex-col">
          <FormField
            control={form.control}
            name="image"
            render={(field) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    submitted && !selectedFile && !id && "text-destructive"
                  )}
                >
                  Product Image
                </FormLabel>
                {id && (
                  <LazyLoadImage
                    className="object-cover h-48 w-full"
                    src={
                      selectedFile !== null
                        ? URL.createObjectURL(selectedFile)
                        : `http://localhost:8000/${productData.image.url}`
                    }
                  />
                )}
                {id && (
                  <FormDescription>
                    If you choose a new file, the current image will be
                    replaced.
                  </FormDescription>
                )}
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
                {submitted && !selectedFile && !id ? (
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
                  <Textarea disabled={isLoading} className="h-48" {...field} />
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    defaultValue={field.value}
                    {...field}
                    onValueChange={(value) => {
                      if (
                        [
                          "handbags",
                          "watches",
                          "skincare",
                          "jewellery",
                          "apparels",
                        ].includes(value)
                      )
                        field.onChange(value);
                    }}
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
                    min={0}
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
                    min={0}
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

              <FormField
                control={form.control}
                name="sizes"
                render={() => (
                  <FormItem>
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
                                <FormLabel className="text-sm font-normal ">
                                  {item.label}
                                </FormLabel>
                              </div>

                              {index == sellUtils.sizes.length - 1 && (
                                <FormMessage className="col-span-2" />
                              )}
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-4">
              <FormLabel className="text-base">Payment Options</FormLabel>
            </div>
            <FormField
              control={form.control}
              name="payment_options"
              render={() => (
                <FormItem>
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
                              {index ==
                                sellUtils.deliveryOptions.length - 1 && (
                                <FormMessage />
                              )}
                            </FormItem>
                          </>
                        );
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
          </div>
        </div>
        <hr className="md:col-span-2 lg:col-span-3" />
        <div className="md:col-span-2 lg:col-span-3 flex w-full justify-center">
          <Button
            className="w-48 lg:mt-8 align-middle flex"
            onClick={() => {
              setSubmitted(true);
            }}
            type="submit"
            disabled={isLoading}
          >
            {id && <p>Save changes</p>} {!id && <p>Add Product</p>}{" "}
            {isLoading && (
              <span className="ml-2">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SellForm;
