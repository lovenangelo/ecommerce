import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icons from "@/lib/icons";
import { useState } from "react";
type PaymentMethod = "card" | "cod";
import BraintreeDropIn from "./BrainTreeDropIn";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updatePaymentMethod } from "@/redux/slices/orderPaymentMethodSlice";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { placeOrder } from "../checkout-api";
import { Order } from "../order-type";
import { useLocation } from "wouter";
import { resetOrderDetails } from "@/redux/slices/orderDetailsSlice";
import { updateAddress } from "@/redux/slices/orderAddressSlice";
import { changeTab } from "@/redux/slices/personalInformationTabSlice";

const SelectPaymentMethod = ({
  isProcessingOrder,
  setIsProcessingOrder,
}: {
  isProcessingOrder: boolean;
  setIsProcessingOrder: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const dispatch = useAppDispatch();
  const orderAddress = useAppSelector((state) => state.orderAddress.value);
  const orderDetails = useAppSelector((state) => state.orderDetails.value);
  const user = useAppSelector((state) => state.user.value);
  const placeOrderHandler = async () => {
    console.log(orderAddress, orderDetails);
    setIsProcessingOrder(true);
    if (orderDetails == null || orderAddress == null) {
      toast({
        variant: "destructive",
        title: "Cannot proceed",
        description:
          "Make sure you selected the correct address and payment method",
      });
      setIsProcessingOrder(false);
      return;
    }
    const order: Order = {
      user_id: user?.id,
      payment_method: paymentMethod,
      total_amount: orderDetails?.grandTotal,
      order_items: orderDetails.items,
      order_address_id: orderAddress.id,
    };
    try {
      toast({
        title: "Processing order...",
      });
      await placeOrder(order);

      toast({
        title: "Successfull!",
      });
      dispatch(updatePaymentMethod("card"));
      dispatch(changeTab("MY-ORDERS"));
      dispatch(resetOrderDetails());
      dispatch(updateAddress(null));
      setLocation("/profile");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to place order",
      });
      console.log(error);
    }
    setIsProcessingOrder(false);
  };
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
        <RadioGroupItem disabled={isProcessingOrder} value="card" id="card" />
        <Label
          className={cn(
            "flex items-center",
            isProcessingOrder && "text-gray-400"
          )}
          htmlFor="card"
        >
          Credit/Debit Card{" "}
          <span className="ml-2">
            <Icons.creditCard />
          </span>
        </Label>
      </div>{" "}
      {paymentMethod == "card" && (
        <BraintreeDropIn
          isProcessingOrder={isProcessingOrder}
          showDropIn={true}
          setIsProcessingOrder={setIsProcessingOrder}
        />
      )}{" "}
      {user !== null && (
        <div className="flex items-center space-x-2">
          <RadioGroupItem disabled={isProcessingOrder} value="cod" id="cod" />
          <Label
            className={cn(
              "flex items-center",
              isProcessingOrder && "text-gray-400"
            )}
            htmlFor="cod"
          >
            Cash On Delivery (COD)
          </Label>
        </div>
      )}
      {paymentMethod == "cod" && (
        <Button
          disabled={isProcessingOrder}
          onClick={placeOrderHandler}
          className="w-max mt-8"
        >
          Place Order
        </Button>
      )}
    </RadioGroup>
  );
};

export default SelectPaymentMethod;
