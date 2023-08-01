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

const Navbar = () => {
  const user = useAppSelector((state) => state.user.value);
  const [, setLocation] = useLocation();
  const name = user?.name.split(" ");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signoutHandler = async () => {
    dispatch(removeUser());
    try {
      setIsLoading(true);
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/logout");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const loginButton = (
    <Button
      variant={"ghost"}
      className={cn("w-full justify-start", user && "hidden")}
    >
      {" "}
      <Link href="/auth">Login</Link>{" "}
    </Button>
  );

  const authenticated = (
    <>
      <Button
        disabled={isLoading}
        variant={"ghost"}
        className={cn("w-full justify-start")}
      >
        <Link href="/profile">Profile</Link>
      </Button>
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
    <nav className="container flex justify-between h-20 w-full items-center">
      <div className="flex items-center mr-2">
        <Link className="h-max w-max md:h-full md:w-full" href="/">
          <LazyLoadImage
            src={logo}
            alt="logo"
            className="h-max w-max md:mr-8 mr-4 hover:cursor-pointer"
          />
        </Link>
        <ul className="list-none space-x-5 hidden lg:flex">
          {nav.links.map((link, index) => (
            <li key={index}>
              <Link
                onClick={() => {
                  console.log("hello nav");

                  dispatch(resetQuery());
                }}
                href={`/products/${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end items-center md:space-x-5 space-x-2">
        <Link
          to="/sell"
          className="hidden lg:inline-flex h-9 px-4 py-2 ml-8 bg-primary text-primary-foreground shadow hover:bg-primary/90ml-4 bg-[#17494D] items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Sell
        </Link>
        <Search />
        <div className="hidden lg:flex">
          <Button
            onClick={() => {
              dispatch(changeTab("MY-WISHLIST"));
              setLocation("/profile");
            }}
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
        <div className="inline-block lg:hidden">
          <Select>
            <SelectTrigger className={cn("border-0")}>
              <SelectPrimitive.Icon asChild>
                <Icons.nav.menu />
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>
              {nav.links.map((link, index) => (
                <SelectItem key={index} value="">
                  {link.name}
                </SelectItem>
              ))}
              <SelectSeparator />
              <Button variant={"ghost"} className={cn("w-full justify-start")}>
                Sell
              </Button>
              {loginButton}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
