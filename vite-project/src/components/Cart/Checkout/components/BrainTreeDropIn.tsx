import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/redux/hooks";
import dropin from "braintree-web-drop-in";
import { useEffect, useState } from "react";
import { Order } from "../order-type";
import { placeOrder } from "../checkout-api";

export default function BraintreeDropIn({
  showDropIn,
  isProcessingOrder,
  setIsProcessingOrder,
}: {
  showDropIn: boolean;
  isProcessingOrder: boolean;
  setIsProcessingOrder: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [braintreeInstance, setBraintreeInstance] = useState<
    dropin.Dropin | undefined
  >(undefined);
  const orderAddress = useAppSelector((state) => state.orderAddress.value);
  const orderPaymentMethod = useAppSelector(
    (state) => state.orderPaymentMethodReducer.value
  );
  const orderDetails = useAppSelector((state) => state.orderDetails.value);
  const user = useAppSelector((state) => state.user.value);

  useEffect(() => {
    if (showDropIn && braintreeInstance === undefined) {
      console.log("running", braintreeInstance);
      const initializeBraintree = () => {
        if (braintreeInstance === undefined)
          return dropin.create(
            {
              authorization: "sandbox_hcctjjt8_b4knnxr55k9tmrds",
              container: "#braintree-drop-in-div",
            },
            (error, instance) => {
              if (error) console.error(error);
              else setBraintreeInstance(instance);
            }
          );
      };

      initializeBraintree();
    }
  }, [braintreeInstance, showDropIn]);

  useEffect(() => {
    return () => {
      if (braintreeInstance) {
        braintreeInstance.teardown();
      }
    };
  }, [braintreeInstance]);

  const onPaymentCompleted = async () => {
    setIsProcessingOrder(true);
    console.log(orderAddress, orderDetails, orderPaymentMethod);
    if (orderDetails == null || user == null || orderAddress == null) {
      setIsProcessingOrder(false);
      return;
    }
    console.log("passed", user);
    const order: Order = {
      user_id: user?.id,
      payment_method: "card",
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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to place order",
      });
    }
    setIsProcessingOrder(false);
    console.log("payment completed");
    toast({
      title: "Processing order...",
    });
    setIsProcessingOrder(true);
    console.log(orderAddress, orderPaymentMethod);
  };

  return (
    <div style={{ display: `${showDropIn ? "block" : "none"}` }}>
      <div id={"braintree-drop-in-div"} />

      {braintreeInstance && (
        <Button
          className="mb-8"
          disabled={!braintreeInstance || isProcessingOrder}
          onClick={() => {
            if (braintreeInstance) {
              braintreeInstance.requestPaymentMethod((error, payload) => {
                if (error) {
                  console.error(error);
                } else {
                  // const paymentMethodNonce = payload.nonce;
                  console.log("payment method nonce", payload.nonce);

                  // TODO: use the paymentMethodNonce to
                  //  call you server and complete the payment here

                  // alert(`Payment completed with nonce=${paymentMethodNonce}`);

                  onPaymentCompleted();
                }
              });
            }
          }}
        >
          Place Order
        </Button>
      )}
    </div>
  );
}
