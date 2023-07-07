import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
import icons from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="container flex justify-between h-20 w-full items-center">
      <div className="flex">
        <a className="h-max w-max md:h-full md:w-full" href="/">
          <img src={logo} alt="logo" className="h-max w-max md:mr-8 mr-4" />
        </a>
        <ul className="list-none space-x-5 hidden md:flex">
          <li>
            <a href="/">Handbags</a>
          </li>
          <li>
            <a href="/">Watches</a>
          </li>
          <li>
            <a href="/">Skincare</a>
          </li>
          <li>
            <a href="/">Jewellery</a>
          </li>
          <li>
            <a href="/">Apparels</a>
          </li>
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
        <div className="space-x-5 hidden md:flex">
          <a href="/">
            <icons.nav.favorites />
          </a>
          <a href="/">
            <icons.nav.profile />
          </a>
          <a href="/">
            <icons.nav.checkout />
          </a>
        </div>
        <div className="inline-block md:hidden">
          <NavigationMenu className={cn("p-0 m-0")}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn("appearance-none p-0")}>
                  <icons.nav.menu />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
