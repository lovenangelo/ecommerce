import Icons from "@/lib/icons";
import CartItem from "../CartItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Link, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
type PaymentMethod = "CREDIT-CARD" | "COD";
const Index = () => {
  const user = useAppSelector((state) => state.user.value);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT-CARD");

  if (user == null) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="container">
      <h1 className="font-bold text-xl">Checkout</h1>
      <div className="grid grid-cols-3 mt-8 gap-8 ">
        <div className="col-span-2 space-y-8 ">
          <Collapsible>
            <CollapsibleTrigger className="font-bold flex">
              <p>Add New Address</p>
              <Icons.chevronDownIcon />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid gap-4 grid-cols-2 rows-auto my-8">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="Enter Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="mobile-number">Mobile Number</Label>
                  <Input
                    id="mobile-number"
                    type="number"
                    placeholder="Enter Number"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="street-address">Street Address</Label>
                  <Input
                    id="street-address"
                    type="text"
                    placeholder="Enter Address"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" type="text" placeholder="Enter State" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" type="text" placeholder="Enter City" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="zip-code">Zip Code</Label>
                  <Input
                    id="zip-code"
                    type="number"
                    placeholder="Enter Zipcode"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <hr />
          <Collapsible>
            <CollapsibleTrigger className="font-bold flex">
              <p>Select Payment Method</p>
              <Icons.chevronDownIcon />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <RadioGroup
                className="my-8"
                onValueChange={(val) => {
                  if (val == "CREDIT-CARD" || val == "COD")
                    setPaymentMethod(val);
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
                  <div className="my-2 space-y-4">
                    <div>
                      <Label htmlFor="card-name">Name on card</Label>
                      <Input placeholder="Luke Skywalker" />
                    </div>
                    <div>
                      <Label htmlFor="card-number">Card number</Label>
                      <Input placeholder="**** **** **** ****" type="number" />
                    </div>
                    <div className="flex space-x-4 items-center">
                      <div>
                        <Label htmlFor="card-expiration">Expiration date</Label>
                        <Input placeholder="MM/YY" type="number" />
                      </div>
                      <div>
                        <Label htmlFor="card-security-code">
                          Security code
                        </Label>
                        <Input placeholder="CVC" type="number" />
                      </div>
                    </div>
                  </div>
                )}{" "}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COD" id="COD" />
                  <Label htmlFor="COD">Cash On Delivery (COD)</Label>
                </div>
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>
          <hr />
        </div>
        <div className="col-span-1 h-full w-full border p-4 rounded-lg">
          <h1 className="font-bold">Order Summary</h1>
          <hr className="mt-4" />
          <div className="w-full h-full space-y-4 mt-4 overflow-auto grid-cols-1 grid-rows-2">
            <div className="overflow-auto grid grid-cols-1 row-auto h-64 w-full gap-4 p-4">
              <CartItem />
              <CartItem />
              <CartItem />
            </div>
            <div className="col-span-1 h-max bg-gray-100 p-5">
              <h1 className="mb-4 font-bold text-lg">Order Details</h1>
              <div className="grid grid-cols-2 row-auto gap-2">
                <p>Sub Total</p>
                <p>$119.69</p>
                <p>Discount</p>
                <p>-$13.40</p>
                <p>Delivery Fee</p>
                <p>-$0.00</p>
                <p className="font-semibold">Grand Total</p>
                <p>$106.29</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex h-full w-full justify-between items-center align-bottom">
        <Link to="/cart" className="underline">
          Back to Cart
        </Link>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default Index;
