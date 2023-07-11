import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
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
import { Link } from "wouter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosClient from "@/lib/axios";
import { removeUser } from "@/redux/slices/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const user = useAppSelector((state) => state.user.value);
  const name = user?.name.split(" ");
  const dispatch = useAppDispatch();

  const signoutHandler = async () => {
    try {
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/logout");
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
    }
  };

  const loginButton = (
    <Button variant={"ghost"} className={cn("w-full justify-start")}>
      <Link href="/auth">Login</Link>
    </Button>
  );

  const authenticated = (
    <>
      <Button
        variant={"ghost"}
        className={cn("w-full justify-start")}
        onClick={signoutHandler}
      >
        Profile
      </Button>
      <Button
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
      <div className="flex">
        <a className="h-max w-max md:h-full md:w-full" href="/">
          <img src={logo} alt="logo" className="h-max w-max md:mr-8 mr-4" />
        </a>
        <ul className="list-none space-x-5 hidden md:flex">
          {nav.links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end items-center md:space-x-5 space-x-2">
        <div className="flex items-center border shadow-sm px-2 rounded bg-[#F1F1F1] md:w-96 w-full">
          <Icons.search height={20} width={20} className="h-12" />
          <Input
            className={cn(
              "w-full border-0 shadow-none focus-visible:ring-0 bg-transparent"
            )}
            placeholder="Search for products or brands..."
          />
        </div>
        <div className="hidden md:flex">
          <Button variant={"ghost"}>
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
                    <AvatarImage src="/" />
                    <AvatarFallback className="font-semibold">
                      {name![0][0] + name![1][0]}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Icons.nav.profile />
                )}
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>{!user ? loginButton : authenticated}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger
              className={cn(
                "border-0 shadow-none rounded-md focus:ring-0 hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <SelectPrimitive.Icon asChild>
                <Icons.nav.checkout />
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>
              <Button className="w-full justify-start" variant={"ghost"}>
                Cart
              </Button>
            </SelectContent>
          </Select>
        </div>
        <div className="inline-block md:hidden">
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
              {loginButton}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
