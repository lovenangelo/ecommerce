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
type Product = {
  brand: string;
  category: string;
  color: string;
  description: string;
  payment_options: string;
  price: number;
  quantity: number;
  subtitle: string;
  size: string;
  image: {
    url: string;
  };
  id: number;
  name: string;
};

const SingleProduct = ({ id }: { id: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getProductItem = async () => {
    const res = await productsApi.getProductItem(id);
    const product: Product = res?.data;
    return product;
  };

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

  console.log(data);

  const addToCartHandler = async () => {
    if (data)
      try {
        setIsLoading(true);
        await addCartItem(data?.id, quantity);
        toast({ title: "Successfully added new item to your cart" });
      } catch (error) {
        console.log(error);
        toast({ title: "Failed to add item to your cart" });
      }
    setIsLoading(false);
  };

  if (fetchLoading) return <SingleProductSkeleton />;
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 rows-auto w-full h-full">
        <div className="h-full w-full sm:p-8 rounded-md">
          <LazyLoadImage
            height={"100%"}
            width={"100%"}
            effect="opacity"
            src={`http://localhost:8000/${data?.image.url}`}
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
              {/* <p>Payment options: {data?.delivery_options}</p> */}
              <div className="flex space-x-1">
                <p>Payment options: </p>{" "}
                {/* {!!data?.payment_options.card && <span>Card,</span>}
                {!!data?.payment_options.cod && <span> Cash On Delivery,</span>} */}
              </div>
            </div>
            <Coupon />
          </div>
          <div className="flex space-x-2 items-center my-4">
            <p className="font-bold">Quantity:</p>
            <div className="border-2 flex space-x-2 justify-center items-center ">
              <Button
                onClick={() => setQuantity((prev) => (prev -= 1))}
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
            <Button
              className="text-xs whitespace-nowrap"
              disabled={isLoading}
              variant={"outline"}
            >
              Add To Wishlist
            </Button>
          </div>
          <hr />
          <div></div>
          <Tabs
            defaultValue="product-description"
            className="w-full my-4 sm:my-8"
          >
            <TabsList>
              <TabsTrigger value="product-description">Description</TabsTrigger>
              <TabsTrigger value="related-products">Related</TabsTrigger>
              <TabsTrigger value="ratings-and-reviews">
                Ratings and Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="product-description">
              {data?.description}
            </TabsContent>
            <TabsContent value="related-products">
              Dolor augue mattis duis semper gravida enim eu imperdiet sit. Et
              pharetra platea pretium nec feugiat tincidunt quam leo tristique.
              Nulla enim consectetur sit et tempus, faucibus leo ac cras. Purus
              ut non eu mus volutpat.
            </TabsContent>
            <TabsContent value="ratings-and-reviews">
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
