import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Redirect } from "wouter";
import { cn } from "@/lib/utils";
import Icons from "@/lib/icons";
import { useState } from "react";
import PersonalInformationForm from "./PersonalInformationForm";

type ProfileTabs = "PERSONAL-INFORMATION" | "MY ORDERS" | "MY WISHLIST";

const Index = () => {
  const user = useAppSelector((state) => state.user.value);

  const [tab, setTab] = useState<ProfileTabs>("PERSONAL-INFORMATION");

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold text-[#17494D]">
        Personal Information
      </h1>
      <div className="grid grid-cols-4 gap-5 mt-2">
        <div className="col-span-1 bg-gray-50 py-5 px-2">
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
          >
            <p>Personal Information</p>
            <Icons.chevronRight />
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
          >
            <p>My Orders</p>
            <Icons.chevronRight />
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-between rounded-none",
              "active:border-l-2"
            )}
          >
            <p>My Wishlist</p>
            <Icons.chevronRight />
          </Button>
        </div>
        {tab == "PERSONAL-INFORMATION" && (
          <div className="col-span-3">
            <PersonalInformationForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
