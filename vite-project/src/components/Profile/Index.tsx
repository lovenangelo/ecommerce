import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Redirect } from "wouter";

const Index = () => {
  const user = useAppSelector((state) => state.user.value);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h1 className="text-2xl">Personal Information</h1>
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <Button variant={"ghost"} className="w-full">
            Personal Information
          </Button>
          <Button variant={"ghost"} className="w-full">
            My Orders
          </Button>
          <Button variant={"ghost"} className="w-full">
            My Wishlist
          </Button>
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
};

export default Index;
