import Icons from "@/lib/icons";
import CartItem from "../CartItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Link } from "wouter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AddressForm from "./components/Address";
import { useQuery } from "react-query";
import { deleteAddress, getAddresses } from "./checkout-api";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import SelectPaymentMethod from "./components/SelectPaymentMethod";
import { updateAddress } from "@/redux/slices/orderAddressSlice";
import { cn } from "@/lib/utils";

const Index = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector((state) => state.orderDetails.value);
  const orderAddress = useAppSelector((state) => state.orderAddress.value);

  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
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

  const addressList = useQuery(
    ["get-user-saved-addresses", user],
    fetchAddress,
    {
      retry: 2,
      enabled: user !== null,
      onSuccess(data) {
        setAddresses(data.data);
        if (data.data.length !== 0) {
          dispatch(updateAddress(data.data[pickedAddress]));
        } else {
          dispatch(updateAddress(null));
        }
      },
    }
  );

  const refetch = addressList.refetch;

  const queryIsLoading = addressList.isLoading;

  const handleDeleteAddress = async () => {
    try {
      setIsLoading(true);
      await deleteAddress(addresses[pickedAddress].id);
      if (addresses.length == 0) {
        dispatch(updateAddress(null));
      }
      await refetch();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setDeleteDialogOpen(false);
  };

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
      <div
        key={index}
        className="flex justify-start items-center space-x-2 w-full"
      >
        <Checkbox
          disabled={isProcessingOrder}
          checked={pickedAddress == index}
          onCheckedChange={() => {
            setPickedAddress(index);
            if (addresses.length !== 0) {
              dispatch(updateAddress(addresses[pickedAddress]));
            }
          }}
        />
        <div
          className={cn(
            "flex flex-wrap p-2 border-2 rounded-lg sm:space-x-1",
            isProcessingOrder && "text-gray-400"
          )}
        >
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
          <DialogTrigger disabled={isProcessingOrder}>
            <Icons.deleteIcon
              className={cn(isProcessingOrder && "text-gray-400")}
            />
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
      <div className="grid sm:grid-cols-3 mt-8 gap-8 ">
        <div className="sm:col-span-2 space-y-8 ">
          <h1 className="font-bold text-xl">Checkout</h1>
          {queryIsLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            addresses.length !== 0 && (
              <>
                <h2 className="font-bold flex">Address</h2>
                {addressOptions}
              </>
            )
          )}
          {!queryIsLoading && addresses.length < 2 && (
            <AddressForm
              onAddSuccess={() => {
                refetch();
              }}
              setAddresses={setAddresses}
            />
          )}
          <hr />
          <Collapsible>
            <CollapsibleTrigger
              disabled={orderAddress == null}
              className={cn(
                "font-bold flex",
                orderAddress == null && "text-gray-300"
              )}
            >
              <p>Select Payment Method</p>
              <Icons.chevronDownIcon />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SelectPaymentMethod
                isProcessingOrder={isProcessingOrder}
                setIsProcessingOrder={setIsProcessingOrder}
              />
            </CollapsibleContent>
          </Collapsible>
          <hr />
        </div>
        <div className="col-span-1 h-full w-full border p-4 rounded-lg">
          <h1 className="font-bold">Order Summary</h1>
          <hr className="mt-4" />
          <div className="w-full h-full space-y-4 mt-4 overflow-auto grid-cols-1 grid-rows-2">
            <div className=" overflow-y-auto h-96 flex flex-col row-auto w-full gap-4 p-4">
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
