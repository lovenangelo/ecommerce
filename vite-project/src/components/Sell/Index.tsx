import { useAppSelector } from "@/redux/hooks";
import { Redirect } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

const Index = () => {
  const user = useAppSelector((state) => state.user.value);
  if (user == null) {
    return <Redirect to="/auth" />;
  }
  return (
    <div className="flex flex-col bg-gradient-to-r from-[#9dc4b8] to-[#17494D] items-center py-16">
      <div className="space-y-4 p-8 border-2 bg-white rounded-lg">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="product-image">Product Image</Label>
          <Input id="product-image" type="file" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="product-name">Product Name</Label>
          <Input type="text" id="product-name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="product-description">Product Decription</Label>
          <Input type="text" id="product-description" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="product-category">Product Category</Label>
          <Input type="text" id="product-category" />
        </div>
        <div className="flex space-x-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="product-price">Price</Label>
            <Input type="number" id="product-price" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="product-quantity">Quantity</Label>
            <Input type="number" id="product-quantityF" />
          </div>
        </div>
        <Button className="w-96">Post</Button>
      </div>
    </div>
  );
};

export default Index;
