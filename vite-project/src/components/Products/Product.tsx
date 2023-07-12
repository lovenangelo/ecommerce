import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icons from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import images from "@/lib/images";
import Coupon from "./Coupon";
const Product = ({ id }: { id: string }) => {
  return (
    <div className="container min-h-screen mt-8 mb-24">
      <div className="grid grid-cols-2 rows-auto w-full h-full">
        <div className="h-max w-full">
          <img
            src={images.bags[0].src}
            alt="bag"
            className="object-cover h-3/4 w-full"
          />
        </div>

        <div className="p-5 space-y-8 h-max">
          <div>
            <h1 className="text-2xl font-bold">Coach</h1>
            <p>Leather Coach Bag with adjustable straps</p>
          </div>
          <div className="flex items-end space-x-2">
            <span className="flex">
              <Icons.starIcon fill="#FF8C4B" stroke="#FF8C4B" />
              <Icons.starIcon fill="#FF8C4B" stroke="#FF8C4B" />
              <Icons.starIcon fill="#FF8C4B" stroke="#FF8C4B" />
              <Icons.starIcon fill="#FF8C4B" stroke="#FF8C4B" />
              <Icons.starIcon fill="#B6B6B6" stroke="#B6B6B6" />
            </span>
            <p className="text-[#B6B6B6]">(250) Ratings</p>
          </div>
          <div className="flex items-end space-x-4 mt-16">
            <h2 className="text-4xl font-bold">$54.69</h2>
            <s className="text-4xl text-[#B6B6B6] font-bold stroke">$78.66</s>
            <h2 className="text-red-500">50% OFF</h2>
          </div>
          <hr />
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-bold">Delivery Details</h3>
              <p className="text-[#626262]">
                Check estimated delivery date/pickup option.
              </p>
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
              Leo mauris, faucibus vulputate adipiscing elementum tristique
              dictumst augue pellentesque. Justo, sed nunc, pretium turpis
              scelerisque. Enim urna etiam morbi vestibulum ac dictumst. Ac ut
              elementum molestie sit felis imperdiet.
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

export default Product;
