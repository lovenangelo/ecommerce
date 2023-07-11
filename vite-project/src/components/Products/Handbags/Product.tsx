import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icons from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import images from "@/lib/images";
const Product = ({ id }: { id: string }) => {
  return (
    <div className="container min-h-screen">
      <div className="grid grid-cols-2 w-full h-full">
        <img src={images.bags[0].src} alt="bag" className="object-cover" />
        <div className="p-5 space-y-5">
          <div>
            <h1 className="text-2xl font-bold">Coach</h1>
            <p>Leather Coach Bag with adjustable straps</p>
          </div>
          <div className="flex items-end space-x-2">
            <span className="flex">
              <Icons.starIcon fill="#FFFF00" stroke="#FFFF00" />
              <Icons.starIcon fill="#FFFF00" stroke="#FFFF00" />
              <Icons.starIcon fill="#FFFF00" stroke="#FFFF00" />
              <Icons.starIcon fill="#FFFF00" stroke="#FFFF00" />
              <Icons.starIcon fill="#FFFF00" stroke="#FFFF00" />
            </span>
            <p>(250) Ratings</p>
          </div>
          <div className="flex items-end space-x-4">
            <h2 className="text-4xl font-bold">$54.69</h2>
            <h2 className="text-2xl font-bold">$78.66</h2>
            <h2>50% OFF</h2>
          </div>
          <hr />
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-bold">Delivery Details</h3>
              <p>Check estimated delivery date/pickup option.</p>
            </div>
            <div className="flex border-2">
              <Input
                className="border-0 shadow-none"
                placeholder="Apply Valid Pincode"
              />
              <Button variant={"ghost"}>CHECK</Button>
            </div>
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
            <Button>Add To Wishlist</Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="product-description" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="product-description">
            Product Description
          </TabsTrigger>
          <TabsTrigger value="related-products">Related Products</TabsTrigger>
          <TabsTrigger value="ratings-and-reviews">
            Ratings and Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="product-description">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="related-products">
          Change your password here.
        </TabsContent>
        <TabsContent value="ratings-and-reviews">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Product;
