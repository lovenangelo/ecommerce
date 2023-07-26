import {
  Table,
  TableBody,
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
import { Link } from "wouter";
import CartItem from "./CartItem";
import { useQuery } from "react-query";
import { getCartItems } from "./api/cartApi";
import SkeletonLoading from "./SkeletonLoading";
const Index = () => {
  const cartItems = async () => {
    return getCartItems();
  };
  const cart = useQuery(["get-cart"], cartItems, { retry: 2, enabled: true });

  console.log(cart);

  return (
    <div className="container">
      <h1 className="font-bold text-xl mt-4">My Cart</h1>
      {cart.isLoading ? (
        <SkeletonLoading />
      ) : (
        <div className="h-[400px] grid grid-cols-3 mt-4 gap-8">
          <div className="col-span-2 w-full h-[400px] row-auto overflow-auto rounded-lg border">
            <Table className="bg-gray-100">
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
                  <TableCell className="font-medium w-96">
                    <div className="grid grid-cols-2 row-auto gap-2">
                      <div className="row-span-3 w-full h-full">
                        <img
                          className="object-cover"
                          src={images.bags[0].src}
                          alt="product image"
                        />
                      </div>
                      <div className="space-y-2">
                        <h1 className="font-bold">Coach</h1>
                        <p>Leather Coach Bag</p>
                        <p>Qty- 1</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">$54.59</TableCell>
                  <TableCell className="align-top">1</TableCell>
                  <TableCell className="align-top">$54.69</TableCell>
                  <div className="flex">
                    <Button variant="ghost" className="text-blue-700">
                      Move to Wishlist
                    </Button>
                    <Button variant="ghost" className="text-red-700">
                      Remove
                    </Button>
                  </div>
                </TableRow>{" "}
                <TableRow>
                  <TableCell className="font-medium w-96">
                    <div className="grid grid-cols-2 row-auto gap-2">
                      <div className="row-span-3 w-full h-full">
                        <img
                          className="object-cover"
                          src={images.bags[0].src}
                          alt="product image"
                        />
                      </div>
                      <div className="space-y-2">
                        <h1 className="font-bold">Coach</h1>
                        <p>Leather Coach Bag</p>
                        <p>Qty- 1</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">$54.59</TableCell>
                  <TableCell className="align-top">1</TableCell>
                  <TableCell className="align-top">$54.69</TableCell>
                  <div className="flex">
                    <Button variant="ghost" className="text-blue-700">
                      Move to Wishlist
                    </Button>
                    <Button variant="ghost" className="text-red-700">
                      Remove
                    </Button>
                  </div>
                </TableRow>{" "}
                <TableRow>
                  <TableCell className="font-medium w-96">
                    <div className="grid grid-cols-2 row-auto gap-2">
                      <div className="row-span-3 w-full h-full">
                        <img
                          className="object-cover"
                          src={images.bags[0].src}
                          alt="product image"
                        />
                      </div>
                      <div className="space-y-2">
                        <h1 className="font-bold">Coach</h1>
                        <p>Leather Coach Bag</p>
                        <p>Qty- 1</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">$54.59</TableCell>
                  <TableCell className="align-top">1</TableCell>
                  <TableCell className="align-top">$54.69</TableCell>
                  <div className="flex">
                    <Button variant="ghost" className="text-blue-700">
                      Move to Wishlist
                    </Button>
                    <Button variant="ghost" className="text-red-700">
                      Remove
                    </Button>
                  </div>
                </TableRow>{" "}
                <TableRow>
                  <TableCell className="font-medium w-96">
                    <CartItem />
                  </TableCell>
                  <TableCell className="align-top">$54.59</TableCell>
                  <TableCell className="align-top">1</TableCell>
                  <TableCell className="align-top">$54.69</TableCell>
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
          <div className="col-span-1 h-full bg-gray-100 rounded-lg p-5 border">
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
            <Collapsible className="mt-8">
              <CollapsibleTrigger className="flex space-x-2">
                <p>Apply Coupon Code</p>
                <Icons.chevronDownIcon />
              </CollapsibleTrigger>
              <CollapsibleContent className="py-5">
                <Coupon />
              </CollapsibleContent>
            </Collapsible>
            <hr className="my-8" />
            <div className="flex items-center my-8 space-x-4">
              <Link to="/checkout">
                <Button>Place Order</Button>
              </Link>
              <Button variant={"outline"}>Continue Shopping</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
