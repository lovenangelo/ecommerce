import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icons from "@/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
type PaymentMethod = "CREDIT-CARD" | "COD";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  name: z.string(),
  card_number: z.number(),
  expiration_date: z.number(),
  security_code: z.number(),
});
const SelectPaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT-CARD");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <RadioGroup
      className="my-8"
      onValueChange={(val) => {
        if (val == "CREDIT-CARD" || val == "COD") setPaymentMethod(val);
      }}
      defaultValue="CREDIT-CARD"
    >
      {" "}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="CREDIT-CARD" id="CREDIT-CARD" />
        <Label className="flex items-center" htmlFor="CREDIT-CARD">
          Credit/Debit Card{" "}
          <span className="ml-2">
            <Icons.creditCard />
          </span>
        </Label>
      </div>{" "}
      {paymentMethod == "CREDIT-CARD" && (
        <Form {...form}>
          <form className="my-2 space-y-4">
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-60">
                    <FormLabel>Name on card</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Enter Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="card_number"
                render={({ field }) => (
                  <FormItem className="w-60">
                    <FormLabel>Card number</FormLabel>
                    <FormControl>
                      <Input
                        className="appearance-none"
                        {...field}
                        placeholder="**** **** **** ****"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-4 items-center">
              <FormField
                control={form.control}
                name="expiration_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="MM/YY" type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="security_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="CVC/CVV" type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      )}{" "}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="COD" id="COD" />
        <Label htmlFor="COD">Cash On Delivery (COD)</Label>
      </div>
    </RadioGroup>
  );
};

export default SelectPaymentMethod;
