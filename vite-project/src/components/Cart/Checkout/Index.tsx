import Icons from "@/lib/icons";
import CartItem from "../CartItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  return (
    <div className="container h-[calc(100vh-80px)]">
      <h1 className="font-bold text-2xl">Checkout</h1>
      <div className="grid grid-cols-3 mt-8 gap-8">
        <div className="col-span-2 space-y-8">
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
            <CollapsibleContent></CollapsibleContent>
          </Collapsible>
          <hr />
        </div>
        <div className="col-span-1 h-full w-full">
          <h1 className="font-bold">Order Summary</h1>
          <hr className="mt-4" />
          <div className="w-full h-full space-y-4 mt-4 overflow-auto grid-cols-1 grid-rows-2">
            <div className="overflow-auto grid grid-cols-1 row-auto h-48 w-full gap-4 p-4">
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
    </div>
  );
};

export default Index;
