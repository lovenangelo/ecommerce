import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icons from "@/lib/icons";
import { useState } from "react";
type PaymentMethod = "card" | "cod";
import BraintreeDropIn from "./BrainTreeDropIn";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { updatePaymentMethod } from "@/redux/slices/orderPaymentMethodSlice";

const SelectPaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const dispatch = useAppDispatch();
  return (
    <RadioGroup
      className="my-8"
      onValueChange={(val: "card" | "cod") => {
        if (val == "card" || val == "cod") setPaymentMethod(val);
        dispatch(updatePaymentMethod(val));
      }}
      defaultValue="card"
    >
      {" "}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="card" />
        <Label className="flex items-center" htmlFor="card">
          Credit/Debit Card{" "}
          <span className="ml-2">
            <Icons.creditCard />
          </span>
        </Label>
      </div>{" "}
      {paymentMethod == "card" && <BraintreeDropIn showDropIn={true} />}{" "}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="cod" id="cod" />
        <Label htmlFor="cod">Cash On Delivery (COD)</Label>
      </div>
      {paymentMethod == "cod" && (
        <Button className="w-max mt-8">Place Order</Button>
      )}
    </RadioGroup>
  );
};

export default SelectPaymentMethod;
