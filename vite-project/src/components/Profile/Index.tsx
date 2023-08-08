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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);
  const tab = useAppSelector((state) => state.personalInfoTab.value);
  console.log(tab);

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
      <div className="flex space-x-4 justify-between items-center">
        <h1 className="text-sm lg:text-2xl font-bold text-[#17494D]">
          PROFILE
        </h1>
        <Select
          value={tab}
          defaultValue={tab}
          onValueChange={(
            value:
              | "PERSONAL-INFORMATION"
              | "MY-ORDERS"
              | "MY-WISHLIST"
              | "MY-PRODUCTS"
          ) => {
            dispatch(changeTab(value));
          }}
        >
          <SelectTrigger className="w-[180px] flex sm:hidden">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PERSONAL-INFORMATION">
              Personal Information
            </SelectItem>
            <SelectItem value="MY-ORDERS">My Orders</SelectItem>{" "}
            <SelectItem value="MY-WISHLIST">My Wishlist</SelectItem>
            <SelectItem value="MY-PRODUCTS">My Products</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-2">
        <div className="hidden md:flex md:flex-col col-span-1 bg-gray-50 py-5 px-2 w-full">
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
            onClick={() => dispatch(changeTab("PERSONAL-INFORMATION"))}
          >
            <p className="whitespace-nowrap">Personal Information</p>
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
          <div className="col-span-4 md:col-span-3 w-full my-4">
            <PersonalInformationForm />
          </div>
        )}
        {tab == "MY-ORDERS" && (
          <div className="col-span-4 md:col-span-3 w-full my-4">
            <MyOrders />
          </div>
        )}
        {tab == "MY-WISHLIST" && (
          <div className="col-span-4 md:col-span-3 w-full my-4">
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
