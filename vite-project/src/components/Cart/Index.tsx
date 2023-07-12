import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import images from "@/lib/images";
import { Button } from "../ui/button";
import Icons from "@/lib/icons";
import Coupon from "../Products/Coupon";
const Index = () => {
  return (
    <div className="min-h-screen container">
      <h1>My Cart</h1>
      <div className="grid grid-cols-3 mt-8 gap-5">
        <div className="col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>$54.59</TableCell>
                <TableCell>1</TableCell>
                <TableCell className="text-right">$54.69</TableCell>
                <div className="flex">
                  <Button variant="ghost" className="text-blue-700">
                    Move to Wishlist
                  </Button>
                  <Button variant="ghost" className="text-red-700">
                    Remove
                  </Button>
                </div>
              </TableRow>{" "}
            </TableBody>
          </Table>
        </div>
        <div className="col-span-1 bg-gray-50 p-5">
          <h1 className="mb-4 font-bold text-lg">Order Summary</h1>
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
          <div className="flex items-center mt-8 space-x-4">
            <Button>Place Order</Button>
            <Button variant={"outline"}>Continue Shopping</Button>
          </div>
        </div>
      </div>
      <Collapsible>
        <CollapsibleTrigger className="flex">
          <p>Apply Coupon Code</p>
          <Icons.chevronDownIcon />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-5">
          <Coupon />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Index;
