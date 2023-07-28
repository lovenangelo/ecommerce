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
import { useEffect, useState } from "react";
import { Link, Redirect } from "wouter";
import { useAppSelector } from "@/redux/hooks";
import AddressForm from "./components/Address";
import { useQuery } from "react-query";
import { deleteAddress, getAddresses } from "./checkout-api";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
type PaymentMethod = "CREDIT-CARD" | "COD";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const user = useAppSelector((state) => state.user.value);
  const orderDetails = useAppSelector((state) => state.orderDetails.value);
  const [addresses, setAddresses] = useState<
    {
      city: string;
      fullname: string;
      id: number;
      mobile_number: string;
      state: string;
      street_address: string;
      zip_code: string;
    }[]
  >([]);
  const [pickedAddress, setPickedAddress] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAddress = async () => {
    return await getAddresses();
  };

  const addressList = useQuery(["get-user-saved-addresses"], fetchAddress, {
    retry: 2,
    enabled: true,
    onSuccess(data) {
      setAddresses(data.data);
    },
  });

  const removeQuery = addressList.remove;

  useEffect(() => {
    return () => {
      removeQuery();
    };
  }, [removeQuery]);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT-CARD");

  const handleDeleteAddress = async () => {
    try {
      setIsLoading(true);
      await deleteAddress(addresses[pickedAddress].id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setDeleteDialogOpen(false);
  };

  if (user == null) {
    return <Redirect to="/auth" />;
  }

  const items = orderDetails?.items.map((item, index) => (
    <CartItem
      key={index}
      title={item.title}
      subtitle={item.subtitle}
      quantity={item.quantity}
      src={item.src}
    />
  ));

  const addressOptions = addresses.map((address, index) => {
    return (
      <div className="flex justify-start items-center space-x-2">
        <Checkbox
          checked={pickedAddress == index}
          onCheckedChange={() => {
            setPickedAddress(index);
          }}
        />
        <div className="flex p-2 border-2 rounded-lg space-x-1">
          <h1>{address.fullname},</h1>
          <p>{address.street_address},</p>
          <p>{address.city},</p>
          <p>{address.state},</p>
          <p>{address.zip_code},</p>
          <p>{address.mobile_number}</p>
        </div>
        <Dialog
          open={deleteDialogOpen}
          onOpenChange={(open) => {
            setDeleteDialogOpen(open);
          }}
        >
          <DialogTrigger>
            <Button variant={"ghost"} className="text-destructive">
              <Icons.deleteIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                saved address.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2">
              <Button
                disabled={isLoading}
                onClick={() => {
                  setDeleteDialogOpen(false);
                }}
              >
                No
              </Button>
              <Button
                disabled={isLoading}
                variant={"outline"}
                onClick={handleDeleteAddress}
              >
                Yes
                {isLoading && (
                  <span className="ml-2">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="grid grid-cols-3 mt-8 gap-8 ">
        <div className="col-span-2 space-y-8 ">
          <h1 className="font-bold text-xl">Checkout</h1>

          {addresses.length !== 0 && (
            <>
              <h2 className="font-bold flex">Address</h2>
              {addressOptions}
            </>
          )}
          {addresses.length < 2 && <AddressForm />}
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
              {items}
            </div>
            <div className="col-span-1 h-max bg-gray-100 p-5">
              <h1 className="mb-4 font-bold text-lg">Order Details</h1>
              <div className="grid grid-cols-2 row-auto gap-2">
                <p>Sub Total</p>
                <p>${orderDetails?.subTotal ?? 0}</p>
                <p>Discount</p>
                <p>$0.00</p>
                <p>Delivery Fee</p>
                <p>$0.00</p>
                <p className="font-semibold">Grand Total</p>
                <p className="font-bold">${orderDetails?.grandTotal ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 flex h-full w-full justify-between items-center align-bottom">
        <Link to="/cart" className="underline">
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Index;
