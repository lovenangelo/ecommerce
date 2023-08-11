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

import "react-lazy-load-image-component/src/effects/opacity.css";
import { Button } from "../ui/button";
import Icons from "@/lib/icons";
import Coupon from "../Products/Coupon";
import { Link } from "wouter";
import { useQuery } from "react-query";
import { deleteCartItem, getCartItems, updateCartItem } from "./api/cartApi";
import SkeletonLoading from "./Loaders/SkeletonLoading";
import { Product } from "../Products/types/product-item";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Checkbox } from "../ui/checkbox";
import debounce from "lodash.debounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateOrder } from "@/redux/slices/orderDetailsSlice";
import { removeItem } from "@/redux/slices/cartSlice";
import images from "@/lib/images";
const Index = () => {
  const dispatch = useAppDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const user = useAppSelector((state) => state.user.value);
  const userlessCartItems = useAppSelector(
    (state) => state.userlessCartItems.value
  );
  // The state of cart items from fetch
  const [cartItems, setCartItems] = useState<
    { product: Product; quantity: number; id: string }[] | []
  >([]);

  const fetchCartItems = async () => {
    return getCartItems();
  };

  const cart = useQuery(["get-cart", user], fetchCartItems, {
    retry: 2,
    enabled: user !== null,
    onSuccess(data) {
      setCartItems(data.data.data);
    },
  });

  const remove = cart.remove;

  useEffect(() => {
    if (user == null) {
      setCartItems(userlessCartItems);
    }
  }, [user, userlessCartItems]);

  useEffect(() => {
    return () => {
      remove();
    };
  }, [remove]);

  // API DELETE Req cart item
  const removeCartItemHandler = async (id: string) => {
    if (user !== null) {
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
    } else {
      dispatch(removeItem(id));
    }
  };

  function handleDeleteButton(item: {
    product: Product;
    quantity: number;
    id: string;
  }) {
    return () => {
      removeCartItemHandler(item.id);
      setOrders(
        orders.filter((order) => {
          return order.product_id !== item.product.id;
        })
      );
      setSubTotal((prev) =>
        prev ? prev - item.product.price * item.quantity : prev
      );
      setGrandTotal((prev) =>
        prev ? prev - item.product.price * item.quantity : prev
      );
    };
  }

  // API PUT req
  const updateCartItemHandler = async (id: string, quantity: number) => {
    await updateCartItem(id, quantity);
  };

  const [quantityUpdateDebounce] = useState(() =>
    debounce(
      (id: string, value: number) => {
        updateCartItemHandler(id, value);
      },
      2000,
      { leading: false, trailing: true }
    )
  );

  // The selected cart items to send as order
  const [orders, setOrders] = useState<
    {
      cart_item_id: string;
      price: number;
      product_id: number;
      quantity: number;
      src: string | null;
      subtitle: string;
      title: string;
    }[]
  >([]);

  // This is used to disable the input buttons
  const disabledSetter = new Array(cartItems.length).fill(false);
  const [quantityInputDisable, setQuantityInputDisable] = useState<
    boolean[] | []
  >(disabledSetter);

  // Updating cart item quantity for row subtotal
  const handleQuantityChange = (rowIndex: number, value: number) => {
    const updatedData = cartItems?.map((item, index) => {
      if (index === rowIndex) {
        return { ...item, quantity: value };
      }
      return item;
    });

    setCartItems(updatedData ?? []);
  };

  const items = cartItems?.map((item, index) => {
    return (
      <TableRow key={index} className="h-max bg-white">
        <TableCell className="font-medium w-96">
          <div className="grid grid-flow-col row-auto gap-4">
            <Checkbox
              onCheckedChange={(value) => {
                const updatedDisabledSetter = quantityInputDisable;
                if (value) {
                  updatedDisabledSetter[index] = true;
                  setQuantityInputDisable(updatedDisabledSetter);
                  setOrders([
                    ...orders,
                    {
                      price: item.product.price,
                      quantity: item.quantity,
                      product_id: item.product.id,
                      src: item.product.image?.url,
                      subtitle: item.product.subtitle,
                      title: item.product.name,
                      cart_item_id: item.id,
                    },
                  ]);
                  setSubTotal(
                    (prev) => prev + item.product.price * item.quantity
                  );
                  setGrandTotal(
                    (prev) => prev + item.product.price * item.quantity
                  );
                } else {
                  updatedDisabledSetter[index] = false;
                  setQuantityInputDisable(updatedDisabledSetter);
                  setOrders(
                    orders.filter((order) => {
                      return order.product_id !== item.product.id;
                    })
                  );
                  setSubTotal(
                    (prev) => prev - item.product.price * item.quantity
                  );
                  setGrandTotal(
                    (prev) => prev - item.product.price * item.quantity
                  );
                }
              }}
            />
            <div className="flex flex-col sm:flex-row space-x-4">
              <div className="flex row-span-3 sm:w-24">
                <Link
                  className="h-full"
                  to={`/products/${item.product.category}/${item.product.id}`}
                >
                  {" "}
                  <LazyLoadImage
                    width={"100%"}
                    height={"100%"}
                    src={
                      item.product.image == null
                        ? images.productItemFallback
                        : `http://localhost:8000/${item.product.image.url}`
                    }
                    effect="opacity"
                    alt="product image"
                  />
                </Link>
              </div>
              <div className="sm:space-y-2">
                <h1 className="font-bold sm:text-xl">{item.product.name}</h1>
                <p className="font-normal text-ellipsis sm:w-full">
                  {item.product.subtitle}
                </p>
                <p className="font-normal text-ellipsis sm:w-full">
                  Stocks: {item.product.quantity}
                </p>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell className="align-top">${item.product.price}</TableCell>
        <TableCell className="align-top">
          <Input
            max={item.product.quantity}
            disabled={quantityInputDisable[index]}
            type="number"
            defaultValue={item.quantity}
            value={item.quantity}
            min={1}
            onChange={(event) => {
              const value = event.target.value;
              const qty = parseInt(value == "" ? "1" : value);
              let newQuantity = qty;
              if (qty < 1) {
                newQuantity = 1;
              }
              if (qty > item.product.quantity) {
                newQuantity = item.product.quantity;
              }
              handleQuantityChange(index, newQuantity);
              if (user !== null) item.quantity = newQuantity;
              if (user !== null) quantityUpdateDebounce(item.id, item.quantity);
            }}
            className="w-16 sm:w-24"
          />
        </TableCell>
        <TableCell className="align-top font-semibold hidden sm:block">
          ${item.product.price * item.quantity}
        </TableCell>
        <TableCell className="flex p-2 justify-end">
          <Button
            disabled={quantityInputDisable[index]}
            onClick={handleDeleteButton(item)}
            variant="ghost"
            className="text-red-700 w-12"
          >
            <Icons.deleteIcon />
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className="container">
      <h1 className="font-bold text-xl mt-4">My Cart</h1>
      {cart.isLoading ? (
        <SkeletonLoading />
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-3 mt-4 gap-2 sm:gap-8">
          <div className="col-span-2 w-full row-auto rounded-lg border bg-gray-100">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-max">Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Subtotal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.length == 0 ? (
                  <TableRow>
                    <TableCell>No items</TableCell>
                  </TableRow>
                ) : (
                  items
                )}
              </TableBody>
            </Table>
          </div>
          <div className="col-span-1 w-full h-max bg-gray-100 rounded-lg p-5 border">
            <h1 className="mb-4 font-bold text-lg">Order Summary</h1>
            <div className="grid grid-cols-2 row-auto gap-2">
              <p>Sub Total</p>
              <p>${subTotal}</p>
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
              <Link
                onClick={() => {
                  console.log("updated");
                  dispatch(
                    updateOrder({
                      items: orders,
                      grandTotal: grandTotal,
                      subTotal: subTotal,
                    })
                  );
                }}
                to="/checkout"
              >
                <Button
                  disabled={orders.length == 0}
                  className=" whitespace-nowrap"
                >
                  Place Order
                </Button>
              </Link>
              <Link to="/products/handbags">
                <Button variant={"outline"} className=" whitespace-nowrap">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
