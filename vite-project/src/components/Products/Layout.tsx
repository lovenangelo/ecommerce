import { ReactNode } from "react";
import HeroPromo from "./HeroPromo";
import Footer from "../Home/Footer";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <HeroPromo />
      {children}
    </div>
  );
};

export default Layout;
