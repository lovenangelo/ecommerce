import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import Icons from "@/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { createAddress } from "../checkout-api";
import { useState } from "react";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const zipCodeRegex = new RegExp(/^\d{4}$/);

const FormSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters",
  }),
  mobile_number: z.string().regex(phoneRegex, "Invalid Number!"),
  zip_code: z.string().regex(zipCodeRegex, "Invalid Zip Code!"),
  street_address: z.string().nonempty("Don't leave this field empty"),
  city: z.string().nonempty("Don't leave this field empty"),
  state: z.string().nonempty("Don't leave this field empty"),
});

const AddressForm = ({ onAddSuccess }: { onAddSuccess: () => void }) => {
  const [addressSaveLoading, setAddressSaveLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: "",
      mobile_number: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setAddressSaveLoading(true);
      await createAddress(data);
      form.reset();
      toast({
        title: "Address saved!",
      });
    } catch (error) {
      toast({
        title: "Cannot save address",
      });
    }
    onAddSuccess();
    setAddressSaveLoading(false);
  }

  return (
    <Collapsible>
      <CollapsibleTrigger className="font-bold flex">
        <p>Add New Address</p>
        <Icons.chevronDownIcon />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 grid-cols-2 rows-auto my-8"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Enter Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      id="mobile_number"
                      placeholder="Enter Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="street-address"
                      type="text"
                      placeholder="Enter Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="city"
                      type="text"
                      placeholder="Enter City"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="state"
                      type="text"
                      placeholder="Enter State"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      min={0}
                      id="zip_code"
                      type="number"
                      placeholder="Enter Zip Code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full col-span-4 justify-end flex">
              <Button className="w-max justify-end flex" type="submit">
                Save
                {addressSaveLoading && (
                  <span className="ml-2">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AddressForm;