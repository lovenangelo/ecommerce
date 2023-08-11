import { Button } from "@/components/ui/button";
import Icons from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Coupon from "./Coupon";
import Ratings from "./Ratings";
import productsApi from "@/lib/api/products";
import { useQuery } from "react-query";
import SingleProductSkeleton from "./Loaders/SingleProductSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/opacity.css";
import { useState } from "react";
import { addCartItem } from "../Cart/api/cartApi";
import { toast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateItems } from "@/redux/slices/cartSlice";
import { Product } from "./types/product-item";
import images from "@/lib/images";
import { addWishListItem } from "@/lib/api/wishlist";

const SingleProduct = ({ id }: { id: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getProductItem = async () => {
    const res = await productsApi.getProductItem(id);
    const product: Product = res?.data;
    return product;
  };
  const user = useAppSelector((state) => state.user.value);
  const cartItems = useAppSelector((state) => state.userlessCartItems.value);
  const dispatch = useAppDispatch();
  const { isLoading: fetchLoading, data } = useQuery(
    ["get-product-item", id],
    getProductItem,
    {
      enabled: true,
      retry: 2,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  const addToCartHandler = async () => {
    setIsLoading(true);
    if (data && user) {
      try {
        await addCartItem(data?.id, quantity);
        toast({ title: "Successfully added new item to your cart" });
      } catch (error) {
        console.log(error);
        toast({ title: "Failed to add item to your cart" });
      }
    } else {
      if (data)
        dispatch(
          updateItems([
            ...cartItems,
            { product: data, quantity: quantity, id: data.id.toString() },
          ])
        );
      toast({ title: "Added new item to your cart" });
    }
    setIsLoading(false);
  };

  const handleAddToWishlist = async (id: number) => {
    console.log("adding to wishlist");
    try {
      await addWishListItem(user?.id ?? null, id);
      toast({
        title: "Added item to your wishlist",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (fetchLoading) return <SingleProductSkeleton />;
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 rows-auto w-full h-full ">
        <div className="h-full sm:h-[calc(100vh-80px)] w-full sm:p-8 rounded-md">
          <LazyLoadImage
            height={"100%"}
            width={"100%"}
            effect="opacity"
            src={
              data?.image !== null
                ? `http://localhost:8000/${data?.image.url}`
                : images.productItemFallback
            }
            alt="bag"
            className=" object-cover h-full w-full rounded-md"
          />
        </div>
        <div className="sm:mt-2 mt-4 sm:p-5 sm:space-y-8 h-max">
          <div className="sm:space-y-2">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <p>{data?.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 h-max row-auto gap-4">
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <Ratings starCount={5} reviewCount={24} />
              <div className="flex items-end space-x-4">
                <h2 className="text-2xl sm:text-4xl font-bold">
                  ${data?.price}
                </h2>
              </div>
            </div>{" "}
            <div className="sm:space-y-22 text-sm space-y-2 text-[#626262]">
              <p>Stocks: {data?.quantity}</p>
              <p>Color: {data?.color}</p>
            </div>
          </div>
          <hr className="my-4 sm:my-0" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="space-y-2">
              <h3 className="md:text-2xl font-bold">Delivery Details</h3>
              <p className="text-[#626262]">
                Check estimated delivery date/pickup option.
              </p>
              <div className="flex space-x-1">
                <p>Payment options: </p> <span>{data?.payment_options}</span>
              </div>
            </div>
            <Coupon />
          </div>
          <div className="flex space-x-2 items-center my-4">
            <p className="font-bold">Quantity:</p>
            <div className="border-2 flex space-x-2 justify-center items-center ">
              <Button
                onClick={() =>
                  setQuantity((prev) => (prev > 1 ? (prev -= 1) : 1))
                }
                variant={"ghost"}
              >
                <Icons.minusIcon className="h-4 w-4" />
              </Button>
              <p>{quantity}</p>
              <Button
                onClick={() => setQuantity((prev) => (prev += 1))}
                variant={"ghost"}
              >
                <Icons.plusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex my-4 items-center space-x-2">
            <Button
              className="w-full sm:w-max"
              disabled={isLoading}
              onClick={addToCartHandler}
            >
              Add to cart
              {isLoading && (
                <span className="ml-2">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                </span>
              )}
            </Button>{" "}
            {user && (
              <Button
                onClick={() => handleAddToWishlist(parseInt(id))}
                className="text-xs whitespace-nowrap"
                disabled={isLoading}
                variant={"outline"}
              >
                Add To Wishlist
              </Button>
            )}
          </div>
        </div>{" "}
        <hr className="sm:col-span-2" />
        <div className="h-48 hidden sm:block sm:px-8">
          <Tabs
            defaultValue="product-description"
            className="w-full my-4 sm:my-8 h-36 sm:h-full"
          >
            <TabsList className="h-max">
              <TabsTrigger value="product-description">Description</TabsTrigger>
            </TabsList>
            <TabsContent
              className="h-full overflow-auto"
              value="product-description"
            >
              {data?.description}
            </TabsContent>
          </Tabs>
        </div>
        <div className="h-48 sm:px-8">
          <Tabs
            defaultValue="related-products"
            className="w-full my-4 sm:my-8 h-36 sm:h-full"
          >
            <TabsList className="h-max">
              <TabsTrigger
                className="block sm:hidden"
                value="product-description"
              >
                Description
              </TabsTrigger>
              <TabsTrigger value="related-products">Related</TabsTrigger>
              <TabsTrigger value="ratings-and-reviews">
                Ratings and Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="h-full overflow-auto sm:hidden"
              value="product-description"
            >
              {data?.description}
            </TabsContent>
            <TabsContent
              className="h-full overflove-auto"
              value="related-products"
            >
              Dolor augue mattis duis semper gravida enim eu imperdiet sit. Et
              pharetra platea pretium nec feugiat tincidunt quam leo tristique.
              Nulla enim consectetur sit et tempus, faucibus leo ac cras. Purus
              ut non eu mus volutpat.
            </TabsContent>
            <TabsContent
              className="h-full overflow-auto"
              value="ratings-and-reviews"
            >
              Eget est vel sagittis amet sit eu eu ullamcorper tellus. Leo
              mauris, faucibus vulputate adipiscing elementum tristique dictumst
              augue pellentesque. Justo, sed nunc, pretium turpis scelerisque.
              Enim urna etiam morbi vestibulum ac dictumst. Ac ut elementum
              molestie sit felis imperdiet.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
