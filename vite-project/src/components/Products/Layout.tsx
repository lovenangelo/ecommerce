import { ReactNode } from "react";
import HeroPromo from "./HeroPromo";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <HeroPromo />
      {children}
    </div>
  );
};

export default Layout;
