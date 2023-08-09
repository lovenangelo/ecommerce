import logo from "@/assets/images/logo.png";
import Icons from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import nav from "@/lib/nav";
import { Button } from "./ui/button";
import { Link, useLocation } from "wouter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosClient from "@/lib/axios";
import { removeUser } from "@/redux/slices/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { resetQuery } from "@/redux/slices/productQuerySlice";
import Search from "./Search";
import { changeTab } from "@/redux/slices/personalInformationTabSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "./ui/use-toast";
import { persistor } from "@/redux/store";

const Navbar = () => {
  const user = useAppSelector((state) => state.user.value);
  const [location, setLocation] = useLocation();
  const name = user?.name.split(" ");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const links = nav.links.map((link, index) => (
    <li key={index}>
      <Link
        className="text-sm hover:text-slate-600"
        onClick={() => {
          console.log("hello nav");
          dispatch(resetQuery());
        }}
        href={`/products/${link.name.toLowerCase()}`}
      >
        {link.name}
      </Link>
    </li>
  ));
  const signoutHandler = async () => {
    dispatch(removeUser());
    try {
      setIsLoading(true);
      await persistor.purge();
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/logout");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleUnauthorizedSellPageNavigation = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login to your account",
        description: "You need to log in to post a product.",
      });
      if (location !== "/auth") {
        setLocation("/auth");
      }
    }
    setLocation("/sell");
  };

  const handleUnauthorizedWishlistPageNavigation = () => {
    if (!user) {
      if (location !== "/auth") {
        setLocation("/auth");
      }
      toast({
        variant: "destructive",
        title: "Login to your account",
        description: "You need to log in to save a wishlist",
      });
      console.log(location);
    } else {
      dispatch(changeTab("MY-WISHLIST"));
      setLocation("/profile");
    }
  };

  const loginButton = (
    <Link href="/auth">
      <Button
        variant={"ghost"}
        className={cn("w-full justify-start", user && "hidden")}
      >
        Login
      </Button>
    </Link>
  );

  const authenticated = (
    <>
      <Link href="/profile">
        <Button
          disabled={isLoading}
          variant={"ghost"}
          className={cn("w-full justify-start")}
        >
          Profile
        </Button>
      </Link>
      <Button
        disabled={isLoading}
        variant={"ghost"}
        className={cn("w-full justify-start")}
        onClick={signoutHandler}
      >
        Logout
      </Button>
    </>
  );

  return (
    <nav
      className={cn(
        "container flex justify-between h-20 w-full items-center border-b mb-4",
        location == "/" && "border-0",
        location == "/auth" && "mb-0",
        location == "/sell" && "mb-0",
        location.startsWith("/my-prodiucts/edit") && "mb-0",
        location.startsWith("/products") && "mb-0"
      )}
    >
      <div className="flex items-center mr-2">
        <Link className="h-24 w-max md:h-full md:w-full" href="/">
          <LazyLoadImage
            src={logo}
            alt="logo"
            className="h-full w-max md:mr-8 mr-4 hover:cursor-pointer"
          />
        </Link>
        <ul className="list-none space-x-4 hidden lg:flex">{links}</ul>
      </div>
      <div className="flex justify-end items-center md:space-x-5 space-x-2">
        <Button
          onClick={handleUnauthorizedSellPageNavigation}
          className={cn("w-full justify-start hidden lg:inline-flex")}
        >
          Sell
        </Button>
        <Search />
        <div className="hidden lg:flex">
          <Button
            onClick={handleUnauthorizedWishlistPageNavigation}
            variant={"ghost"}
          >
            <Icons.nav.favorites />
          </Button>
          <Select>
            <SelectTrigger
              className={cn(
                "border-0 shadow-none rounded-md focus:ring-0 hover:bg-accent hover:text-accent-foreground",
                user && "rounded-full w-max h-max mx-3 p-0"
              )}
            >
              <SelectPrimitive.Icon asChild>
                {user ? (
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src={
                        user.avatar == null
                          ? "/"
                          : `http://localhost:8000/${user.avatar}`
                      }
                    />
                    <AvatarFallback className="font-semibold">
                      {name?.[0][0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Icons.nav.profile />
                )}
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>{!user ? loginButton : authenticated}</SelectContent>
          </Select>
          <Button
            onClick={() => {
              setLocation("/cart");
            }}
            variant={"ghost"}
          >
            <Icons.nav.checkout />
          </Button>
        </div>
        {/* MOBILE VIEW */}
        <div className="inline-flex lg:hidden">
          <Select
            value={selectValue}
            onValueChange={(value) => {
              setSelectValue(value);
              dispatch(resetQuery());
              setLocation(`/products${value}`);
            }}
            onOpenChange={(open) => {
              if (!open) setSelectValue("/");
            }}
          >
            <SelectTrigger className={cn("border-0")}>
              <SelectPrimitive.Icon asChild>
                <Icons.nav.menu />
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>
              {nav.links.map((link, index) => (
                <SelectItem key={index} value={link.href}>
                  {link.name}
                </SelectItem>
              ))}
              <SelectSeparator />
              <Button
                onClick={handleUnauthorizedSellPageNavigation}
                variant={"ghost"}
                className={cn("w-full justify-start")}
              >
                Sell
              </Button>
              <Button
                onClick={() => setLocation("/cart")}
                variant={"ghost"}
                className={cn("w-full justify-start")}
              >
                Cart
              </Button>
              {loginButton}
              {user && authenticated}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
