import { useAppState } from "contexts/app/app.provider";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import Sticky from "react-stickynode";
import Header from "./header/header";
import { LayoutWrapper } from "./layout.style";
const MobileHeader = dynamic(() => import("./header/mobile-header"), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  // deviceType: { mobile, tablet, desktop },
}) => {
  const isSticky = useAppState("isSticky");
  const { pathname, query } = useRouter();

  const isHomePage = pathname === "/";

  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? "sticky" : "unSticky"} ${
            isHomePage ? "home" : ""
          } desktop`}
        />

        <Header
          className={`${isSticky && isHomePage ? "sticky" : "unsticky"} ${
            isHomePage ? "home" : ""
          }`}
          isHome={isHomePage}
        />
      </Sticky>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
