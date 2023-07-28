import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icons from "@/lib/icons";
import { useState } from "react";
type PaymentMethod = "CREDIT-CARD" | "COD";
import BraintreeDropIn from "./BrainTreeDropIn";

const SelectPaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT-CARD");

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
      {paymentMethod == "CREDIT-CARD" && <BraintreeDropIn showDropIn={true} />}{" "}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="COD" id="COD" />
        <Label htmlFor="COD">Cash On Delivery (COD)</Label>
      </div>
    </RadioGroup>
  );
};

export default SelectPaymentMethod;
