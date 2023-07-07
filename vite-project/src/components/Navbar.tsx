import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
import icons from "@/lib/icons";
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

const Navbar = () => {
  const loginButton = <Button className={cn("w-full")}>Login</Button>;
  return (
    <nav className="container flex justify-between h-20 w-full items-center">
      <div className="flex">
        <a className="h-max w-max md:h-full md:w-full" href="/">
          <img src={logo} alt="logo" className="h-max w-max md:mr-8 mr-4" />
        </a>
        <ul className="list-none space-x-5 hidden md:flex">
          {nav.links.map((link) => (
            <li>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end items-center md:space-x-5 space-x-2">
        <div className="flex items-center border shadow-sm px-2 rounded bg-[#F1F1F1] md:w-96 w-full">
          <icons.search height={20} width={20} className="h-12" />
          <Input
            className={cn(
              "w-full border-0 shadow-none focus-visible:ring-0 bg-transparent"
            )}
            placeholder="Search for products or brands..."
          />
        </div>
        <div className="hidden md:flex">
          <Select>
            <SelectTrigger
              className={cn("border-0 shadow-none rounded-none focus:ring-0")}
            >
              <SelectPrimitive.Icon asChild>
                <icons.nav.favorites />
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>{loginButton}</SelectContent>
          </Select>
          <Select>
            <SelectTrigger
              className={cn("border-0 shadow-none rounded-none focus:ring-0")}
            >
              <SelectPrimitive.Icon asChild>
                <icons.nav.profile />
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>
              <Link href="/auth">{loginButton}</Link>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger
              className={cn("border-0 shadow-none rounded-none focus:ring-0")}
            >
              <SelectPrimitive.Icon asChild>
                <icons.nav.checkout />
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>{loginButton}</SelectContent>
          </Select>
        </div>
        <div className="inline-block md:hidden">
          <Select>
            <SelectTrigger className={cn("border-0")}>
              <SelectPrimitive.Icon asChild>
                <icons.nav.menu />
              </SelectPrimitive.Icon>
            </SelectTrigger>
            <SelectContent>
              {nav.links.map((link) => (
                <SelectItem value="">{link.name}</SelectItem>
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
