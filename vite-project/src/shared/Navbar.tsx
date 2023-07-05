import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
import icons from "@/lib/icons";
import { cn } from "@/lib/utils";
const Navbar = () => {
  return (
    <nav className="flex justify-between h-20 w-full items-center p-5">
      <div className="flex">
        <a href="/">
          <img src={logo} alt="logo" className="h-max w-max mr-8" />
        </a>
        <ul className="list-none flex space-x-5">
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
      <div className="flex items-center space-x-5">
        <div className="flex items-center border shadow-sm px-2 rounded bg-[#F1F1F1]">
          <icons.search height={20} width={20} className="h-12" />
          <Input
            className={cn(
              "w-96 border-0 shadow-none focus-visible:ring-0 bg-transparent"
            )}
            placeholder="Search for products or brands..."
          />
        </div>
        <div className="flex space-x-5">
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
      </div>
    </nav>
  );
};

export default Navbar;
