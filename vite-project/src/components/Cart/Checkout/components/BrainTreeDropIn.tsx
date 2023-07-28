import { Button } from "@/components/ui/button";
import dropin from "braintree-web-drop-in";
import { useEffect, useState } from "react";

export default function BraintreeDropIn({
  showDropIn,
}: {
  showDropIn: boolean;
}) {
  const [braintreeInstance, setBraintreeInstance] = useState<
    dropin.Dropin | undefined
  >(undefined);

  useEffect(() => {
    if (showDropIn && braintreeInstance == undefined) {
      const initializeBraintree = () =>
        dropin.create(
          {
            // insert your tokenization key or client token here
            authorization: "sandbox_s9gd7m2p_vp62s592633kc5p5",
            container: "#braintree-drop-in-div",
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );
      initializeBraintree();
    }
  }, [showDropIn, braintreeInstance]);

  const onPaymentCompleted = () => {
    console.log("payment completed");
  };

  return (
    <div style={{ display: `${showDropIn ? "block" : "none"}` }}>
      <div id={"braintree-drop-in-div"} />

      {braintreeInstance && (
        <Button
          className="mb-8"
          disabled={!braintreeInstance}
          onClick={() => {
            if (braintreeInstance) {
              braintreeInstance.requestPaymentMethod((error, payload) => {
                if (error) {
                  console.error(error);
                } else {
                  const paymentMethodNonce = payload.nonce;
                  console.log("payment method nonce", payload.nonce);

                  // TODO: use the paymentMethodNonce to
                  //  call you server and complete the payment here

                  // ...

                  alert(`Payment completed with nonce=${paymentMethodNonce}`);

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
