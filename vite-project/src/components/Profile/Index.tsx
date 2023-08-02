import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Redirect } from "wouter";
import { cn } from "@/lib/utils";
import Icons from "@/lib/icons";
import PersonalInformationForm from "./components/PersonalInformationForm";
import MyOrders from "./components/MyOrders";
import MyWishlist from "./components/MyWishlist";
import MyProducts from "./components/MyProducts";
import { changeTab } from "@/redux/slices/personalInformationTabSlice";

const Index = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);
  const tab = useAppSelector((state) => state.personalInfoTab.value);

  const ChevronRight = (
    <div className="hidden lg:block">
      <Icons.chevronRight />
    </div>
  );

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container py-4 min-h-screen">
      <h1 className="text-2xl font-bold text-[#17494D]">
        Personal Information
      </h1>
      <div className="grid grid-cols-4 gap-5 mt-2">
        <div className="hidden md:block col-span-1 bg-gray-50 py-5 px-2 w-60">
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
            onClick={() => dispatch(changeTab("PERSONAL-INFORMATION"))}
          >
            <p>Personal Information</p>
            {ChevronRight}
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
            onClick={() => dispatch(changeTab("MY-ORDERS"))}
          >
            <p>My Orders</p>
            {ChevronRight}
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
            onClick={() => dispatch(changeTab("MY-WISHLIST"))}
          >
            <p>My Wishlist</p>
            {ChevronRight}
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
            onClick={() => dispatch(changeTab("MY-PRODUCTS"))}
          >
            {" "}
            <p>My Products</p>
            {ChevronRight}
          </Button>
        </div>
        {tab == "PERSONAL-INFORMATION" && (
          <div className="col-span-4 md:col-span-3 w-full">
            <PersonalInformationForm />
          </div>
        )}
        {tab == "MY-ORDERS" && (
          <div className="col-span-3 w-full">
            <MyOrders />
          </div>
        )}
        {tab == "MY-WISHLIST" && (
          <div className="col-span-3 w-full">
            <MyWishlist />
          </div>
        )}
        {tab == "MY-PRODUCTS" && (
          <div className="col-span-3 w-full">
            <MyProducts />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
