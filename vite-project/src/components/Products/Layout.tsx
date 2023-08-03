import { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="border-t-2">{children}</div>;
};

export default Layout;
