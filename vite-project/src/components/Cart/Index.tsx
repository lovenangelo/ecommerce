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

import { Button } from "../ui/button";
import Icons from "@/lib/icons";
import Coupon from "../Products/Coupon";
import { Link } from "wouter";
import { useQuery } from "react-query";
import { deleteCartItem, getCartItems, updateCartItem } from "./api/cartApi";
import SkeletonLoading from "./SkeletonLoading";
import { ProductItem } from "../Products/types/product-item";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { Input } from "../ui/input";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Checkbox } from "../ui/checkbox";
import debounce from "lodash.debounce";
const Index = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<
    { price: number; product_id: number; quantity: number }[]
  >([]);
  const [subtotal, setSubtotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const cartItems = async () => {
    return getCartItems();
  };
  const cart = useQuery(["get-cart"], cartItems, { retry: 2, enabled: true });

  const removeCartItemHandler = async (id: string) => {
    try {
      await deleteCartItem(id);
      toast({
        title: "Succesfully removed item from your cart",
      });
      cart.refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete item",
      });
    }
  };

  const updateCartItemHandler = async (id: string, quantity: number) => {
    await updateCartItem(id, quantity);
  };

  const [quantityUpdateDebounce] = useState(() =>
    debounce(
      (id: string, value: number) => {
        updateCartItemHandler(id, value);
      },
      1000,
      { leading: false, trailing: true }
    )
  );

  const items = cart.data?.data.data.map(
    (
      item: { product: ProductItem; quantity: number; id: string },
      index: number
    ) => {
      return (
        <TableRow key={index} className="h-max">
          <TableCell className="font-medium w-96">
            <div className="grid grid-flow-col row-auto gap-4">
              <Checkbox
                onCheckedChange={(value) => {
                  if (value) {
                    setOrders([
                      ...orders,
                      {
                        price: item.product.price,
                        quantity: item.quantity,
                        product_id: item.product.id,
                      },
                    ]);
                    setSubtotal(
                      (prev) => prev + item.product.price * item.quantity
                    );
                    setGrandTotal(
                      (prev) => prev + item.product.price * item.quantity
                    );
                  } else {
                    setOrders(
                      orders.filter((order) => {
                        return order.product_id !== item.product.id;
                      })
                    );
                    setSubtotal(
                      (prev) => prev - item.product.price * item.quantity
                    );
                    setGrandTotal(
                      (prev) => prev - item.product.price * item.quantity
                    );
                  }
                }}
              />
              <div className="flex row-span-3 w-24 h-24">
                <LazyLoadImage
                  className="object-cover rounded-md w-24"
                  src={`http://localhost:8000/${item.product.image.url}`}
                  alt="product image"
                />
              </div>
              <div className="space-y-2">
                <h1 className="font-bold text-xl">{item.product.name}</h1>
                <p className="h-24 font-normal text-ellipsis w-full">
                  {item.product.subtitle}
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell className="align-top">${item.product.price}</TableCell>
          <TableCell className="align-top">
            <Input
              type="number"
              defaultValue={item.quantity}
              min={1}
              onChange={(event) => {
                const value = event.target.value;
                item.quantity = parseInt(value);
                quantityUpdateDebounce(item.id, item.quantity);
              }}
              className="w-24"
            />
          </TableCell>
          <TableCell className="align-top font-semibold">
            ${item.product.price * item.quantity}
          </TableCell>
          <TableCell className="flex p-2 justify-end">
            <Button
              onClick={() => removeCartItemHandler(item.id)}
              variant="ghost"
              className="text-red-700 w-12"
            >
              <Icons.deleteIcon />
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  );

  return (
    <div className="container">
      <h1 className="font-bold text-xl mt-4">My Cart</h1>
      {cart.isLoading ? (
        <SkeletonLoading />
      ) : (
        <div className=" grid grid-cols-3 mt-4 gap-8">
          <div className="col-span-2 w-full row-auto rounded-lg border bg-gray-100">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length == 0 ? (
                  <TableRow>
                    <TableCell>No items</TableCell>
                  </TableRow>
                ) : (
                  items
                )}
              </TableBody>
            </Table>
          </div>
          <div className="col-span-1 h-max bg-gray-100 rounded-lg p-5 border">
            <h1 className="mb-4 font-bold text-lg">Order Summary</h1>
            <div className="grid grid-cols-2 row-auto gap-2">
              <p>Sub Total</p>
              <p>${subtotal}</p>
              <p>Discount</p>
              <p>0</p>
              <p>Delivery Fee</p>
              <p>$0.00</p>
              <p className="font-semibold">Grand Total</p>
              <p className="font-bold">${grandTotal}</p>
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
                <Button disabled={cart.data?.data.data.length == 0}>
                  Place Order
                </Button>
              </Link>
              <Link to="/products/handbags">
                <Button variant={"outline"}>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
