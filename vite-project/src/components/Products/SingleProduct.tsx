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
type Product = {
  brand: {
    brand: string;
  };
  category: {
    category: string;
  };
  color: {
    color: string;
  };
  description: string;
  payment_options: {
    cod: boolean;
    card: boolean;
  };
  price: {
    price: string;
  };
  quantity: {
    quantity: number;
  };
  subtitle: string;
  size: {
    s: boolean;
    m: boolean;
    l: boolean;
  };
  image: {
    url: string;
  };
  id: number;
  name: string;
};

const SingleProduct = ({ id }: { id: string }) => {
  const getProductItem = async () => {
    const res = await productsApi.getProductItem(id);
    const product: Product = res.data;
    return product;
  };

  const { isLoading, data } = useQuery("get-product-item", getProductItem, {
    enabled: true,
    retry: 2,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  console.log(data);

  if (isLoading) return <SingleProductSkeleton />;
  return (
    <div className="container">
      <div className="grid grid-cols-2 rows-auto w-full h-full">
        <div className="h-full w-full p-8 rounded-md">
          <LazyLoadImage
            height={"100%"}
            width={"100%"}
            effect="opacity"
            src={`http://localhost:8000/${data?.image.url}`}
            alt="bag"
            className=" object-cover h-full w-full rounded-md"
          />
        </div>

        <div className="p-5 space-y-8 h-max">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <p>{data?.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 h-max row-auto gap-4">
            <div className="space-y-4">
              <Ratings starCount={4} reviewCount={24} />
              <div className="flex items-end space-x-4">
                <h2 className="text-4xl font-bold">${data?.price.price}</h2>
                {/* {data?.promo && (
              <>
                <s className="text-4xl text-[#B6B6B6] font-bold stroke">
                  $78.66
                </s>
                <h2 className="text-red-500">50% OFF</h2>
              </>
            )} */}
              </div>
            </div>{" "}
            <div className="space-y-22 text-sm space-y-2 text-[#626262]">
              <p>Stocks: {data?.quantity.quantity}</p>
              <p>Color: {data?.color.color}</p>
              <div className="flex space-x-1">
                <p>Available sizes: </p> {!!data?.size.s && <span>Small,</span>}
                {!!data?.size.m && <span> Medium,</span>}
                {!!data?.size.l && <span> Large</span>}
              </div>
            </div>
          </div>

          <hr />
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <h3 className="font-bold">Delivery Details</h3>
              <p className="text-[#626262]">
                Check estimated delivery date/pickup option.
              </p>
              {/* <p>Payment options: {data?.delivery_options}</p> */}
              <div className="flex space-x-1">
                <p>Payment options: </p>{" "}
                {!!data?.payment_options.card && <span>Card,</span>}
                {!!data?.payment_options.cod && <span> Cash On Delivery,</span>}
              </div>
            </div>
            <Coupon />
          </div>
          <div className="flex space-x-2">
            <p className="font-bold">Quantity:</p>
            <div className="border-2 flex space-x-2 justify-center items-center px-2">
              <Icons.minusIcon className="h-4 w-4" />
              <p>1</p>
              <Icons.plusIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button>Add to bag</Button>
            <Button variant={"outline"}>Add To Wishlist</Button>
          </div>
          <hr />
          <Tabs defaultValue="product-description" className="w-full my-8">
            <TabsList>
              <TabsTrigger value="product-description">
                Product Description
              </TabsTrigger>
              <TabsTrigger value="related-products">
                Related Products
              </TabsTrigger>
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
